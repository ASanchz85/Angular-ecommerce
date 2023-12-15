import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styles: [
    '.input-custom { border: 1px thin lightgray; width: 40px; border-radius: 10px; padding: 5px 0 5px 0; }',
    '.table-layout { height: 70px; padding: 20px 0 15px 0; }',
  ],
})
export class ListProductComponent implements OnInit {
  title = 'List of product';
  stock = 1;
  margin = 10;
  productsList: Product[] = [];

  constructor(
    private _ps: ProductService,
    private _ar: ActivatedRoute,
    private _router: Router,
    private _cdr: ChangeDetectorRef
  ) {
    this._ar.data.subscribe((data: any) => {
      this.productsList = data.productList;
    });
  }

  ngOnInit(): void {
    /*     this._ps.getAllProducts().subscribe((data) => {
      this.productsList = data;
    }) */
  }

  editProduct(product: Product) {
    const productSerialized = encodeURIComponent(JSON.stringify(product));
    this._router.navigate(['admin', 'edit', productSerialized]);
  }

  deleteProduct(product: Product) {
    this._ps
      .deleteProduct(product._id)
      .pipe(
        //TODO DOBLE VERIFICACIÓN -> MODAL
        catchError((error) => {
          console.warn(error);
          if (error.status === 500) {
            alert(error.error);
          } else {
            console.error('Unknown error');
          }

          throw error;
        })
      )
      .subscribe((data) => {
        if (data.success)
          this._ps
            .getAllProducts()
            .subscribe((items) => (this.productsList = items));
      });
  }

  //TODO
  salesCorner(product: Product) {}
}

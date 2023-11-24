import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements OnInit {
  title = 'List of product';
  productsList: Product[] = [];

  constructor(
    private _ps: ProductService,
    private _ar: ActivatedRoute,
    private _router: Router,
    private _cr: ChangeDetectorRef
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
          console.warn(error)
          if (error.status === 500) {
            alert(error.error);
          } else {
            console.error('Unknown error');
          }

          throw error;
        })
      )
      .subscribe(() => {
        this.productsList = this.productsList.filter((elem) => elem._id !== product._id);
        this._cr.detectChanges();
        
        //window.location.reload();
      });
  }
}

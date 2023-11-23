import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements OnInit {
  title = 'List of product';
  productsList: Product[] = [];

  constructor(private _ps: ProductService, private _ar: ActivatedRoute, private _router: Router) {
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
}

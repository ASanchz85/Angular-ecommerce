import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  title = 'Create product';
  productForm: FormGroup;
  preview!: string;

  constructor(private _fb: FormBuilder, private _pServ: ProductService) {
    this.productForm = this._fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      isImgFile: [true],
    });
  }

  ngOnInit(): void {}

  addProduct() {
    if (this.productForm.valid) {
      const isImgFile = this.productForm.get('isImgFile')?.value;

      const product: Product = {
        name: this.productForm.get('name')?.value,
        category: this.productForm.get('category')?.value,
        location: this.productForm.get('location')?.value,
        price: this.productForm.get('price')?.value,
        isImgFile: isImgFile,
        image: isImgFile ? this.preview : this.productForm.get('image')?.value,
      };

      this.createProduct(product);
    }
  }

  createProduct(product: Product) {
    this._pServ
      .saveProduct(product)
      .pipe(
        catchError((error) => {
          if (error.status === 500) {
            alert(error.error);
            this.productForm.patchValue({ image: '' });
            this.preview = '';
          } else {
            console.error('Unknown error');
          }

          throw error;
        })
      )
      .subscribe((data) => {
        console.log('success!', data);
      });
  }

  editProduct() {}

  validateInput(typeName: string): boolean {
    let obj = this.productForm.get(typeName);
    return obj !== null && obj?.invalid && obj?.touched;
  }

  setImg(event: any) {
    if (this.productForm.get('isImgFile')?.value) {
      const file = event.target.files[0];

      if (file && file.type.startsWith('image/')) {
        this.extractBase64(file).then((image: any) => {
          this.preview = image.base;
          console.log('Img OK \n', image);
        });
      } else {
        alert('wrong process or img');
        this.productForm.patchValue({ image: '' });
        this.preview = '';
      }
    } else {
      this.preview = this.productForm.get('image')?.value;
    }
  }

  extractBase64 = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            base: reader.result,
          });
        };
        reader.onerror = (err) => {
          reject({
            base: null,
          });
        };
      } catch (err) {
        console.log('extractBase64 error -> ', err);
      }
    });
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  title = 'Create product';
  popover = '';
  glassDisplay = true;
  productForm: FormGroup;
  preview!: string;
  currentProduct!: Product;
  private _credentials!: string;

  constructor(
    private _fb: FormBuilder,
    private _pServ: ProductService,
    private _router: Router,
    private _ar: ActivatedRoute,
    private _authS: AuthService
  ) {
    this.productForm = this._fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      isImgFile: [true],
    });
  }

  ngOnInit(): void {
    this.asEdit();
    /* this._authS
      .getCredentials()
      .subscribe((creds) => (this._credentials = creds.toString())); */
  }

  showPopover() {
    if (this.title === 'Create product') {
      this.popover = 'The image should be a square of at least 400px side';
      this.glassDisplay = false;
      this.preview = '../../../../assets/square_example.jpg';
    }
  }

  restartPopover() {
    if (this.title === 'Create product') {
      this.glassDisplay = true;
      this.preview = '';
    }
  }

  asEdit() {
    this._ar.paramMap.subscribe((data) => {
      const productSerialized = data.get('product') || '';

      if (productSerialized) {
        this.currentProduct = JSON.parse(decodeURIComponent(productSerialized));
        this.title = 'Edit Product';
        this.preview = this.currentProduct.image;
        this.glassDisplay = false;
        this.popover =
          'Remember that the image should be a square of at least 400px side';

        this.productForm.setValue({
          name: this.currentProduct.name,
          category: this.currentProduct.category,
          location: this.currentProduct.location,
          image: this.currentProduct.image,
          price: this.currentProduct.price,
          isImgFile: false,
        });
      }
    });
  }

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

      if (!this.currentProduct) {
        this.createProduct(product);
      } else {
        this.editProduct(product);
      }
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
      .subscribe(() => {
        this._router.navigate(['admin', 'list']);
      });
  }

  editProduct(product: Product) {
    this._pServ
      .updateProduct(this.currentProduct._id, product)
      .pipe(catchError((error) => this.managedErrors(error)))
      .subscribe(() => {
        this._router.navigate(['admin', 'list']);
      });
  }

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

  private managedErrors(error: any) {
    if (error.status === 500) {
      alert(error.error);
      this.productForm.patchValue({ img: '' });
      this.preview = '';
    } else {
      console.error('Managed Error -> Unknown Error');
    }
    // throw error;
    return error;
  }
}

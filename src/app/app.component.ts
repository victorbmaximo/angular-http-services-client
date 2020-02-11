import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';

  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  simpleReqProductObs$: Observable<Product[]>;
  ProductsError: Product[];
  bLoading: boolean = false;
  productsIds: Product[];
  newlyProducts: Product[] = [];

  ngOnInit() {

  }

  getSimpleHttp() {

    this.simpleReqProductObs$ = this.productService.getProducts();

    // this.productService.getProducts().subscribe(
    //   prods => console.log(prods)
    // );
  }

  getWithError() {
    this.bLoading = true;
    this.productService.getProductsErr().subscribe(
      (prods) => {
        this.ProductsError = prods;
        this.bLoading = false;
      },
      (err) => {
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_error'];

        if(err.status == 0) {
          this.snackBar.open('Could not connect to the server', '', config);
        } else {
          this.snackBar.open(err.error.msg, '', config);
        }

        this.bLoading = false;
      }
    );
  }

  getWithErrorOk() {
    this.bLoading = true;

    this.productService.getProductsDelay().subscribe(
      (prods) => {
        this.ProductsError = prods;
        this.bLoading = false;
        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];

        this.snackBar.open('Products Succesfuly loaded', '', config);
      },
      (err) => {
        console.log(err);
        this.bLoading = false;
      }
    );
  }

  getProductsIds() {
    this.productService.getProductsIds().subscribe(
      (ids) => {
        this.productsIds = ids.map(id => ({_id: id, name: '', department: '', price: 0}));
      }
    );
  }

  loadName(id: string) {
    this.productService.getProductName(id).subscribe(
      name => {
       let index = this.productsIds.findIndex(p => p._id === id)
       if(index >= 0) {
         this.productsIds[index].name = name;
       }

      }
    );
  }

  saveProduct(name: string, department: string, price: number) {
    this.bLoading = true;
    let newProduct = {name, department, price}

    this.productService.saveProduct(newProduct).subscribe(
      (p: Product) => {

        console.log(p)
        this.newlyProducts.push(newProduct);
        this.bLoading = false;

      }, (err) => {

        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_error'];

        if(err.status == 0) {
          this.snackBar.open('Could not connect to the server', '', config);
        } else {
          this.snackBar.open(err.error.msg, '', config);
        }

        this.bLoading = false;

      }
    )
  }

}

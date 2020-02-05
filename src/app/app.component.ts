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

  ngOnInit() {

  }

  getSimpleHttp() {

    this.simpleReqProductObs$ = this.productService.getProducts();

    // this.productService.getProducts().subscribe(
    //   prods => console.log(prods)
    // );
  }

  getWithError() {
    this.productService.getProductsErr().subscribe(
      (prods) => {
        this.ProductsError = prods;
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
      }
    );
  }

  getWithErrorOk() {
    this.productService.getProductsDelay().subscribe(
      (prods) => {
        this.ProductsError = prods;

        let config = new MatSnackBarConfig();
        config.duration = 2000;
        config.panelClass = ['snack_ok'];

        this.snackBar.open('Products Succesfuly loaded', '', config);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

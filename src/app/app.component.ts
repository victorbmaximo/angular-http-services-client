import { Component } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from './product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-client';

  constructor(private productService: ProductsService) {}

  simpleReqProductObs$ : Observable<Product[]>

  ngOnInit() {

  }

  getSimpleHttp() {

    this.simpleReqProductObs$ = this.productService.getProducts();

    // this.productService.getProducts().subscribe(
    //   prods => console.log(prods)
    // );
  }

}

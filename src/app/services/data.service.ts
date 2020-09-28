import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';

@Injectable()
export class DataService {
  prodUrl: string = "./assets/products-index.json";
  products: Product[] = [];
  constructor(private httpClient: HttpClient) {

    this.httpClient.get(this.prodUrl).subscribe((res: Object) => {
      this.set_products(res["groups"]);
    });


  }


  set_products(webResp: Object[]) {

    for (let index = 0; index < webResp.length; index++) {
      const f: Object = webResp[index];

      let p: Product = new Product();
      p.id = f["id"];
      p.name = f["name"].toUpperCase();
      p.url = f["links"]["www"];
      p.imageUrl = f["hero"]["href"];
      if (f["images"] && f["images"].length > 0) {

        p.images = f["images"];
      } else {
        p.images = [{ "href": p.imageUrl }];
      }


      //console.log(f);
      if (f["price"]) {
        p.regular = "$" + f["price"]["regular"];
        p.selling = "$" + f["price"]["selling"];
      } else {

        p.regular = "$" + f["priceRange"]["regular"]["high"] + " - $" + f["priceRange"]["regular"]["low"];
        p.selling = "$" + f["priceRange"]["selling"]["high"] + " - $" + f["priceRange"]["selling"]["low"];

      }


      this.products.push(p);
    }

  }



  get_products() {
    return this.products;
  }



}

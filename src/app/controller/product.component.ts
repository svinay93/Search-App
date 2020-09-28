import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from '../services/data.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-root',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  angularForm: FormGroup;
  message: string = 'Implementation of Code Challenge by Sunil Kumar ';

  public products: Product[] = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angularForm = this.fb.group({
      search: ['']
    });

  }





  get_products() {
    this.products = this.filterProducts(this.dataService.get_products());
  }


  filterProducts(products: Product[]) {
    let results: Product[] = [];

    let search = this.angularForm.value['search'].toLowerCase();

    if (search)
      for (let index = 0; index < products.length; index++) {
        const p: Product = products[index];
        if (p.name.toLowerCase().includes(search))
          results.push(p);
      } else {
      results = products;
    }

    if (results.length == 0)
      this.message = "No Products found";
    else
      this.message = results.length + " Products found";


    return results;
  }






}

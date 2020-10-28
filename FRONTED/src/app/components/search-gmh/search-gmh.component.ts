import { Component, OnInit } from '@angular/core';
import { GmhService } from 'src/app/shared/services/gmh.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { CategoryGMH } from 'src/app/shared/models/CategoryGMH.model';
import { GMH } from 'src/app/shared/models/Gmh.model';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ProductsService } from 'src/app/shared/services/products.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search-gmh',
  templateUrl: './search-gmh.component.html',
  styleUrls: ['./search-gmh.component.css'],
})
export class SearchGMHComponent implements OnInit {
  searchForm: FormGroup;
  categories: CategoryGMH[];
  masterCategory: any;
  tatCategories: CategoryGMH[];
  gmhForSearch: any;
  gmhs: GMH[];
  filteredProducts: Observable<Product[]>;
  products: Array<Product>

  constructor(private userService: UserService,private productsService: ProductsService, private router: Router, private gmhService: GmhService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      textSearch: new FormControl(''),
      category: new FormControl('', Validators.required),
      tatCategory: new FormControl({ value: '', disabled: true }, Validators.required),
      location: new FormControl('', Validators.required),
    });
    this.getCategoryGmh();
    this.productsService.getProducts().subscribe(
      res => {this.products = res,
      console.log(res),
    this.filter()},
      err => console.log(err),  
    );
    
  }
filter()
  {
    this.filteredProducts = this.searchForm.controls.textSearch.valueChanges
  .pipe(
    startWith(''),
    map(value => typeof value === 'string' ? value : value.ProductName),
    map(name => name ? this._filter(name) : this.products.slice())
  );
}

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let currLat = position.coords.latitude;
        let currLng = position.coords.longitude;
      });
    }
    else {
      alert("Geolocation is not supported by this browser.");
    }


  }
  private _filter(name: string): Product[] {
    const filterValue = name.toLowerCase();
    return this.products.filter(c => c.Productname.toLowerCase().indexOf(filterValue) === 0);
  }
  
  getCategoryGmh() {
    this.gmhService.getCategoryGmach().subscribe(res => {
      this.categories = res;
      console.log(res);
      err => { console.log(err); }
    });
  }

  handleDestinationChange(a: Address) {
    console.log(a)
  }

  getCategoriesForGmach() {
    this.searchForm.controls['tatCategory'].enable();
    console.log(this.searchForm.controls.category.value);
    this.categories.forEach(element => {
      if (element.CategoryName == this.searchForm.controls.category.value)
        this.masterCategory = element;
    });
    this.gmhService.getCategoriesForGmach(this.masterCategory).subscribe(res => {
      this.tatCategories = res;
      console.log(res);
      err => { console.log(err); }
    });
  }

  search() {
    this.tatCategories.forEach(element => {
      if (element.CategoryName == this.searchForm.controls.tatCategory.value)
        this.gmhForSearch = element;
    });
    this.gmhService.search(this.gmhForSearch).subscribe(res => {
      this.gmhs = res;
      this.gmhs.forEach(e => {
        this.gmhService.getUser(e).subscribe(res => {
          e.User = res;
          err => { console.log(err); }
        });
      });
      console.log(res);
      err => { console.log(err); }
    });
  }

  showGMHS(a) {
    console.log(a);
    this.router.navigate(['/gmh', this.gmhs]);
  }

  displayFn(c: Product): string {
    return c && c.Productname ? c.Productname : '';
  }

}
import { Component } from '@angular/core';
import { BeersService } from '../beers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent {

  beers: any = [];
  filters: any = {};
  storedFilters: any = {};
  showFilters: boolean = false;
  param: any = {
    per_page_array: [10, 20, 30, 40]
  };
  loading: boolean;

  constructor(private beersService: BeersService) { }

  //Get beers list. If no filter is setted than it will return a default list.
  //Default filters are setted in the BeersService.
  getBeers(filters) {
    this.loading = true;
    this.param.maxPagesReached = false;
    this.beersService.getBeers(filters).subscribe(
      beers => {
        if (beers.length > 0 && beers.length == this.filters.per_page) {
          this.beers = beers;
        } else {
          this.beers = beers;
          this.param.maxPagesReached = true;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.error(`GetBeers returned code ${err.status}`);
        }
      },
      () => {
        if (this.storedFilters) localStorage.removeItem('filters');
        this.loading = false
        window.scrollTo(0, 0);
      }
    );
  }

  //Funciton called on page loaded because of the event emitted by filters component
  setFilters(filters) {
    this.storedFilters = JSON.parse(localStorage.getItem('filters'));
    this.filters = this.storedFilters ? this.storedFilters : filters;
    this.getBeers(this.filters);
  }

  //Go to the previous Page
  prevPage() {
    this.filters.page--;
    this.loading = true;
    this.getBeers(this.filters);
  }

  //Go to the next Page
  nextPage() {
    this.filters.page++;
    this.loading = true;
    this.getBeers(this.filters);
  }

  //Set the number of beers to show in one page
  perPage(num) {
    this.filters.per_page = num;
    this.getBeers(this.filters);
  }

  //Store current filters when changing route to get them back when open beers-list view
  storeFilters() {
    localStorage.setItem('filters', JSON.stringify(this.filters));
  }

}

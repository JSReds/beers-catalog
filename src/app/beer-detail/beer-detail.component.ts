import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BeersService } from '../beers.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-beer-detail',
  templateUrl: './beer-detail.component.html',
  styleUrls: ['./beer-detail.component.css']
})
export class BeerDetailComponent implements OnInit {

  filters: any = {};
  beer: any = {};
  loading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private beersService: BeersService) { }

  ngOnInit() {
    this.getBeerDetail()
  }

  //Get beer by id, where id is the route param
  getBeerDetail() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.filters.beerId = params['id'];
      this.beersService.getBeers(this.filters)
      .subscribe(
        beer => this.beer = beer[0],
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred.
            console.error('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            console.error(`GetBeers returned code ${err.status}`);
          }
        },
        () => this.loading = false
      );
    });
  }

}

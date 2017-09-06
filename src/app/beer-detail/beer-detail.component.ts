import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BeersService } from '../beers.service';

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
        error => console.log("err"),
        () => this.loading = false
      );
    });
  }

}

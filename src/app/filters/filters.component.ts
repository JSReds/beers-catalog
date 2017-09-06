import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  showFilters: boolean = false;
  param: any = {};

  constructor(private sharedService: SharedService) {
    //This is a shared service to share a variable.
    //This variable will open and close filters.
    this.sharedService.showFilters$.subscribe(
      data => {
          this.showFilters = data;
      });
  }

  //Event Object
  @Input()
  filters: any = {};

  //Event Emitter
  @Output()
  filtersChanged: EventEmitter<any> = new EventEmitter<any>();

  //Prepare all filters and param object
  ngOnInit() {
    this.filters.page = 1;
    this.filters.per_page = 20;
    this.param.abvLimitsList = [];
    this.param.ibuLimitsList = [];

    for (var x = 0; x <= 100; x++) {
      this.param.ibuLimitsList.push(x);
      if (x + 1 < 13) this.param.abvLimitsList.push(x + 1);
    }
    this.resetFilters();
  }

  //Function called on click when new filters are setted
  //This event will be listen by beers.component to run the getBeers funciton
  emitChanges() {
    this.filtersChanged.emit(this.filters);
  }

  //Function that reset all setted filters.
  resetFilters() {
    this.filters.abv_gt = null;
    this.filters.abv_lt = null;
    this.filters.ibu_gt = null;
    this.filters.ibu_lt = null;
    this.filters.beer_name = null;
    this.emitChanges();
  }

}

import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BeersService {

  constructor(private http: Http) { }

  // Get all posts from the API
  getBeers(filters) {
    let params: URLSearchParams = new URLSearchParams();
    if(filters) {
      console.log(filters)
      params.set('page', filters.page || 1);
      params.set('per_page', filters.per_page || 20);
      params.set('abv_lt', filters.abv_lt || 12);
      params.set('abv_gt', filters.abv_gt || 0);
      params.set('ibu_lt', filters.ibu_lt || 100);
      params.set('ibu_gt', filters.ibu_gt || 0);
      if(filters.beerId || filters.beersId)
        params.set('ids', filters.beerId || filters.beersId)
      if(filters.beer_name && filters.beer_name.length > 0)
        params.set('beer_name', filters.beer_name)
    }

    let requestOptions = new RequestOptions();
    requestOptions.search = params;

    return this.http.get('https://api.punkapi.com/v2/beers', requestOptions)
      .map(res => res.json());
  }

}

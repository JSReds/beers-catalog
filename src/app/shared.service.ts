import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {

  // Observable boolean sources
  private showFilters = new Subject<boolean>();

  // Observable booelan streams
  showFilters$ = this.showFilters.asObservable();

  // Service message commands
  toggleFilters(data: boolean) {
    this.showFilters.next(data);
  }

}

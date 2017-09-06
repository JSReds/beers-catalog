import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  title = 'Beers Catalog';
  subtitle = 'only for experts';
  canGoBack: boolean = false;
  showFilters: boolean = false;

  constructor(private location: Location, router: Router, private sharedService: SharedService) {
    //Listen for router event to enable or disable back button
    router.events
      .subscribe((event: NavigationEnd) => {
        if (this.showFilters) this.toggleFilters();
        if (router.url === "/" || router.url === "/" + router.config[1].path) {
          this.canGoBack = false;
        } else {
          this.canGoBack = true;
        }
      });
  }

  // Function to go to previous view
  backToPrevPage() {
    this.location.back();
  }

  // Function to toggle filters box
  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.sharedService.toggleFilters(this.showFilters);
  }

}

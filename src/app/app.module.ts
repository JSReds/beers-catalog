import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RoutingModule }  from './app.routing';
import { BeersComponent } from './beers/beers.component';
import { BeersService } from './beers.service';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';
import { FiltersComponent } from './filters/filters.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SharedService } from './shared.service';



@NgModule({
  declarations: [
    AppComponent,
    BeersComponent,
    BeerDetailComponent,
    FiltersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [BeersService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

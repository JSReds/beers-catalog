import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeersComponent } from './beers/beers.component';
import { BeerDetailComponent } from './beer-detail/beer-detail.component';



const appRoutes: Routes = [
  { path: '', component: BeersComponent, pathMatch: 'full' },
  { path: 'beers', component: BeersComponent },
  { path: 'beer-detail/:id', component: BeerDetailComponent }
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);

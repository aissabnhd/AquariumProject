import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EspeceUpdateComponent } from './especes/espece-update/espece-update.component';
import { EspecesComponent } from './especes/especes.component';
import { EspeceCreateComponent } from './especes/espece-create/espece-create.component';
import { EspeceFicheComponent } from './especes/espece-fiche/espece-fiche.component';

import {AppComponent} from './app.component'


const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch: 'full' },
  { path: 'especes_update/:id', component: EspeceUpdateComponent },
  { path: 'especes_create', component: EspeceCreateComponent },
  { path: 'especes', component: EspecesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'espece_fiche/:id', component: EspeceFicheComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

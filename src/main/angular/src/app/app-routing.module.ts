import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EspeceUpdateComponent } from './especes/espece-update/espece-update.component';
import { EspecesComponent } from './especes/especes.component';
import { EspeceCreateComponent } from './especes/espece-create/espece-create.component';
import { EspeceFicheComponent } from './especes/espece-fiche/espece-fiche.component';

import {AppComponent} from './app.component'
import {AnimauxComponent} from "./animaux/animaux.component";
import {AnimalCreateComponent} from "./animaux/animal-create/animal-create.component";
import {AnimalUpdateComponent} from "./animaux/animal-update/animal-update.component";
import {AnimalFicheComponent} from "./animaux/animal-fiche/animal-fiche.component";
import {ConnexionComponent} from "./connexion/connexion.component";

import {BassinsComponent} from "./bassins/bassins.component";
import {BassinCreateComponent} from "./bassins/bassin-create/bassin-create.component";
import {BassinUpdateComponent} from "./bassins/bassin-update/bassin-update.component";
import {BassinFicheComponent} from "./bassins/bassin-fiche/bassin-fiche.component";


const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch: 'full' },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'especes_update/:id', component: EspeceUpdateComponent },
  { path: 'especes_create', component: EspeceCreateComponent },
  { path: 'especes', component: EspecesComponent },
  { path: 'espece_fiche/:id', component: EspeceFicheComponent },
  { path: 'home', component: HomeComponent },
  { path: 'animaux', component: AnimauxComponent },
  { path: 'animal_create', component: AnimalCreateComponent },
  { path: 'animal_update/:id', component: AnimalUpdateComponent },
  { path: 'animal_fiche/:id', component: AnimalFicheComponent },
  { path: 'bassins', component: BassinsComponent },
  { path: 'bassin_create', component: BassinCreateComponent },
    { path: 'bassin_update/:id', component: BassinUpdateComponent },
      { path: 'bassin_fiche/:id', component: BassinFicheComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

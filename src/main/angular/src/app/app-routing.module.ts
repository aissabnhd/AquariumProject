import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EspeceUpdateComponent } from './especes/espece-update/espece-update.component';
import { EspecesComponent } from './especes/especes.component';
import { EspeceCreateComponent } from './especes/espece-create/espece-create.component';
import { EspeceFicheComponent } from './especes/espece-fiche/espece-fiche.component';
import { EspeceSearchComponent } from './especes/espece-search/espece-search.component';

import {AppComponent} from './app.component'
import {AnimauxComponent} from "./animaux/animaux.component";
import {AnimalCreateComponent} from "./animaux/animal-create/animal-create.component";
import {AnimalUpdateComponent} from "./animaux/animal-update/animal-update.component";
import {AnimalFicheComponent} from "./animaux/animal-fiche/animal-fiche.component";
import {AnimalSearchComponent} from "./animaux/animal-search/animal-search.component";

import {ConnexionComponent} from "./connexion/connexion.component";

import {BassinsComponent} from "./bassins/bassins.component";
import {BassinCreateComponent} from "./bassins/bassin-create/bassin-create.component";
import {BassinUpdateComponent} from "./bassins/bassin-update/bassin-update.component";
import {BassinFicheComponent} from "./bassins/bassin-fiche/bassin-fiche.component";
import {BassinModifierEspeceComponent} from "./bassins/bassin-modifier-espece/bassin-modifier-espece.component";
import {BassinSearchComponent} from "./bassins/bassin-search/bassin-search.component";

import {SecteursComponent} from "./secteurs/secteurs.component";
import {SecteurCreateComponent} from "./secteurs/secteur-create/secteur-create.component";
import {SecteurUpdateComponent} from "./secteurs/secteur-update/secteur-update.component";
import {SecteurFicheComponent} from "./secteurs/secteur-fiche/secteur-fiche.component";
import {SecteurModifierBassinComponent} from "./secteurs/secteur-modifier-bassin/secteur-modifier-bassin.component";
import {SecteurSearchComponent} from "./secteurs/secteur-search/secteur-search.component";

import {ActivitesComponent} from "./activites/activites.component";
import {ActiviteCreateComponent} from "./activites/activite-create/activite-create.component";
import {ActiviteUpdateComponent} from "./activites/activite-update/activite-update.component";
import {ActiviteSearchComponent} from "./activites/activite-search/activite-search.component";
import {EmployesComponent} from "./employes/employes.component";
import {EmployeCreateComponent} from "./employes/employe-create/employe-create.component";
import {EmployeUpdateComponent} from "./employes/employe-update/employe-update.component";
import {EmployeSearchComponent} from "./employes/employe-search/employe-search.component";
import {CalendriersComponent} from "./calendriers/calendriers.component";
import {CalendrierComponent} from "./calendriers/calendrier/calendrier.component";
import {CalendrierBassinComponent} from "./calendriers/calendrier-bassin/calendrier-bassin.component";


const routes: Routes = [
  { path: '', redirectTo: 'home/visiteur',pathMatch: 'full' },
  { path: 'home/:role', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },

  { path: 'especes/:role', component: EspecesComponent },
  { path: 'especes_create/:role', component: EspeceCreateComponent },
  { path: 'especes_update/:role/:id', component: EspeceUpdateComponent },
  { path: 'espece_fiche/:role/:id', component: EspeceFicheComponent },
  { path: 'espece_search/:role', component: EspeceSearchComponent },

  { path: 'animaux/:role', component: AnimauxComponent },
  { path: 'animal_create/:role', component: AnimalCreateComponent },
  { path: 'animal_update/:role/:id', component: AnimalUpdateComponent },
  { path: 'animal_fiche/:role/:id', component: AnimalFicheComponent },
  { path: 'animal_search/:role', component: AnimalSearchComponent },

  { path: 'bassins/:role', component: BassinsComponent },
  { path: 'bassin_create/:role', component: BassinCreateComponent },
  { path: 'bassin_update/:role/:id', component: BassinUpdateComponent },
  { path: 'bassin_fiche/:role/:id', component: BassinFicheComponent },
  { path: 'bassin_modifier_espece/:role/:id', component: BassinModifierEspeceComponent },
  { path: 'bassin_search/:role', component: BassinSearchComponent },

  { path: 'secteurs/:role', component: SecteursComponent },
  { path: 'secteur_create/:role', component: SecteurCreateComponent },
  { path: 'secteur_update/:role/:id', component: SecteurUpdateComponent },
  { path: 'secteur_fiche/:role/:id', component: SecteurFicheComponent },
  { path: 'secteur_modifier_bassin/:role/:id', component: SecteurModifierBassinComponent },
  { path: 'secteur_search/:role', component: SecteurSearchComponent },

  { path: 'activites/:role', component: ActivitesComponent },
  { path: 'activite_create/:role', component: ActiviteCreateComponent },
  { path: 'activite_update/:role/:id', component: ActiviteUpdateComponent },
  { path: 'activite_search/:role', component: ActiviteSearchComponent },

  { path: 'employes/:role', component: EmployesComponent },
  { path: 'employe_create/:role', component: EmployeCreateComponent },
  { path: 'employe_update/:role/:id', component: EmployeUpdateComponent },
  { path: 'employe_search/:role', component: EmployeSearchComponent },

  { path: 'calendriers/:role', component: CalendriersComponent },
  { path: 'calendrier/:role/:id', component: CalendrierComponent },
  { path: 'calendrierBassin/:role/:id', component: CalendrierBassinComponent }










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

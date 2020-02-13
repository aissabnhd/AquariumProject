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
import {BassinModifierEspeceComponent} from "./bassins/bassin-modifier-espece/bassin-modifier-espece.component";

import {SecteursComponent} from "./secteurs/secteurs.component";
import {SecteurCreateComponent} from "./secteurs/secteur-create/secteur-create.component";
import {SecteurUpdateComponent} from "./secteurs/secteur-update/secteur-update.component";
import {SecteurFicheComponent} from "./secteurs/secteur-fiche/secteur-fiche.component";
import {SecteurModifierBassinComponent} from "./secteurs/secteur-modifier-bassin/secteur-modifier-bassin.component";

import {ActivitesComponent} from "./activites/activites.component";
import {ActiviteCreateComponent} from "./activites/activite-create/activite-create.component";
import {ActiviteUpdateComponent} from "./activites/activite-update/activite-update.component";
import {ActiviteFicheComponent} from "./activites/activite-fiche/activite-fiche.component";


const routes: Routes = [
  { path: '', redirectTo: 'home',pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },

  { path: 'especes', component: EspecesComponent },
  { path: 'especes_create', component: EspeceCreateComponent },
  { path: 'especes_update/:id', component: EspeceUpdateComponent },
  { path: 'espece_fiche/:id', component: EspeceFicheComponent },


  { path: 'animaux', component: AnimauxComponent },
  { path: 'animal_create', component: AnimalCreateComponent },
  { path: 'animal_update/:id', component: AnimalUpdateComponent },
  { path: 'animal_fiche/:id', component: AnimalFicheComponent },

  { path: 'bassins', component: BassinsComponent },
  { path: 'bassin_create', component: BassinCreateComponent },
  { path: 'bassin_update/:id', component: BassinUpdateComponent },
  { path: 'bassin_fiche/:id', component: BassinFicheComponent },
  { path: 'bassin_modifier_espece/:id', component: BassinModifierEspeceComponent },

  { path: 'secteurs', component: SecteursComponent },
  { path: 'secteur_create', component: SecteurCreateComponent },
  { path: 'secteur_update/:id', component: SecteurUpdateComponent },
  { path: 'secteur_fiche/:id', component: SecteurFicheComponent },
  { path: 'secteur_modifier_bassin/:id', component: SecteurModifierBassinComponent },

  { path: 'activites', component: ActivitesComponent },
  { path: 'activite_create', component: ActiviteCreateComponent },
  { path: 'activite_update/:id', component: ActiviteUpdateComponent },
  { path: 'activite_fiche/:id', component: ActiviteFicheComponent },









];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

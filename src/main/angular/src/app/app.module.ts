import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspecesComponent } from './especes/especes.component';
import { EspeceComponent } from './especes/espece/espece.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EspeceCreateComponent } from './especes/espece-create/espece-create.component';
import { EspeceUpdateComponent } from './especes/espece-update/espece-update.component';

import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EspeceFicheComponent } from './especes/espece-fiche/espece-fiche.component';
import { HomeComponent } from './home/home.component';
import { AnimauxComponent } from './animaux/animaux.component';
import { AnimalComponent } from './animaux/animal/animal.component';
import { AnimalCreateComponent } from './animaux/animal-create/animal-create.component';
import { AnimalUpdateComponent } from './animaux/animal-update/animal-update.component';
import { AnimalFicheComponent } from './animaux/animal-fiche/animal-fiche.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { BassinsComponent } from './bassins/bassins.component';
import { BassinCreateComponent } from './bassins/bassin-create/bassin-create.component';
import { BassinComponent } from './bassins/bassin/bassin.component';
import { BassinUpdateComponent } from './bassins/bassin-update/bassin-update.component';
import { BassinFicheComponent } from './bassins/bassin-fiche/bassin-fiche.component';
import { BassinModifierEspeceComponent } from './bassins/bassin-modifier-espece/bassin-modifier-espece.component';
import { SecteursComponent } from './secteurs/secteurs.component';
import { SecteurComponent } from './secteurs/secteur/secteur.component';
import { SecteurCreateComponent } from './secteurs/secteur-create/secteur-create.component';
import { SecteurUpdateComponent } from './secteurs/secteur-update/secteur-update.component';
import { SecteurFicheComponent } from './secteurs/secteur-fiche/secteur-fiche.component';
import { SecteurModifierBassinComponent } from './secteurs/secteur-modifier-bassin/secteur-modifier-bassin.component';
import { ActivitesComponent } from './activites/activites.component';
import { ActiviteComponent } from './activites/activite/activite.component';
import { ActiviteCreateComponent } from './activites/activite-create/activite-create.component';
import { ActiviteFicheComponent } from './activites/activite-fiche/activite-fiche.component';
import { ActiviteUpdateComponent } from './activites/activite-update/activite-update.component';
import { EspeceSearchComponent } from './especes/espece-search/espece-search.component';
import { AnimalSearchComponent } from './animaux/animal-search/animal-search.component';
import { BassinSearchComponent } from './bassins/bassin-search/bassin-search.component';
import { SecteurSearchComponent } from './secteurs/secteur-search/secteur-search.component';
import { ActiviteSearchComponent } from './activites/activite-search/activite-search.component';
import { EmployesComponent } from './employes/employes.component';
import { EmployeComponent } from './employes/employe/employe.component';
import { EmployeCreateComponent } from './employes/employe-create/employe-create.component';
import { EmployeUpdateComponent } from './employes/employe-update/employe-update.component';
import { EmployeFicheComponent } from './employes/employe-fiche/employe-fiche.component';
import { EmployeSearchComponent } from './employes/employe-search/employe-search.component';

@NgModule({
  declarations: [
    AppComponent,
    EspecesComponent,
    EspeceComponent,
    EspeceCreateComponent,
    EspeceUpdateComponent,
    EspeceFicheComponent,
    HomeComponent,
    AnimauxComponent,
    AnimalComponent,
    AnimalCreateComponent,
    AnimalUpdateComponent,
    AnimalFicheComponent,
    ConnexionComponent,
    BassinsComponent,
    BassinCreateComponent,
    BassinComponent,
    BassinUpdateComponent,
    BassinFicheComponent,
    BassinModifierEspeceComponent,
    SecteursComponent,
    SecteurComponent,
    SecteurCreateComponent,
    SecteurUpdateComponent,
    SecteurFicheComponent,
    SecteurModifierBassinComponent,
    ActivitesComponent,
    ActiviteComponent,
    ActiviteCreateComponent,
    ActiviteFicheComponent,
    ActiviteUpdateComponent,
    EspeceSearchComponent,
    AnimalSearchComponent,
    BassinSearchComponent,
    SecteurSearchComponent,
    ActiviteSearchComponent,
    EmployesComponent,
    EmployeComponent,
    EmployeCreateComponent,
    EmployeUpdateComponent,
    EmployeFicheComponent,
    EmployeSearchComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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

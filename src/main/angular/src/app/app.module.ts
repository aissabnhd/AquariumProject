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

@NgModule({
  declarations: [
    AppComponent,
    EspecesComponent,
    EspeceComponent,
    EspeceCreateComponent,
    EspeceUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

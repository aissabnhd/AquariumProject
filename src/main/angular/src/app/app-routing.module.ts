import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EspeceUpdateComponent } from './especes/espece-update/espece-update.component';
import { EspecesComponent } from './especes/especes.component';
import { EspeceCreateComponent } from './especes/espece-create/espece-create.component';



const routes: Routes = [
  { path: 'especes_update/:id', component: EspeceUpdateComponent },
  { path: 'especes_create', component: EspeceCreateComponent },
  { path: 'especes', component: EspecesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddorupdateComponent } from './home/addorupdate/addorupdate.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signup',component:AddorupdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

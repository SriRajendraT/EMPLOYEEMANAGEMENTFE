import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicGets } from './Services/Api-servies/BasicGets-Api-Service';
import { EmployeeApi } from './Services/Api-servies/Employee-Api-Service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddorupdateComponent } from './home/addorupdate/addorupdate.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AddorupdateComponent],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [BasicGets, EmployeeApi],
  bootstrap: [AppComponent],
})
export class AppModule {}

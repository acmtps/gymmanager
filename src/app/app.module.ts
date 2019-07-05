import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth.component'
import { AppRoutingModule }     from './app-routing.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import {DashboardComponent} from './Dashboardcomponent/dashboard.component';
import {GYMService} from './services/heroes.service';
import {HttpErrorHandler} from './http-error-handler.service';
import {DialogOverviewExampleDialog} from'./Dashboardcomponent/dashboard.component';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
	AppRoutingModule,
	AngularMaterialModule,
  FormsModule,
  ReactiveFormsModule
  ],
  declarations: [ AppComponent ,AuthComponent,DashboardComponent,DialogOverviewExampleDialog],
  providers: [GYMService,HttpErrorHandler],
  bootstrap: [ AppComponent ],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule {}

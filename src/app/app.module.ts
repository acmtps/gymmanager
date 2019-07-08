import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import {  HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth.component'
import { AppRoutingModule }     from './app-routing.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import {DashboardComponent} from './Dashboardcomponent/dashboard.component';
import {GYMService} from './services/heroes.service';
import {HttpErrorHandler} from './http-error-handler.service';
import {DialogOverviewExampleDialog} from'./Dashboardcomponent/dashboard.component';
import { ErrorDialogService } from './error-dialog/errordialog.service';
import { ErrorDialogComponent } from './error-dialog/errordialog.component';

import { HttpConfigInterceptor} from './interceptor/httpconfig.interceptor';

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
  declarations: [ AppComponent ,ErrorDialogComponent,AuthComponent,DashboardComponent,DialogOverviewExampleDialog],
  providers: [GYMService,HttpErrorHandler,ErrorDialogService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [ AppComponent ],
  entryComponents: [DialogOverviewExampleDialog,ErrorDialogComponent]
})
export class AppModule {}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';



import { MAT_DATE_LOCALE } from '@angular/material';
import { AngularMaterialModule } from '../shared/angular-material.module';

@NgModule({
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "EN" }
  ],
   declarations: []
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule
              ) {
  }

}
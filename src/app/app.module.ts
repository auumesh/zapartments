import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpService} from './service';
import { Http, HttpModule, RequestOptions, XHRBackend,BrowserXhr } from '@angular/http';
import {AppRoutingModule} from './app.route';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {DropdownModule} from 'primeng/dropdown';


export function httpInterceptor(backend: XHRBackend,
  defaultOptions: RequestOptions) {
  return new HttpService(backend, defaultOptions);
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    DropdownModule
  ],
  providers: [
    {
      provide: HttpService, 
      useFactory: httpInterceptor,
      deps: [ XHRBackend, RequestOptions ]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import {HttpService} from './service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public service:HttpService){
      // this.service.get('https://httpbin.org/get').map((res:Response)=>res.json()).subscribe(res=>{
      //   console.log(res);
      // })
  }
}

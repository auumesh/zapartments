import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class PropertyDetailService {
    constructor(private http: HttpService) { }

    getPropertyList(postBody){
        return this.http.post(this.http.serviceUrl + 'properties/properties',postBody).map((response: Response) => response.json());
  }
    


}


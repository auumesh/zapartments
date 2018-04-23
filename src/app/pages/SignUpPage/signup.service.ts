import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response ,  } from '@angular/http';
import { HttpService } from './../../service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class SignUpService {
    constructor(private http: HttpService ) { }
  //=================get room type dropdown detail===============
  getCommuteMethodListDetails() {
    var CommuteMethodList = [
        { label: 'I drive (with traffic)', value: 'I drive (with traffic)' },
        { label: 'I drive (without traffic)', value: 'I drive (without traffic)' },
        { label: 'I ride public transit', value: 'I ride public transit' },
        { label: 'I bike', value: 'I bike' },

    ];
    return CommuteMethodList;
}
    //===================add new property=====================
    signupprocess (Detail) {
        return this.http.post(this.http.serviceUrl + 'public/properties/signup_process',Detail).map((response: Response) => response.json());
    }
   
  
    getIpaddress () {
        return this.http.post('https://goferapi.ambivo.com/public/get_ip','').map((response: Response) => response.json());
    }
   // 

}


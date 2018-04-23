import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class LoginPageService {
    constructor(private http: HttpService) { }

    LoginProcess (userName,password) {
        return this.http.post(this.http.serviceUrl +'user/login?email='+userName+'&password='+password+'&os_version=xyz&os=xyz&device_id=xyz','').map((response: Response) => response.json());
    }

}
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class ManagementCompanyService {
    constructor(private http: HttpService) { }

    public addmanagementCompany(managementDetail) {
        return this.http.post(this.http.serviceUrl + 'properties/companies', managementDetail).map((response: Response) => response.json());
    }
    public getmanagementCompany(managementDetail) {
        
        return this.http.post(this.http.serviceUrl + 'properties/companies', managementDetail).map((response: Response) => response.json());
    }
}
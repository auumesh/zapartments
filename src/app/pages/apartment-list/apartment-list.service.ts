import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class ApartmentService {
    constructor(private http: HttpService) { }

    getPropertySearchList(postBody) {
        return this.http.post(this.http.serviceUrl + 'properties/properties/search', postBody).map((response: Response) => response.json());
    }
    getPropertyList(postBody) {
        return this.http.post(this.http.serviceUrl + 'properties/properties', postBody).map((response: Response) => response.json());
    }
    getcitiesDropdownDetails(postBody) {
        return this.http.post(this.http.serviceUrl + 'properties/properties/location/count', postBody).map((response: Response) => response.json());
    }
    getmanagementCompanyDropdownDetails(postBody) {
        return this.http.post(this.http.serviceUrl + 'properties/companies', postBody).map((response: Response) => response.json());
    }
    getBedRoomDropdownDetails() {
        var bedRoom = [
            { label: 'Studio', value: '1' },
            { label: '1 Bed', value: '1' },
            { label: '2 Bed', value: '2' },
            { label: '3+ Beds', value: '3' }
        ];
        return bedRoom;
    }
    getRentListDropdownDetails() {
        var rentList = [
            { label: '1000 - 2000', value: '1000 - 2000' },
            { label: '2000 - 3000', value: '2000 - 3000' },
            { label: '3000 - 4000', value: '3000 - 4000' },
            { label: '4000 - 5000', value: '4000 - 5000' },
            { label: '5000 - 6000', value: '5000 - 6000' },
            { label: '6000 - 7000', value: '6000 - 7000' },
            { label: '7000 - 8000', value: '7000 - 8000' },
            { label: '8000 - 9000', value: '8000 - 9000' },
            { label: '9000 - 10000', value: '9000 - 10000' },
        ];
        return rentList;
    }

}


import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class IndexService {
    constructor(private http: HttpService) { }

    getPropertyList() {

        var postBody: any = { "action": "get" };
        return this.http.post(this.http.serviceUrl + 'properties/properties', postBody).map((response: Response) => response.json());

    }
    getRentFrom() {
        var iconList = [
            { label: '1000 - 2000', value: 'One' },
            { label: '2001 - 3000', value: '2' },
            { label: '3001 - 4000', value: '3' },
            { label: '4001 - 5000', value: '4' },
            { label: '5001 - 6000', value: '5' },
            { label: '6001 - 7000', value: '6' },
            { label: '7001 - 8000', value: '7' },
            { label: '8001 - 9000', value: '8' },
            { label: '9001 - 10000', value: '9' }
        ];
        return iconList;
        // return this.http.get('').map((response: Response) => response.json());
    }
    getRoomType() {
        var iconList = [
            { label: 'Studio', value: 'Studio' },
            { label: '1 Bed Room', value: '1bedroom' },
            { label: '2 Bed Room', value: '2bedroom' },
            { label: '3+ Bed Room', value:'3bedroom' }
        ];
        return iconList;
        // return this.http.get('').map((response: Response) => response.json());
    }
}


import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class UserInfoService {
    constructor(private http: HttpService) { }
    getMonthlyHousehold() {
        return this.http.get('').map((response: Response) => [
            { label: 'Under $1,500', value: 'Under' },
            { label: '$2,500', value: '2' },
            { label: '$3,000', value: '3' },
            { label: '$3,500', value: '4' },
            { label: '$4,000', value: '5' },
            { label: '$4,500', value: '6' },
            { label: '$5,000', value: '7' },
            { label: '$6,000', value: '8' },
            { label: '$7,000', value: '9' },
            { label: '$8,000', value: '10' },
            { label: '$9,000', value: '11' },
            { label: 'Over $10,000', value: '12' }
        ]);
    }
    getEmailUpdates() {
        return this.http.get('').map((response: Response) => [
            { label: 'Send me updates', value: 'sentupdate' },
            { label: 'Dont send me updates', value: 'dontsent' }
        ]);
    }
    getEvictions() {
        return this.http.get('').map((response: Response) => [
            { label: 'I have never been evication', value: '1' },
            { label: 'I have been evicted', value: '2' }
        ]);
    }
    getCommuteMethod() {
        return this.http.get('').map((response: Response) => [
            { label: 'I drive (without traffic)', value: '1' },
            { label: 'I drive (with traffic)', value: '2' },
            { label: 'I ride public transit', value: '3' },
            { label: 'I bike', value: '4' }
        ]);
    }
    getCommuteLength() {
        return this.http.get('').map((response: Response) => [
            { label: '5 minutes', value: '1' },
            { label: '10 minutes', value: '2' },
            { label: '15 minutes', value: '3' },
            { label: '20 minutes', value: '4' },
            { label: '25 minutes', value: '5' },
            { label: '30 minutes', value: '6' },
            { label: '35 minutes', value: '7' },
            { label: '40 minutes', value: '8' },
            { label: '45 minutes', value: '9' },
            { label: '50 minutes', value: '10' },
            { label: '55 minutes', value: '11' },
            { label: '60 minutes', value: '12' }
        ]);
    }
    getLaundry() {
        return this.http.get('').map((response: Response) => [
            { label: 'In-unit Laundry', value: 'in-unit laundry' },
            { label: 'On-site Laundry', value: 'on-site laundry' },
            { label: 'Washer / Dryer Connectios', value: 'washer/dryer connections' }
        ]);
    }
    getAmenities() {
        return this.http.get('').map((response: Response) => [
            { label: 'Air Conditioning', value: 'Air Conditioning' },
            { label: 'Patio/Balcony', value: 'Patio/Balcony' },
            { label: 'Dishwasher', value: 'Dishwasher' },
            { label: 'Gym', value: 'Gym' },
            { label: 'Hardwood floors', value: 'Hardwood floors' },
            { label: 'Pool', value: 'Pool' }
        ]);
    
    }

    getsigningtheleaseDetails() {
      //  1='roommate', 2='cosigner' 3='just me'"
        var signingthelease = [
            { label: 'Roommates, partner, etc.', value: '1' },
            { label: 'A cosigner', value: '2' },
            { label: 'Me, myself, and I', value: '3' },
        ];
        return signingthelease;
    }
   getLoginDetails (userName,password) {
        return this.http.post(this.http.serviceUrl +'user/login?email='+userName+'&password='+password+'&os_version=xyz&os=xyz&device_id=xyz','').map((response: Response) => response.json());
    }
    updatematch_preferences (data) {
        return this.http.post(this.http.serviceUrl +'user/match_preferences',data).map((response: Response) => response.json());
    }


    
}


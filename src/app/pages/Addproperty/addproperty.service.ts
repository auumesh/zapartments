import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpService } from './../../service';
@Injectable()
export class AddPropertyService {
    constructor(private http: HttpService) { }

    //=================get icon list dropdown detail===============
    getIconListDropdownDetails() {
        var iconList = [
            { label: 'Pet Friendly', value: 'Petfriendly' },
            { label: 'Smoke Free', value: 'Smokefree' },
            { label: 'Onsite Garden', value: 'garden' }
        ];
        return iconList;
        // return this.http.get('').map((response: Response) => response.json());
    }
    //=================get apartment type dropdown detail===============
    getApartmentTypeDropdownDetails() {
        var apartmentType = [
            { label: 'Studio', value: 'Studio' },
            { label: 'Two Bedroom', value: 'Two Bedroom' },
            { label: 'Three Bedroom', value: 'Three Bedroom' }
        ];
        return apartmentType;
        // return this.http.get('').map((response: Response) => response.json());
    }
    //=================get kind type dropdown detail===============
    getKindTypeDropdownDetails() {
        var kindType = [
            { label: 'Town Home', value: 'townhome' },
            { label: 'Duplex', value: 'duplex' },
            { label: 'Single', value: 'single' },
            { label: 'Efficiency', value: 'efficiency' },
            { label: 'Studio', value: 'studio' },
            { label: 'Loft', value: 'loft' },
            { label: 'Alcove', value: 'alcove' },
            { label: 'Triplex', value: 'triplex' },
            { label: 'Junior', value: 'junior' },
            { label: 'Flat', value: 'flat' },
            { label: 'Convertible', value: 'convertible' },
            { label: 'In-law', value: 'In-law' },
            { label: 'Junior 4', value: 'junior4' },
            { label: 'Classic 6', value: 'classic6' },
            { label: 'Garden', value: 'garden' },
            { label: 'Other', value: 'other' },
        ];
        return kindType;
    }
    //=================get room type dropdown detail===============
    getRoomTypeDropdownDetails() {
        var roomType = [
            { label: 'Bedroom', value: 'Bedroom' },
            { label: 'Bathroom', value: 'Bathroom' },
            { label: 'Living', value: 'Living' },
            { label: 'Family', value: 'Family' },
            { label: 'Kitchen', value: 'Kitchen' },
            { label: 'Media', value: 'Media' },
        ];
        return roomType;
    }
    //=================get amount type dropdown detail===============
    getAmountTypeDropdownDetails() {
        var amountType = [
            { label: 'Actual', value: 'actual' },
        ];
        return amountType;
    }
    //=================get deposit type dropdown detail===============
    getDepositTypeDropdownDetails() {
        var depositType = [
            { label: 'Deposit', value: 'deposit' },
        ];
        return depositType;
    }
    //=================get prorate type dropdown detail===============
    getProrateTypeDropdownDetails() {
        var depositType = [
            { label: 'Standard', value: 'Standard' },
        ];
        return depositType;
    }
    //=================get late type dropdown detail===============
    getLateTypeDropdownDetails() {
        var depositType = [
            { label: '% of owed', value: '% of owed' },
        ];
        return depositType;
    }


    //=================get apartment type dropdown detail===============
    getpropertyType() {
        var propertyType = [
            { label: 'Pets', value: 'Pets' },
            { label: 'Others', value: 'Others' }
        ]

        return propertyType;
        // return this.http.get('').map((response: Response) => response.json());
    }
    //=================get apartment type dropdown detail===============
    getServiceType() {
        var serviceType = [
            { label: 'Bus', value: 'Bus' },
            { label: 'Elementary School', value: 'ElementarySchool' },
            { label: 'Middle School', value: 'MiddleSchool' },
            { label: 'High School', value: 'HighSchool' },
            { label: 'Highway', value: 'Highway' },
            { label: 'Laundromat', value: 'Laundromat' },
            { label: 'Train', value: 'Train' },
            { label: 'Park', value: 'Park' },
            { label: 'University', value: 'University' },
            { label: 'Other', value: 'Other' }
        ]
        return serviceType;
        // return this.http.get('').map((response: Response) => response.json());
    }
    //===================get feature dropdown detail============
    getFeatureDropdownDetails() {
        var tempBody = '{"action":"get"}';
        return this.http.post(this.http.serviceUrl + 'properties/features', tempBody).map((response: Response) => response.json());
    }
    //===================add new property=====================
    addNewPropertyDetail(propertyDetail) {
        return this.http.post(this.http.serviceUrl + 'properties/properties', propertyDetail).map((response: Response) => response.json());
    }
    //===================add new floor plan detail==================
    addNewFloorPlanDetail(floorPlanDetail) {
        return this.http.post(this.http.serviceUrl + 'properties/floor_plans', floorPlanDetail).map((response: Response) => response.json());
    }
    //================upload files==============
    uploadFileToActivity(fileToUpload) {
        return this.http.post(this.http.serviceUrl + 'user/file_upload', fileToUpload).map((response: Response) => response.json());
    }
    //======================get property details=================
    getPropertyList(postBody) {
        return this.http.post(this.http.serviceUrl + 'properties/properties', postBody).map((response: Response) => response.json());
    }
    //===================add new property=====================
    saveNewUnitDetail(unitDetail) {
        return this.http.post(this.http.serviceUrl + 'properties/property_units', unitDetail).map((response: Response) => response.json());
    }
    //========delete upload image============
    removeUploadedImage(deleteObj) {
        return this.http.post(this.http.serviceUrl + 'user/remove_file?file_id=' + deleteObj.file_id + '&purpose=' + deleteObj.purpose, '').map((response: Response) => response.json());

    }

    //===================add new property=====================
    saveManagementcompany(unitDetail) {
        return this.http.post(this.http.serviceUrl + '/properties/neighborhoods', unitDetail).map((response: Response) => response.json());
    }
    getUnitDetailsById(postBody) {
        //{"action":"get", "unit_id":"5aaf21678b578671c473944b"}
        return this.http.post(this.http.serviceUrl + 'properties/property_units', postBody).map((response: Response) => response.json());
    }
}


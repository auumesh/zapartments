import { Component, OnInit } from '@angular/core';
import { UserInfoService } from './userinfo.service';
import { UserInfoModel, BedsModel, BathsModel, PetsModel, user_info_detail, GeocoderRequests } from './userinfo.model';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { DatePipe, DecimalPipe } from '@angular/common';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.html',
  //styleUrls: ['./apartment-list.component.css']
})
export class UserInfoComponent implements OnInit {
  public getMonthlyHouseholdList: any[] = [];
  public getMailUpdateList: any[] = [];
  public getEvictionList: any[] = [];
  public getCommuteMethodList: any[] = [];
  public getCommuteLengthList: any[] = [];
  public getLaundryList: any[] = [];
  public getAmenitiesList: any[] = [];
  public userInfoModel: UserInfoModel;
  public bedsModel: BedsModel;
  public bathsModel: BathsModel;
  public petsModel: PetsModel;
  public userDetails: any;
  public user_info = new user_info_detail();
  public stored_user_info = new user_info_detail();
  public pet_selection = [];
  public signingthelease = [];
  public latitude = 0;
  public longitude = 0;
  request = new GeocoderRequests()
  street = '';
  showmap = false;
  constructor(public service: UserInfoService, private datePipe: DatePipe) {
    this.bedsModel = new BedsModel();
    this.bathsModel = new BathsModel();
    this.petsModel = new PetsModel();

  }
  ngOnInit() {
    // var details = ['', 'Dogs', 'Cats', 'Others']
    this.pet_selection['Dogs'] = false;
    this.pet_selection['Cats'] = false;
    this.pet_selection['Others'] = false;
    var username = localStorage.getItem("userName")
    var password = localStorage.getItem("password")
    this.service.getLoginDetails(username, password).subscribe(result => {
      this.userDetails = result.user;

      this.user_info.name = this.userDetails.name;
      this.user_info.phone = this.userDetails.phone;
      this.user_info.monthly_income = this.userDetails.match_preferences_dict.monthly_income;
      this.user_info.evicted = this.userDetails.match_preferences_dict.evicted;
      this.user_info.movein_date = this.timestampConversion(this.userDetails.match_preferences_dict.movein_date);
      this.user_info.email = this.userDetails.email;
      this.user_info.bedrooms = this.userDetails.match_preferences_dict.bedrooms;
      this.user_info.pets = this.userDetails.match_preferences_dict.pets;
      this.user_info.lease_length = this.userDetails.match_preferences_dict.lease_length;
      this.user_info.cosigner = this.userDetails.match_preferences_dict.cosigner;
      //this.user_info.formatted_address = this.userDetails.match_preferences_dict.commute_location_dict.formatted_address;
      this.user_info.commute_max_mins = this.userDetails.match_preferences_dict.commute_max_mins;
      this.user_info.commute_mode = this.userDetails.match_preferences_dict.commute_mode;
      this.user_info.pets.forEach(element => {
        this.pet_selection[element] = true;
      });
      this.user_info.main_amenities = this.userDetails.match_preferences_dict.main_amenities;
      this.user_info.other_features = this.userDetails.match_preferences_dict.other_features;
      console.log(this.userDetails.match_preferences_dict.move_location_dict)

      this.user_info.move_location_dict.formatted_address = this.userDetails.match_preferences_dict.move_location_dict.formatted_address
      // public move_location_dict=new address();
      //public commute_location_dict=new address();
      this.user_info.move_location_dict.latitude = this.userDetails.match_preferences_dict.move_location_dict.location_coords[1];
      this.user_info.move_location_dict.longitude = this.userDetails.match_preferences_dict.move_location_dict.location_coords[0];
      this.user_info.move_location_dict.street = this.userDetails.match_preferences_dict.move_location_dict.neighborhood_short_name


      this.user_info.commute_location_dict.formatted_address = this.userDetails.match_preferences_dict.commute_location_dict.formatted_address
      // public move_location_dict=new address();
      //public commute_location_dict=new address();
      this.user_info.commute_location_dict.latitude = this.userDetails.match_preferences_dict.commute_location_dict.location_coords[1];
      this.user_info.commute_location_dict.longitude = this.userDetails.match_preferences_dict.commute_location_dict.location_coords[0];
      this.user_info.commute_location_dict.street = this.userDetails.match_preferences_dict.commute_location_dict.neighborhood_short_name



      this.showmap = true;

      this.stored_user_info = _.cloneDeep(this.user_info)
    });

    this.DropDown();
  }

  //DateConversion
  timestampConversion(date) {
    if (date != undefined && date != '') {
      if (isNaN(Date.parse(date))) {
        return new Date(date * 1000)
      }
      else {
        return new Date(date)
      }
    }
    else {
      return '';
    }
  }
  DropDown() {
    this.service.getMonthlyHousehold().subscribe(result => {
      this.getMonthlyHouseholdList = result;
    });
    this.service.getEmailUpdates().subscribe(result => {
      this.getMailUpdateList = result;
    });
    this.service.getEvictions().subscribe(result => {
      this.getEvictionList = result;
    });
    this.service.getCommuteMethod().subscribe(result => {
      this.getCommuteMethodList = result;
    });
    this.service.getCommuteLength().subscribe(result => {
      this.getCommuteLengthList = result;
    });
    this.service.getLaundry().subscribe(result => {
      this.getLaundryList = result;
    });
    this.service.getAmenities().subscribe(result => {
      this.getAmenitiesList = result;
    });
    this.signingthelease = this.service.getsigningtheleaseDetails();
    this.userInfoModel = new UserInfoModel();
  }



  changepreference(value, from) {
    if (from == 'bed') {
      this.user_info.bedrooms = value;
    }
    else if (from == 'pets') {
      this.pet_selection[value] = !this.pet_selection[value];
    }
  }

  findDifference() {
    var compare = ['name', 'phone', 'monthly_income', 'evicted', 'movein_date', 'email', 'bedrooms', 'pets', 'lease_length'
      , 'cosigner', 'formatted_address', 'commute_max_mins', 'commute_mode',
      'main_amenities', 'other_features'];
    var updatemodel: any = {};
    // updatemodel.match_preferences={};
    // updatemodel.match_preferences.commute_location_dict=this.user_info.commute_location_dict;

    compare.forEach(data => {
      if (Array.isArray(this.stored_user_info[data])) {
        if (_.difference(this.user_info[data], this.stored_user_info[data]).length > 0) {
          updatemodel.match_preferences[data] = this.user_info[data]
        }
      }
      else {
        if (data != 'movein_date' && this.stored_user_info[data] != this.user_info[data]) {
          updatemodel.match_preferences[data] = this.user_info[data]
        }
        else if (data == 'movein_date') {
          if ((this.dateconversion(this.stored_user_info[data]).getTime() - this.dateconversion(this.user_info[data]).getTime()) != 0) {
            updatemodel.match_preferences[data] = this.user_info[data]
          }
        }
      }
    })

    //this.user_info.commute_location_dict.formatted_address
    updatemodel.userid = localStorage.getItem('id');

    this.service.updatematch_preferences(updatemodel).subscribe(result => {
      console.log(result)
    });
    //  
  }
  dateconversion(date) {
    return new Date(this.datePipe.transform(date, 'yyyy-MM-dd').toString());
  }

  updateDiv(position, from) {
    if (from == 'move') {
      this.user_info.move_location_dict.latitude = position.coords.lat;
      this.user_info.move_location_dict.longitude = position.coords.lng;
      this.getGeoLocation(this.user_info.move_location_dict.latitude, this.user_info.move_location_dict.longitude, from)
    }
    else {
      this.user_info.commute_location_dict.latitude = position.coords.lat;
      this.user_info.commute_location_dict.longitude = position.coords.lng;
      this.getGeoLocation(this.user_info.commute_location_dict.latitude, this.user_info.commute_location_dict.longitude, from)
    }
  }


  getGeoLocation(lat, lng, from) {
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      let latlng = new google.maps.LatLng(lat, lng);
      let request = { "latLng": latlng };
      this.request = new GeocoderRequests();
      this.request.location = new google.maps.LatLng(lat, lng);
      geocoder.geocode(this.request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            var street = rsltAdrComponent[resultLength - (resultLength - 1)].short_name;
            var formatted_address = rsltAdrComponent[resultLength - (resultLength - 1)].short_name
              + "," + rsltAdrComponent[resultLength - (resultLength - 2)].short_name
              + "," + rsltAdrComponent[resultLength - (resultLength - 3)].short_name
              + "," + rsltAdrComponent[resultLength - (resultLength - 4)].short_name

            //    this.user_info.formatted_address
            if (from == 'move') {
              this.user_info.move_location_dict.formatted_address = formatted_address;
              this.user_info.move_location_dict.street = street;
              // this.getGeoLocation(  this.user_info.move_location_dict.latitude,  this.user_info.move_location_dict.longitude,from)
            }
            else {
              this.user_info.commute_location_dict.formatted_address = formatted_address;
              this.user_info.commute_location_dict.street = street;
              //  this.getGeoLocation(  this.user_info.commute_location_dict.latitude,  this.user_info.commute_location_dict.longitude,from)
            }



          } else {
            alert("No address available!");
          }
        }
      });

    }
  }

}

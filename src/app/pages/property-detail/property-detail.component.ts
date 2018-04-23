import { Component, OnInit } from '@angular/core';
import { PropertyDetailService } from './property-detail.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import 'hammerjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public isApartmentView: boolean = false;
  public propertyDetail: any;
  public propertyId: string = "";
  public unit_limit = 3;
  public selected_model: any;
  public latitude = 40.755604
  public longitude = -73.984932;
  public street = 'USA'
  public lastUpdated = '';
  public floorPlanPath = [];
  public nearByCitiesList: any[] = [];
  public propertyFeatureList: any[] = [];
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[] = [];
  constructor(public service: PropertyDetailService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    window.scroll(0, 0);
    //===================get param from url=============
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if ((params['propertyId'] != undefined)) {
        this.propertyId = params['propertyId'];
      }
    });
    this.getPropertyDetail();
    this.loadGallery();
  }
  //================get the property detail============
  getPropertyDetail() {
    var unitModel: any = {};
    var dataminmax :any={};
    var postBody: any = { "action": "get", "property_id": this.propertyId };
    this.service.getPropertyList(postBody).subscribe(detail => {
      if ( detail.data.properties != undefined) {
        this.propertyDetail =
        detail.data.properties.filter(detail => (detail.property_id == this.propertyId))[0];
        //============get near by cities==============
        if (this.propertyDetail.nearby_cities_dict != undefined && this.propertyDetail.nearby_cities_dict.geonames != undefined) {
          this.nearByCitiesList = this.propertyDetail.nearby_cities_dict.geonames;
        } else if (this.propertyDetail.nearby_cities_dict != undefined && this.propertyDetail.nearby_cities_dict.geonames == undefined) {
          this.nearByCitiesList = this.propertyDetail.nearby_cities_dict;
        }
        //===============get property feature list==============
        if (this.propertyDetail.unit_features != undefined) {
          this.propertyDetail.unit_features.forEach(detail => {
            var tempDetail = { "name": detail.name, "imageUrl": "" };
            this.propertyFeatureList.push(tempDetail);
          });
        }

        //============load image into gallry===============
        if (this.propertyDetail.property_files != undefined) {
          this.propertyDetail.property_files.forEach(detail => {
            var tempGallery = {
              small: detail.file_url,
              medium: detail.file_url,
              big: detail.file_url
            };
            this.galleryImages.push(tempGallery);
          })
        }
        //unti Spit up 
        this.propertyDetail.unit_split_up = [];
        if (this.propertyDetail.units != undefined && this.propertyDetail.units.length > 0) {
          _.uniq(_.map(this.propertyDetail.units, 'bedrooms')).forEach(betroom => {
            unitModel.min = 0;
            unitModel.max = 0;
             dataminmax = this.propertyDetail.units.filter(unit => unit.bedrooms == betroom);
            if (dataminmax.length > 1) {
              unitModel.min = _.min(_.map(dataminmax, 'market_rent'))
              unitModel.max = _.max(_.map(dataminmax, 'market_rent'))
            }
            else if (dataminmax.length == 1) {
              unitModel.min = 0;
              unitModel.max = dataminmax[0].market_rent;
            }
            if (dataminmax != undefined && dataminmax.length > 0) {
              if (betroom != 0) {
                unitModel.Header = "All " + betroom + " bedrooms"
                unitModel.bedrooms = betroom + 'b';
              }
              else {
                unitModel.Header = "All Studios"
                unitModel.bedrooms = 'S';
              }
              unitModel.Limit = 3;
              unitModel.Data = dataminmax;
              this.propertyDetail.unit_split_up.push(unitModel);
            }
          })
        }


        // <===============PropertyLocation===============>
        if (this.propertyDetail.address_dict.location_coords != undefined
          && this.propertyDetail.address_dict.location_coords.length > 0) {
          this.latitude = this.propertyDetail.address_dict.location_coords[1];
          this.longitude = this.propertyDetail.address_dict.location_coords[0];
          this.street = this.propertyDetail.address_dict.street;
        }
        // <===============to get time  Diff===========>
        this.calculateDate(this.propertyDetail.timestamp)
      }
    });
  }


  goToDivHolder(id) {
    //=============menu active========
    $('ul.nav-pills li a').removeClass('active');
    var scrollPos = $("#" + id).offset().top;
    $(window).scrollTop(scrollPos);
  }

  //=================load gallery===================
  loadGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }, { "thumbnails": false },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];



  }
  //=====================load unit detail================
  showUnitDetail(unit) {
    this.selected_model = unit;
    this.isApartmentView = !this.isApartmentView;
  }
  //==================show floor plan=================
  showFloorPlan(unitmodel) {
    var floorDetail = [];
    var unitDetail = [];
    var totaldata=[];
    if (this.propertyDetail.floorplan_files != undefined) {
      floorDetail = this.propertyDetail.floorplan_files.filter(data => (data.fp_id == unitmodel.floor_plan_id));
    }
    if (this.propertyDetail.unit_files != undefined) {
      unitDetail = this.propertyDetail.unit_files.filter(data => (data.unit_id == unitmodel.unit_id));
    }
    floorDetail = floorDetail != undefined ? floorDetail : [];
    unitDetail = unitDetail != undefined ? unitDetail : [];
    totaldata = _.concat(floorDetail, unitDetail);
    if (totaldata.length > 0) {
      totaldata.forEach(detail => {
     
        this.floorPlanPath.push( {
          small: detail.file_url,
          medium: detail.file_url,
          big: detail.file_url
        });
      })
      $('#floorPlane_').toggle();
    }
  }
  ///======================redirect add property page================
  updatePropertyDetail() {
    location.href = "#/pages/addPropertyDetail?action=update&propertyId=" + this.propertyId;
  }
  //=================add new unit detail=====================
  addNewUnit() {
    location.href = "#/pages/addPropertyDetail?action=add&addType=unit&propertyId=" + this.propertyId;
  }
  //================edit the unit detail==============
  editUnitDetail(unitId) {
    location.href = "#/pages/addPropertyDetail?action=update&addType=unit&propertyId=" + this.propertyId + "&unitId=" + unitId;
  }

  //expand unit
  expandUnit(unit) {
    unit.Limit = unit.Data.length;
  }

  HeadermenuChange(from) {
    location.href = "/#/pages/" + from;
  }

  public validateEmpty(value) {
    if (!(value == null || value == undefined || value == "" || value == 0)) {
      return true;
    }
    else {
      return false;
    }

  }

  avaliabitycheck(date) {
    if (this.validateEmpty(date)) {
      var datePipe = new DatePipe("en-US");
      return 'Avaliable ' + datePipe.transform(date, 'MMM dd');
    }
    else {
      return '';
    }
  }

  
  calculateDate(date) {
    var diffc = new Date().getTime() - new Date(this.propertyDetail.timestamp * 1000).getTime();
    var days = Math.round(Math.abs(diffc / (1000 * 60 * 60 * 24)));
    var hoursDiff = Math.floor(diffc / (3600 * 1000))
    if (days > 0) {
      this.lastUpdated = days + ' days ago';
    }
    else {
      this.lastUpdated = hoursDiff + ' hours ago';
    }
  }

  AddtoCartClick(from)
  {
    if(localStorage.getItem("Token")==undefined)
    {
      location.href = "/#/pages/login";
    }
  }
}

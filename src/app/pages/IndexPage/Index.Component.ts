import { Component, OnInit } from '@angular/core';
import { IndexService } from './Index.service';
import { IndexModel } from './Index.model';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'IndexComponent',
  templateUrl: './Index.compnent.html',
  //styleUrls: ['./apartment-list.component.css']
})
export class IndexComponent implements OnInit {

  public propertyListInformation: any[] = [];

  public sortByDropdownValue: any;
  public listingTypeValue: any;
  public tenureDropdownValue: any;
  public bedroomsValue: any;
  public favoriteSearchValue: any;
  public favoriteCategoryValue: any;
  public favoriteUserValue: any;
  public priceVal: any;
  public areaVal: any;
  public commisionVal: any;
  public count: number;
  public propertyTypeValue: any[] = [];
  public locationLevelValue: any[] = [];

  public sortByDropdown: any[];
  public favoriteCategoryDropdown: any[] = [];
  public favoriteUserDropdown: any[] = [];
  public listingTypeDropdown: any[] = [];
  public tenureDropdown: any[] = [];
  public bedroomsDropdown: any[] = [];
  public favoriteSearchDropdown: any[] = [];
  public favoriteCategory: any[] = [];
  public propertyTypeDropdown: any[] = [];
  public locationLevelDropdown: any[] = [];
  public getRentFromList: any[] = [];
  public getRoomTypeList: any[] = [];
  public priceRange: number[];
  public isAddProperty: boolean = false;
  public propertyId: string = "";
  constructor(public service: IndexService,
     public activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    
    this.loadGallery();
    var tempGallery = {
      small: "assets/img/1.jpg",
      medium: "assets/img/1.jpg",
      big: "assets/img/1.jpg"
    };
    this.galleryImages.push(tempGallery);
    var tempGallery = {
      small: "assets/img/4.jpg",
      medium: "assets/img/4.jpg",
      big: "assets/img/4.jpg"
    };
    this.galleryImages.push(tempGallery);
    var tempGallery = {
      small: "assets/img/3.jpg",
      medium: "assets/img/3.jpg",
      big: "assets/img/3.jpg"
    };
    this.galleryImages.push(tempGallery);
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if ((params['propertyId'] != undefined)) {
        this.propertyId = params['propertyId'];
      }

    });
  }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  public studio: string;
  public bedroom1: string;
  public bedroom2: string;
  public name: any[];
  public valueProp: any[];
  public price: any[];
  public Min: any[];
  public unitList: any[] = [];

 
  
  //================load initial resource==================
  public iconDropdown: any[] = [];
  public apartmentTypeDropdown: any[] = [];
  public propertyHighlightsDropdown: any[] = [];
  public unitHighlightsDropdown: any[] = [];
 
 
  loadGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }, { "thumbnails": false },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  HeadermenuChange(from) {
    location.href = "/#/pages/" + from;
  }
}

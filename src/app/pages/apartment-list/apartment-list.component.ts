import { Component, OnInit } from '@angular/core';
import { ApartmentService } from './apartment-list.service';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PropertyListModel, TempDDL } from './apartment-listModel';
@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {

  public temp = new TempDDL();
  public propertyListInformation: any[] = [];
  public propertyListModel: PropertyListModel = new PropertyListModel();
  public count: number;
  public bedRoomDropdown: any[] = [];
  public rentListDropdown: any[] = [];
  public citiesListDropdown: any[] = [];
  public managementCompanyListDropdown: any[] = [];
  public isAddProperty: boolean = false;
  public propertyId: string = "";
  public LastId = '';
  public studio: string;
  public bedroom1: string;
  public bedroom2: string;
  public name: any[];
  public valueProp: any[];
  public price: any[];
  public Min: any[];
  public unitList: any[] = [];
  public galleryImages: any = [];
  public uploadedFiles: any[] = [];
  constructor(public service: ApartmentService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  
    var postBody: any = { "action": "get", "page_size": 10 };
    window.addEventListener('scroll', this.scroll, true); 
    this.propertyListInformation = [];
    this.getPropertyList(postBody);
    this.loadInitialResource();
  }

  public LoadDropdowns() {
    this.bedRoomDropdown = this.service.getBedRoomDropdownDetails();
    this.rentListDropdown = this.service.getRentListDropdownDetails();
    var postBody = '{"state_only": false}';
    var mpostBody = '{"action":"get"}'
    this.service.getcitiesDropdownDetails(postBody).subscribe(detail => {
      if (detail.response != null && detail.response != undefined) {
        detail.response.forEach(x => {
          if (x._id.city != "") {
            this.citiesListDropdown.push({'value':x._id.city + "|" + x._id.state,'label': x._id.city});
          }
        
        });
      }
    });
    this.service.getmanagementCompanyDropdownDetails(mpostBody).subscribe(detail => {
      if (detail.data != null && detail.data != undefined) {
        detail.data.management_companies.forEach(x => {
          if (x.management_id != "") {
            this.managementCompanyListDropdown.push({'value':x.management_id,'label':x.name});
          }
        });
      }
    });

  }

  public getProperties() {
    var state = this.propertyListModel.city.split("|");
    var rentdetails = this.propertyListModel.rent_from.toString().split("-");
    if (state != [] && state != undefined) {
      this.propertyListModel.city = state[0].toString();
      this.propertyListModel.state = state[1].toString();
    }
    if (rentdetails != [] && rentdetails != undefined) {
      this.propertyListModel.rent_from = Number(rentdetails[0].toString());
      this.propertyListModel.rent_to = Number(rentdetails[1].toString());
    }
    this.service.getPropertySearchList(this.propertyListModel).subscribe(detail => {
      if (detail.response != null && detail.response != undefined) {
        this.LastId = detail.response.last_id;
        this.bindProperties(detail.response);
      }
    });
   
  }
  public bindProperties(data) {
    var unitList: any[] = [];
    var checkExist=[];
    data["properties"].forEach(x => {
      this.propertyListInformation.push(x);
    })
    
    this.count = this.propertyListInformation.length;
    ///============only for get unit name=============
    this.name = this.name != undefined ? this.name : [];
    this.propertyListInformation.forEach((detail, index) => {
      this.name = [];
      this.valueProp = [];
      detail.units.forEach(data => {
        checkExist=[];
         checkExist = this.name.filter(x => x.value == data.bedrooms);
        if (checkExist.length == 0) {
          if (data.bedrooms == 0) {
            this.name.push({ "name": "STUDIO", "value": data.bedrooms });
          } else if (data.bedrooms != 0) {
            this.name.push({ "name": data.bedrooms + " BEDROOM", "value": data.bedrooms });
          }
        }
        //===========get value==============
        this.valueProp = this.valueProp != undefined ? this.valueProp : [];
        this.valueProp.push({ "value": data.market_rent, "code": data.bedrooms });
      });
      this.unitList[index] = { "unitName": this.name, "priceList": this.valueProp };
    });

    //============load image into gallry===============
    if (data.property_files != undefined) {
      data.property_files.forEach(detail => {
        this.galleryImages.push({
          small: detail.file_url,
          medium: detail.file_url,
          big: detail.file_url
        });
      })
    }
    if (this.valueProp[this.valueProp.length - 1] != undefined &&
      this.valueProp[this.valueProp.length - 1].value != undefined) {
      this.Min = this.valueProp[this.valueProp.length - 1].value;
      this.price = this.Min;
      for (var i = 0; i < this.valueProp.length; i++) {
        if (this.valueProp[i].value <= this.Min) {
          this.price = this.valueProp[i].value;
          this.Min = this.valueProp[i].value;
        }
      }
    }
  }
  scroll = (): void => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      var postBody: any = { "action": "get", "last_id": this.LastId, "page_size": 10 };
      this.getPropertyList(postBody);
    }
  };
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }

  //==================get property list=================
  getPropertyList(postBody) {
    var unitList: any[] = [];
    var checkExist =[];
    this.service.getPropertyList(postBody).subscribe(detail => {
      if (detail.data != null && detail.data != undefined) {
        this.LastId = detail.data.last_id;
        detail.data["properties"].forEach(x => {
          this.propertyListInformation.push(x);
        })
        this.count = this.propertyListInformation.length;
        ///============only for get unit name=============
        this.name = this.name != undefined ? this.name : [];
        this.propertyListInformation.forEach((deatil, index) => {
          this.name = [];
          this.valueProp = [];
          deatil.units.forEach(data => {
            checkExist=[];
             checkExist = this.name.filter(x => x.value == data.bedrooms);
            if (checkExist.length == 0) {
              if (data.bedrooms == 0) {         
                this.name.push({ "name": "STUDIO", "value": data.bedrooms });
              } else if (data.bedrooms != 0) {
                this.name.push({ "name": data.bedrooms + " BEDROOM", "value": data.bedrooms });
              }
            }
            //===========get value==============
            this.valueProp = this.valueProp != undefined ? this.valueProp : [];
            this.valueProp.push({ "value": data.market_rent, "code": data.bedrooms });
          });
          this.unitList[index] = { "unitName": this.name, "priceList": this.valueProp };
        });

        //============load image into gallry===============
        if ( detail.data.property_files != undefined) {
          detail.data.property_files.forEach(detail => {
            this.galleryImages.push({
              small: detail.file_url,
              medium: detail.file_url,
              big: detail.file_url
            });
          })
        }
        if (this.valueProp[this.valueProp.length - 1] != undefined &&
          this.valueProp[this.valueProp.length - 1].value != undefined) {
          this.Min = this.valueProp[this.valueProp.length - 1].value;
          this.price = this.Min;
          for (var i = 0; i < this.valueProp.length; i++) {
            if (this.valueProp[i].value <= this.Min) {
              this.price = this.valueProp[i].value;
              this.Min = this.valueProp[i].value;
            }
          }
        }
      }
    });
  }

  //================load initial resource==================

  loadInitialResource() {
    this.LoadDropdowns();
  }
  //==============view property details===============
  viewPropertyDetail(id) {
    location.href = "/#/pages/propertyDetail?propertyId=" + id;
  }
  //================add new property================

  addNewProperty() {
    location.href = "/#/pages/addPropertyDetail?action=add";
  }
 

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  HeadermenuChange(from) {
    location.href = "/#/pages/" + from;
  }
}

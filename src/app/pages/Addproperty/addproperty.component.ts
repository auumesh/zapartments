import { Component, OnInit } from '@angular/core';
import { AddPropertyService } from './addproperty.service';
import {
  PropertyModel, FloorPlan, EmailList, UnitSavedModel, RentPricingList,
  PhoneList, CommonVariable, RoomTypesList, saveModel, AddressList,
  IconHighlightsList, system_creds_list, DepositDict, Policy_dist, services_list, parking_policy_dict
} from './addPropertyModel';
import { PagesComponent } from '../pages.component';
import { HttpService } from '../../service';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';
import * as _ from 'lodash';
@Component({
  selector: 'Addproperty',
  templateUrl: './addproperty.component.html',
  styleUrls: ['./addproperty.component.css']
})
export class AddpropertyComponent implements OnInit {
  public isAddProperty: boolean = false;
  public iconDropdown: any[] = [];
  public apartmentTypeDropdown: any[] = [];
  public kindTypeDropdown: any[] = [];
  public roomTypeDropdown: any[] = [];
  public amountTypeDropdown: any[] = [];
  public depositTypeDropdown: any[] = [];
  public prorateTypeDropdown: any[] = [];
  public lateTypeDropdown: any[] = [];
  public uploadedFiles: any[] = [];
  public propertyModel: PropertyModel = new PropertyModel();
  public totalFloorPlanModel: FloorPlan[] = new Array<FloorPlan>();
  public floorPlanModel: FloorPlan;
  public property_highlights_list: string = "";
  public unit_highlights_list: string = "";
  public addressInfo: string = "";
  public featureDropdown: any[] = [];
  public featureIdList: any = [];
  public unitfeatureIdList: any = [];
  public datePipe = new DatePipe("en-US");
  public systemCredits = new system_creds_list();
  public propertyDetails = [];
  public U_propertyindex = 0;
  public U_unitindex = 0;
  public U_phoneindex = 0;
  public U_emailindex = 0;
  public U_rentPriceindex = 0;
  public U_roomTypeindex = 0;
  public U_floorplanindex = 0;
  public accorditionToggle = false;
  public SubmitbtnClicked = false;
  public floorPlanSubmit = false;
  public roomtypeClicked = false;
  public floorPlanImage = [];
  public PropertyImage = [];
  public propertyType = [];
  public petEdit = 0;
  public petsEdit = 0;
  public petTypeEdit = 0;
  public petParkingTypeEdit = 0;
  public petDistanceEdit = 0;
  public Servicedist = 0;
  public serviceList = [];
  public PolicyDist = new Policy_dist()
  public parkingpolicydict = new parking_policy_dict()
  public ServiceList = new services_list()
  public floorPlanCount: string = "";
  public floorPlanRoomType: any = 0;
  public floorPlanComment: string = "";
  public commonVariable: CommonVariable;
  public propertyAction: string = "";
  public propertyId: string = "";
  public floorPlanId: string = "";
  public unitId: string = "";
  public addType: string = "";
  public formData: FormData = new FormData();
  public floorPlanUploadedFiles: any[] = [];
  public floorPlanUploadedFilesdata: any[] = [];
  public unitUploadedFiles: any[] = [];
  public unitUploadedFilesdata: any[] = [];
  public totalFloorPlanUploadedFiles: any[] = [];
  public updateFileDetails: any[] = [];
  public updatePropertyInfo: any;
  public floorPlanGridDetail: any[] = [];
  public floorPlanDropdown: any[] = [];
  public unitSavedModel: UnitSavedModel = new UnitSavedModel();
  public propertyDetailForUnit: any;
  public preDefinedUnitDetail: any;
  public isChooseFloorPlane: boolean = false;
  constructor(public service: AddPropertyService, public commonService: PagesComponent,
    public http: HttpService, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    window.scroll(0, 0);
    this.toggleAccordion();
    this.loadInitialResource();

  }


  //================load initial resource==================
  public loadInitialResource() {
    this.iconDropdown = this.service.getIconListDropdownDetails();
    this.apartmentTypeDropdown = this.service.getApartmentTypeDropdownDetails();
    this.kindTypeDropdown = this.service.getKindTypeDropdownDetails();
    this.roomTypeDropdown = this.service.getRoomTypeDropdownDetails();
    this.amountTypeDropdown = this.service.getAmountTypeDropdownDetails();
    this.depositTypeDropdown = this.service.getDepositTypeDropdownDetails();
    this.prorateTypeDropdown = this.service.getProrateTypeDropdownDetails();
    this.lateTypeDropdown = this.service.getLateTypeDropdownDetails();
    this.propertyType = this.service.getpropertyType();
    this.serviceList = this.service.getServiceType();
    this.getFeatureDropdownDetail();
    this.commonVariable = new CommonVariable();
    this.floorPlanModel = new FloorPlan();
    //===================get param from url=============
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.propertyAction = (params['action'] != undefined) ? params['action'] : 'add';
      this.propertyId = (params['propertyId'] != undefined) ? params['propertyId'] : '';
      this.floorPlanId = (params['floorPlanId'] != undefined) ? params['floorPlanId'] : '';
      this.unitId = (params['unitId'] != undefined) ? params['unitId'] : '';
      this.addType = (params['addType'] != undefined) ? params['addType'] : 'property';
      //==================get property detail from service================
      if (this.propertyId != '' && this.propertyAction == 'update'
        && this.addType == 'property') {
        this.getPropertyDetail(this.propertyId);
      } else if (this.propertyId != '' && this.addType == 'unit') {
        this.getPropertyDetailForAddUnit(this.propertyId);
      }
    });
  }

  //================get feature dropdown detail==========
  public getFeatureDropdownDetail() {
    this.service.getFeatureDropdownDetails().subscribe(detail => {
      this.propertyDetails = detail.data.features.filter(x => x.feature_of == 1)
      var unit = detail.data.features.filter(x => x.feature_of == 2)
      this.propertyDetails.forEach(data => {
        this.featureIdList.push({ "label": data.name, "value": data.feature_id });
      });
      unit.forEach(data => {
        this.unitfeatureIdList.push({ "label": data.name, "value": data.feature_id });
      });

    });

  }
  //================add new property================
  public addNewPropertyDetail() {
    this.SubmitbtnClicked = true;
    var tempModel: saveModel = new saveModel();
    var services_list = [];
    var policydist = [];
    var detail: any = {};
    var tempFloorModel: any = {};
    var validate = true;

    //  ===================== Add property and floor plan detail =============
    if (this.addType == 'property') {
      //=================set address=============
      this.propertyModel.address_list.push({ 'type': 'location', 'address': this.addressInfo });
      //==================save part=================
      tempModel.action = "add";
      policydist = _.cloneDeep(this.propertyModel.policy_dict);
      this.propertyModel.policy_dict = [];
      policydist.forEach(x => {
        detail = {};
        if (x.policyType == "Pets") {
          detail['Pets'] = {};
          detail['Pets'].pet_types = x.pet_types;
          detail['Pets'].restriction = x.restriction;
          detail['Pets'].deposit = x.deposit;
          detail['Pets'].fee = x.fee;
          detail['Pets'].pet_care = x.pet_care;
          detail['Pets'].allowed = x.pet_types.length > 0 ? true : false;

        }
        else if (x.policyType == "Others") {
          detail['Others'] = {};
          detail['Others'].Description = x.Description;
        }
        this.propertyModel.policy_dict.push(detail)
      })

      services_list = _.cloneDeep(this.propertyModel.services_list);
      this.propertyModel.services_list = [];
      services_list.forEach(x => {
        detail = {};
        detail[x.ServiceType] = {};
        detail[x.ServiceType].distance_to = x.distance_to;
        detail[x.ServiceType].Comment = x.Comment;
        this.propertyModel.services_list.push(detail)
      })
      this.commonService.deepTrim(this.propertyModel)
      tempModel.payload = this.propertyModel;
      validate = this.commonService.validateURL(this.systemCredits.url, validate);
      validate = this.commonService.validateURL(this.propertyModel.web_site, validate);
      validate = this.commonService.validateEmpty(this.propertyModel.name, validate);
      validate = this.commonService.validateEmpty(this.propertyModel.feature_ids_list.length, validate);
      validate = this.commonService.validateEmpty(this.addressInfo, validate);
      if (validate) {
        this.service.addNewPropertyDetail(tempModel).subscribe(response => {
          this.SubmitbtnClicked = false;
          if (response.result) {
            this.commonFileUploader(response.data.property_id, '', '', 'property');
            this.totalFloorPlanModel.forEach((floorPlan, index) => {
              this.commonService.deepTrim(floorPlan)
              if (floorPlan.name != "" && floorPlan.edited != undefined) {
                floorPlan.property_id = response.data.property_id;

                if (floorPlan.floor_plan_id != undefined) {
                  tempFloorModel.action = "update";
                  tempFloorModel.floor_plan_id = floorPlan.floor_plan_id;
                }
                else {
                  tempFloorModel.action = "add";
                }
                tempFloorModel.payload = floorPlan;
                this.service.addNewFloorPlanDetail(tempFloorModel).subscribe(response => {
                  if (response.result == 1) {
                    this.commonFileUploader(floorPlan.property_id, response.data.floor_plan_id, index, 'floorPlan')
                    if (this.propertyAction == 'add') {
                      this.commonService.addToast(true, "Record add successfully");
                    }
                    else {
                      this.commonService.addToast(true, "Record update successfully");
                    }

                  } else {
                    this.commonService.addToast(false, response.error.message);
                  }
                });
              }
            });
          }
          this.backButtonAction();
        });
      }
      else {
        this.commonService.addToast(false, "Enter Property Data.");
      }
    }
    else {
      this.saveNewUnitDetail();
    }
  }

  //================load image into model===============
  public fileLoadIntoModel(event, type) {
    for (let file of event.files) {
      if (type == 'property') {
        this.uploadedFiles.push(file);
      } else if (type == 'floorPlan') {
        this.floorPlanUploadedFiles.push(file);
      }
      else if (type == 'unitplan') {
        this.unitUploadedFiles.push(file);
      }
    }
  }


  //================upload images to service=================
  public commonFileUploader(propId, floorPlanId, floorIndex, type) {
    var imageHolder: any[] = [];
    if (type == 'property') {
      imageHolder = this.uploadedFiles;
    } else if (type == 'floorPlan') {
      imageHolder = this.totalFloorPlanUploadedFiles.filter(x => x.index == floorIndex) != undefined ? this.totalFloorPlanUploadedFiles.filter(x => x.index == floorIndex) : [];
    }
    else if (type == 'unitimage') {
      imageHolder = this.unitUploadedFiles;
    }
    if (imageHolder != undefined && imageHolder.length > 0) {
      imageHolder.forEach(image => {
        this.formData = new FormData();
        if (type == 'floorPlan') {
          this.formData.append('storefile_fp_id', floorPlanId);
        }
        else if (type == 'unitimage') {
          this.formData.append('storefile_unit_id', floorPlanId);
        }
        this.formData.append('storefile', image);
        this.formData.append('storefile_file_purpose', "store_file");
        this.formData.append('storefile_description', "Front View");
        this.formData.append('storefile_property_id', propId);
        this.service.uploadFileToActivity(this.formData).subscribe(data => {
        });
      });

    }
  }

  //===============add new property high lights===============
  public addPropertyHighLightsDetail() {
    if (this.commonService.validateEmpty(this.property_highlights_list, true)) {
      if (this.U_propertyindex != 0) {
        var index = this.U_propertyindex < 0 ? 0 : this.U_propertyindex;
        this.propertyModel.property_highlights_list[index] = this.property_highlights_list
        this.property_highlights_list = "";
        this.U_propertyindex = 0;
      }
      else {
        this.propertyModel.property_highlights_list.push(this.property_highlights_list);
        this.property_highlights_list = "";
      }
    }
    else {
      this.commonService.addToast(false, "Enter Property Highlights.");
    }
  }

  //===================add new unit property high lights===============
  public addUnitHighLightsDetail() {
    if (this.commonService.validateEmpty(this.unit_highlights_list, true)) {
      if (this.U_unitindex != 0) {
        var index = this.U_unitindex < 0 ? 0 : this.U_unitindex;
        this.propertyModel.unit_highlights_list[index] = this.unit_highlights_list
        this.unit_highlights_list = "";
        this.U_unitindex = 0;
      }
      else {
        this.propertyModel.unit_highlights_list.push(this.unit_highlights_list);
        this.unit_highlights_list = "";
      }
    }
    else {
      this.commonService.addToast(false, "Enter Unit Highlights.");
    }
  }


  //======================== remove the icon detail===============
  public removeHighLights(index, type) {
    if (type == 'property') {
      this.propertyModel.property_highlights_list.splice(index, 1);
    } else if (type == 'unit') {
      this.propertyModel.unit_highlights_list.splice(index, 1);
    } else if (type == 'phone') {
      this.propertyModel.phone_list.splice(index, 1);
    } else if (type == 'email') {
      this.propertyModel.email_list.splice(index, 1);
    } else if (type == 'rentPrice') {
      this.unitSavedModel.rent_pricing_list.splice(index, 1);
    }
    else if (type == 'roomType') {
      this.floorPlanModel.room_types_list.splice(index, 1);
    }
    else if (type == 'pet') {

      this.PolicyDist.pet_types.splice(index, 1);
    }
    else if (type == 'pets') {

      this.propertyModel.policy_dict.splice(index, 1);
    }
    else if (type == 'Types') {
      this.propertyModel.parking_policy_dict.types.splice(index, 1);
    }
    else if (type == 'ParkingType') {
      this.propertyModel.parking_policy_dict.parking_type.splice(index, 1);
    }
    else if (type == 'services_list') {
      this.propertyModel.services_list.splice(index, 1);
    }

    else {
      this.propertyModel.icon_highlights_list.splice(index, 1);
    }
  }

  //====================set feature list=================
  public setFeatureList() {
    this.propertyModel.feature_ids_list = [];
    this.propertyModel.feature_ids_list.push(this.featureIdList);
  }


  public addRoomTypeList() {
    this.roomtypeClicked = true;
    if (this.commonService.validateEmpty(this.floorPlanCount, true) && this.commonService.validateEmpty(this.floorPlanRoomType, true)) {
      var tempRoomType: RoomTypesList = new RoomTypesList();
      tempRoomType.count = this.floorPlanCount;
      tempRoomType.room_type = this.floorPlanRoomType;
      tempRoomType.comment = this.floorPlanComment;
      if (this.U_roomTypeindex != 0) {
        var index = this.U_roomTypeindex < 0 ? 0 : this.U_roomTypeindex;
        this.floorPlanModel.room_types_list[index] = tempRoomType
        this.roomtypeClicked = false;
        this.U_roomTypeindex = 0;
      }
      else {
        this.floorPlanModel.room_types_list.push(tempRoomType);
        this.roomtypeClicked = false;
      }
      this.floorPlanCount = "";
      this.floorPlanComment = "";
      this.floorPlanRoomType = '';
    }


  }

  //=======================add common into model==============
  public addDataIntoModel(type) {
    var rentPricingDetail: RentPricingList = new RentPricingList();
    var index = 0;
    if (type == 'email') {
      if (this.commonService.validateEmails(this.commonVariable.email)) {
        if (this.U_emailindex != 0) {
          index = this.U_emailindex < 0 ? 0 : this.U_emailindex;
          this.propertyModel.email_list[index] = { 'type': this.commonVariable.emailType, 'email': this.commonVariable.email };
          this.U_emailindex = 0;
        }
        else {
          this.propertyModel.email_list.push({ 'type': this.commonVariable.emailType, 'email': this.commonVariable.email });
        }
        this.commonVariable.emailType = '';
        this.commonVariable.email = '';
      } else {
        if (!this.commonService.validateEmpty(this.commonVariable.email, true)) {
          this.commonService.addToast(false, "Enter Mail Id.");
        }
        else {
          this.commonService.addToast(false, "Invalid Email Id.");
        }


      }
    } else if (type == 'phone') {
      if (this.commonService.validateEmpty(this.commonVariable.phone, true)) {
        if (this.U_phoneindex != 0) {
          index = this.U_phoneindex < 0 ? 0 : this.U_phoneindex;
          this.propertyModel.phone_list[index] =
            { 'type': this.commonVariable.phoneType, 'phone': this.commonVariable.phone }
          this.U_phoneindex = 0;
        }
        else {
          this.propertyModel.phone_list.push({ 'type': this.commonVariable.phoneType, 'phone': this.commonVariable.phone });
        }
        this.commonVariable.phoneType = '';
        this.commonVariable.phone = '';
      }
      else {
        this.commonService.addToast(false, "Enter Phone Number.");
      }
    } else if (type == 'rentPricing') {
      this.floorPlanSubmit = true;
      rentPricingDetail.effective_rent = this.commonVariable.rentEffectivePrice;
      rentPricingDetail.term = this.commonVariable.rentEffectiveTerm;
      rentPricingDetail.date_range.start_date = this.datePipe.transform(this.commonVariable.rentEffectiveStartDate, 'yyyy-MM-ddTHH:MM:ss');
      rentPricingDetail.date_range.end_date = this.datePipe.transform(this.commonVariable.rentEffectiveEndDate, 'yyyy-MM-ddTHH:MM:ss');
      if (this.commonService.validateEmpty(this.commonVariable.rentEffectiveTerm, true)
        && this.commonService.validateEmpty(this.commonVariable.rentEffectiveTerm, true)
        && this.commonService.validateEmpty(this.commonVariable.rentEffectiveStartDate, true)
        && this.commonService.validateEmpty(this.commonVariable.rentEffectiveEndDate, true)
      ) {
        if (this.U_rentPriceindex != 0) {
          index = this.U_rentPriceindex < 0 ? 0 : this.U_rentPriceindex;
          this.unitSavedModel.rent_pricing_list[index] = rentPricingDetail
          this.U_rentPriceindex = 0;
        }
        else {
          this.unitSavedModel.rent_pricing_list.push(rentPricingDetail);
        }
        this.floorPlanSubmit = false;
        this.commonVariable = new CommonVariable;
      }
      else {
        this.commonService.addToast(false, "Enter Rent Pricing Details.");
      }

    }
  }
  //====================backk button action================
  public backButtonAction() {
    if (this.propertyAction == 'add' && this.addType == 'property') {
      location.href = "/#/pages/apartmentList";
    } else {
      location.href = '/#/pages/propertyDetail?propertyId=' + this.propertyId;
    }
  }

  //====================get property Detail drom service========
  public getPropertyDetail(propertyId) {
    var postBody: any = { "action": "get", "property_id": propertyId };
    var data: any = {};
    var details = '';
    this.service.getPropertyList(postBody).subscribe(data => {
      if (data.data.properties != undefined) {
        this.updatePropertyInfo = data.data.properties.filter(detail => (detail.property_id == this.propertyId))[0];
        //============load property detail into miodel==============  
        if (this.updatePropertyInfo != null && this.updatePropertyInfo != undefined) {
          this.propertyModel.name = this.updatePropertyInfo.name;
          this.propertyModel.description = this.updatePropertyInfo.description;
          this.propertyModel.web_site = this.updatePropertyInfo.web_site;
          this.propertyModel.property_highlights_list = this.updatePropertyInfo.property_highlights_list;
          this.propertyModel.unit_highlights_list = this.updatePropertyInfo.unit_highlights_list;
          this.propertyModel.icon_highlights_list = this.updatePropertyInfo.icon_highlights_list;
          this.propertyModel.address_list = this.updatePropertyInfo.address_list;
          this.propertyModel.phone_list = this.updatePropertyInfo.phone_list;
          this.propertyModel.email_list = this.updatePropertyInfo.email_list;
          this.propertyModel.lease_term = this.updatePropertyInfo.lease_term;
          this.propertyModel.income_requirement = this.updatePropertyInfo.income_requirement;
          this.propertyModel.parking_policy_dict = this.updatePropertyInfo.parking_policy_dict;
          this.propertyModel.pet_fee = this.updatePropertyInfo.pet_fee;
          this.propertyModel.num_pets_allowed = this.updatePropertyInfo.num_pets_allowed;
          this.propertyModel.feature_ids_list = [];
          this.propertyModel.feature_ids_list = _.map(this.updatePropertyInfo.prop_features, 'feature_id');
          this.addressInfo = this.updatePropertyInfo.address_dict.address;
          this.updateFileDetails = this.updatePropertyInfo.property_files;
          this.totalFloorPlanModel = this.updatePropertyInfo.floor_plans;
          this.totalFloorPlanUploadedFiles = this.updatePropertyInfo.floorplan_files;
          this.propertyModel.administrative_fee = this.updatePropertyInfo.administrative_fee;
          this.propertyModel.application_fee = this.updatePropertyInfo.application_fee;
          this.propertyModel.remodeling_fee = this.updatePropertyInfo.remodeling_fee;
          this.propertyModel.roommate_deposit = this.updatePropertyInfo.roommate_deposit;
          this.propertyModel.security_deposit = this.updatePropertyInfo.security_deposit;
          this.propertyModel.services_list = [];
          if (this.updatePropertyInfo.services_list != undefined && this.updatePropertyInfo.services_list.length > 0) {
            this.updatePropertyInfo.services_list.forEach(x => {
              details = this.transform(_.cloneDeep(x))[0];
              data.distance_to = x[details].distance_to;
              data.Comment = x[details].Comment;
              data.ServiceType = details;
              this.propertyModel.services_list.push(data)
            })
          }

          if (this.updatePropertyInfo.policy_dict != undefined && this.updatePropertyInfo.policy_dict.length > 0) {
            this.updatePropertyInfo.policy_dict.forEach(x => {
              details = this.transform(_.cloneDeep(x))[0];
              data = {};
              data = x[details];
              data.policyType = details;
              this.propertyModel.policy_dict.push(data)
            })
          }

          this.addressInfo
          this.floorPlanGridDetail = [];
          this.updatePropertyInfo.floor_plans.forEach(floorPlanModel => {
            this.floorPlanGridDetail.push({ "HighlightsName": floorPlanModel.name, "Description": floorPlanModel.description, "Rent": floorPlanModel.rent })
          })
        }
      }
    });
  }

  public transform(value): any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }

  //=================update property detail=============
  public updatePropertyDetail() {
    var tempModel: saveModel = new saveModel();
    var policydist = [];
    var detail: any = {};
    var services_list = [];
    var validate = true;
    var tempFloorModel: any = {};
    var isadd = false;
    this.SubmitbtnClicked = true;
    if (this.addType == 'property') {
      //=================set address=============
      this.propertyModel.address_list = [];
      this.propertyModel.address_list.push({ 'type': "location", 'address': this.addressInfo });
      //==================save part=================
      tempModel.action = "update";
      tempModel["property_id"] = this.updatePropertyInfo.property_id;
      policydist = _.cloneDeep(this.propertyModel.policy_dict);
      this.propertyModel.policy_dict = [];
      policydist.forEach(x => {
        detail = {};
        if (x.policyType == "Pets") {
          detail['Pets'] = {};
          detail['Pets'].pet_types = x.pet_types;
          detail['Pets'].restriction = x.restriction;
          detail['Pets'].deposit = x.deposit;
          detail['Pets'].fee = x.fee;
          detail['Pets'].pet_care = x.pet_care;
          detail['Pets'].allowed = x.pet_types.length > 0 ? true : false;
        }
        else if (x.policyType == "Others") {
          detail['Others'] = {};
          detail['Others'].Description = x.Description;
          detail['Others'].policyName = x.policyName;
        }
        this.propertyModel.policy_dict.push(detail)
      })

      services_list = _.cloneDeep(this.propertyModel.services_list);
      this.propertyModel.services_list = [];
      services_list.forEach(x => {
        detail = {};
        detail[x.ServiceType] = {};
        detail[x.ServiceType].distance_to = x.distance_to;
        detail[x.ServiceType].Comment = x.Comment;
        this.propertyModel.services_list.push(detail)
      })
      this.commonService.deepTrim(this.propertyModel)
      tempModel.payload = this.propertyModel;
      tempModel.payload.system_creds_list = this.systemCredits;
      validate = this.commonService.validateURL(this.systemCredits.url, validate);
      validate = this.commonService.validateURL(this.propertyModel.web_site, validate);
      validate = this.commonService.validateEmpty(this.propertyModel.name, validate);
      validate = this.commonService.validateEmpty(this.addressInfo, validate);

      if (validate) {
        this.service.addNewPropertyDetail(tempModel).subscribe(response => {
          this.SubmitbtnClicked = false;
          if (response.result == 1) {
            this.commonFileUploader(this.propertyId, '', '', 'property')

            this.totalFloorPlanModel.forEach((floorPlan, index) => {
              this.commonService.deepTrim(floorPlan)
              if (floorPlan.name != "") {
                floorPlan.property_id = response.data.property_id;
                tempFloorModel = {};
                isadd = false;
                if (floorPlan.floor_plan_id != undefined) {
                  tempFloorModel.action = "update";
                  tempFloorModel.floor_plan_id = floorPlan.floor_plan_id;
                  isadd = true;
                }
                else if (floorPlan.floor_plan_id == undefined) {
                  tempFloorModel.action = "add";
                  isadd = true;
                }
                floorPlan.deposit_list = [];
                floorPlan.deposit_list.push(floorPlan.deposit_dict)
                //  
                tempFloorModel.payload = floorPlan;
                if (isadd) {
                  this.service.addNewFloorPlanDetail(tempFloorModel).subscribe(response => {
                    if (response.result == 1) {
                      this.commonFileUploader(floorPlan.property_id, response.data.floor_plan_id, index, 'floorPlan')
                    } else {
                      this.commonService.addToast(false, response.error.message);
                    }
                  });
                }
                if (response.result == 1) {

                  if (this.propertyAction == 'add') {
                    this.commonService.addToast(true, "Record add successfully");
                  }
                  else {
                    this.commonService.addToast(true, "Record update successfully...");
                  }
                  //   this.backButtonAction();
                }
                else {
                  this.commonService.addToast(false, response.error.message);
                }
              }
            });

          } else {
            this.commonService.addToast(false, response.msg);
          }
          this.backButtonAction();
        });
      }
      else {
        this.commonService.addToast(false, "Enter Property Data..");
      }
    } else {
      this.saveNewUnitDetail();
    }


  }

  //==================add floor plans=============
  addFloorPlanIntoModel() {
    var index = 0;
    this.floorPlanSubmit = true;
    if (this.commonService.validateEmpty(this.floorPlanModel.name, true) &&
      this.commonService.validateEmpty(this.floorPlanModel.sqft_dict.max, true) &&
      this.commonService.validateEmpty(this.floorPlanModel.sqft_dict.min, true) &&
      this.commonService.validateEmpty(this.floorPlanModel.room_types_list.length, true)
    ) {
      //========load data into grid=========

      if (this.U_floorplanindex != 0) {
        index = this.U_floorplanindex < 0 ? 0 : this.U_floorplanindex;
        this.floorPlanGridDetail[index] = {
          "HighlightsName": this.floorPlanModel.name,
          "Description": this.floorPlanModel.description,
          "Rent": this.floorPlanModel.rent
        };
        this.floorPlanSubmit = false;
        //============load data into model for save floor plan===============
        this.totalFloorPlanModel[index] = this.floorPlanModel;
        this.floorPlanUploadedFiles.forEach(x => {
          x.index = index;
          this.totalFloorPlanUploadedFiles.push(x)
        })
        this.U_floorplanindex = 0;
      }
      else {
        this.floorPlanGridDetail.push({
          "HighlightsName": this.floorPlanModel.name,
          "Description": this.floorPlanModel.description,
          "Rent": this.floorPlanModel.rent
        });
        this.floorPlanSubmit = false;
        //============load data into model for save floor plan===============
        this.totalFloorPlanModel.push(this.floorPlanModel);

        this.floorPlanUploadedFiles.forEach(x => {
          x.index = this.floorPlanGridDetail.length - 1;
          this.totalFloorPlanUploadedFiles.push(x)
        })
      }

      this.floorPlanImage = [];
      this.floorPlanUploadedFilesdata = [];
      this.floorPlanUploadedFiles = [];
      this.floorPlanModel = new FloorPlan();
    }
    else {
      this.commonService.addToast(false, "Enter Floor Plan Details.");
    }
  }
  //==================edit the floor plan detail===============
  editTheFloorPlan(index) {
    this.U_floorplanindex = index == 0 ? -1 : index;
    this.floorPlanModel = this.totalFloorPlanModel[index];
    this.floorPlanModel.deposit_dict = this.floorPlanModel.deposit_list.length > 0 ? this.floorPlanModel.deposit_list[0] : new DepositDict();
    this.floorPlanModel.edited = true;
    if (this.floorPlanModel.floor_plan_id != undefined) {
      this.floorPlanUploadedFilesdata =
        this.totalFloorPlanUploadedFiles.filter(x => x.fp_id == this.floorPlanModel.floor_plan_id);

    }
    this.floorPlanImage = this.totalFloorPlanUploadedFiles.filter(x => x.index == index
      && x.fp_id == undefined)

  }


  RemveFloorPlan(data) {
    this.totalFloorPlanUploadedFiles.forEach((x, index) => {
      if (_.isMatch(x, data.files)) {
        this.totalFloorPlanUploadedFiles.splice(index, 1)
      }
    }
    )
    this.floorPlanUploadedFiles.forEach((x, index) => {
      if (_.isMatch(x, data.files)) {
        this.floorPlanUploadedFiles.splice(index, 1)
      }
    }
    )
  }
  Removeproperty(data) {
    this.uploadedFiles.forEach((x, index) => {
      if (_.isMatch(x, data.files)) {
        this.uploadedFiles.splice(index, 1)
      }
    }
    )
  }
  Removeunit(data) {
    this.unitUploadedFiles.forEach((x, index) => {
      if (_.isMatch(x, data.files)) {
        this.unitUploadedFiles.splice(index, 1)
      }
    }
    )
  }
  //=============remove the floor plan===========
  removeTheFloorPlan(index) {
    var tempFloorModel: any = {};
    tempFloorModel.action = "delete";
    tempFloorModel.floor_plan_id = this.totalFloorPlanModel[index].floor_plan_id;
    tempFloorModel.payload = this.totalFloorPlanModel[index];

    this.service.addNewFloorPlanDetail(tempFloorModel).subscribe(response => {
      if (response.result == 1) {
        this.commonService.addToast(true, 'Record Deleted Successfully.');
      } else {
        this.commonService.addToast(false, response.error.message);
      }
    });
  }

  //=====================get property detail for add unit==============
  getPropertyDetailForAddUnit(propertyId) {
    var postBody: any = { "action": "get", "property_id": propertyId };
    this.service.getPropertyList(postBody).subscribe(data => {
      if (data.data.properties != undefined) {
        this.propertyDetailForUnit = data.data.properties.filter(detail => (detail.property_id == this.propertyId))[0];
        if (this.propertyDetailForUnit.floor_plans.length > 0) {
          this.propertyDetailForUnit.floor_plans.forEach(floorPlan => {
            this.floorPlanDropdown.push({ 'label': floorPlan.name, 'value': floorPlan.floor_plan_id });
          })
        }
        //===================load unit detail for update==============
        if (this.propertyAction == 'update') {
          this.loadUnitDetailForUpdate();
        }
      }
    });
  }
  //================save unit detail=============
  saveNewUnitDetail() {
    var savedUnitModel: any;
    var tempModel: saveModel = new saveModel();
    //=========set prapare data=============
    if (this.commonService.validateEmpty(this.unitSavedModel.bedrooms, true) &&
      this.commonService.validateEmpty(this.unitSavedModel.bedrooms, true) &&
      this.commonService.validateEmpty(this.unitSavedModel.market_rent, true) &&
      this.commonService.validateEmpty(this.unitSavedModel.sqft_dict.min, true) &&
      this.commonService.validateEmpty(this.unitSavedModel.sqft_dict.max, true)
    ) {
      savedUnitModel = _.cloneDeep(this.unitSavedModel);
      savedUnitModel.property_id = this.propertyId;
      savedUnitModel.availability_dict.vacate_date = this.datePipe.transform(this.commonVariable.vacateDate, 'yyyy-MM-ddTHH:MM:ss');
      savedUnitModel.availability_dict.made_ready_date = this.datePipe.transform(this.commonVariable.madeReadyDate, 'yyyy-MM-ddTHH:MM:ss');
      tempModel.action = this.propertyAction;
      tempModel.payload = savedUnitModel;
      if (this.propertyAction == 'update') {
        this.comparation();
        tempModel["property_id"] = this.propertyId;
        tempModel["unit_id"] = this.unitId;
      }
      this.service.saveNewUnitDetail(tempModel).subscribe(response => {
        this.SubmitbtnClicked = false;
        if (response.result == 1) {
          this.commonFileUploader(this.propertyId, response.data.unit_id, '', 'unitimage')
          if (this.propertyAction == 'add') {
            this.commonService.addToast(true, "Record add successfully");
          }
          else {
            this.commonService.addToast(true, "Record update successfully...");
          }
        } else {
          this.commonService.addToast(false, response.error.message);
        }

      });

    }
    else {
      this.commonService.addToast(false, "Enter Unit Details.");
    }
  }
  //======================get floor plan detail for unit================

  getFloorPlanDetailForUnit() {
    var temFloorPlan: any = {};
    this.isChooseFloorPlane = true;
    //==========get floor plan name========
    if (this.floorPlanDropdown.length > 0) {
      this.unitSavedModel.floor_plan_name = this.floorPlanDropdown.filter(data => (this.unitSavedModel.floor_plan_id == data.value))[0].label;
      //====================get all floor plan detail=====================
      temFloorPlan = this.propertyDetailForUnit.floor_plans.filter(floorPlan => (this.unitSavedModel.floor_plan_id == floorPlan.floor_plan_id))[0];
      this.preDefinedUnitDetail = _.cloneDeep(temFloorPlan);
      this.unitSavedModel.deposit_dict = temFloorPlan.deposit_list.length > 0 ? temFloorPlan.deposit_list[0] : new DepositDict();
      this.unitSavedModel.fee_dict = temFloorPlan.fee_dict;
      this.unitSavedModel.sqft_dict = temFloorPlan.sqft_dict;
      this.unitSavedModel.effective_rent_dict = temFloorPlan.effective_rent_dict;
      this.unitSavedModel.market_rent = temFloorPlan.rent;

    }
  }
  //==============load unit detail for update==============
  loadUnitDetailForUpdate() {
    var unitDetail = this.propertyDetailForUnit.units.filter(unitDetail => (unitDetail.unit_id == this.unitId))[0];
    this.unitSavedModel.property_id = unitDetail.property_id;
    this.unitSavedModel.floor_plan_id = unitDetail.floor_plan_id;
    this.unitSavedModel.bedrooms = unitDetail.bedrooms;
    this.unitSavedModel.bathrooms = unitDetail.bathrooms;
    this.unitSavedModel.economic_status = unitDetail.economic_status;
    this.unitSavedModel.occupancy_status = unitDetail.occupancy_status;
    this.unitSavedModel.floor_plan_name = unitDetail.floor_plan_name;
    this.unitSavedModel.comment = unitDetail.comment;
    this.unitSavedModel.comments = unitDetail.comments;
    this.unitSavedModel.deposit_dict = unitDetail.deposit_list.length > 0 ? unitDetail.deposit_list[0] : new DepositDict();
    this.unitSavedModel.fee_dict = unitDetail.fee_dict;
    this.unitSavedModel.sqft_dict = unitDetail.sqft_dict;
    this.unitSavedModel.effective_rent_dict = unitDetail.effective_rent_dict;
    this.unitSavedModel.identification_dict = unitDetail.identification_dict;
    this.unitSavedModel.rent_pricing_list = unitDetail.rent_pricing_list;
    this.unitSavedModel.concession_dict = unitDetail.concession_dict;
    this.unitSavedModel.feature_ids_list = unitDetail.feature_ids_list;
    this.unitSavedModel.market_rent = unitDetail.market_rent;
    this.unitSavedModel.availability_dict = unitDetail.availability_dict;
    this.unitSavedModel.unit_type = unitDetail.unit_type;
    this.commonVariable.vacateDate = this.timestampConversion(unitDetail.availability_dict.vacate_date);
    this.commonVariable.madeReadyDate = this.timestampConversion(unitDetail.availability_dict.made_ready_date);
    this.unitUploadedFilesdata = this.propertyDetailForUnit.unit_files.filter(unitDetail => (unitDetail.unit_id == this.unitId));
  }

  //================delete upload files===================
  removeUploadedImage(fileId, index, type) {
    var deleteObj = { "file_id": fileId, "purpose": "store_file" };
    this.service.removeUploadedImage(deleteObj).subscribe(response => {
      if (response.result == 1 && type == "floorPlan") {
        this.totalFloorPlanUploadedFiles.forEach((x, index) => {
          if (x.file_id == fileId) {
            this.totalFloorPlanUploadedFiles.splice(index, 1)
          }
        }
        )
        this.floorPlanUploadedFilesdata.forEach((x, index) => {
          if (x.file_id == fileId) {
            this.floorPlanUploadedFilesdata.splice(index, 1)
          }
        }
        )
      }
      else if (response.result == 1 && type == "unitplan") {
        this.unitUploadedFilesdata.splice(index, 1);
      }
      else if (response.result == 1) {
        this.updateFileDetails.splice(index, 1);
      }
    });
  }




  public editDetails(index, type) {
    if (type == 'property') {
      this.U_propertyindex = index == 0 ? -1 : index;
      this.property_highlights_list = this.propertyModel.property_highlights_list[index];

    } else if (type == 'unit') {
      this.U_unitindex = index == 0 ? -1 : index;
      this.unit_highlights_list = this.propertyModel.unit_highlights_list[index];
    } else if (type == 'phone') {
      this.U_phoneindex = index == 0 ? -1 : index;
      this.commonVariable.phoneType = this.propertyModel.phone_list[index].type;
      this.commonVariable.phone = this.propertyModel.phone_list[index].phone;
    } else if (type == 'email') {
      this.U_emailindex = index == 0 ? -1 : index;
      this.commonVariable.emailType = this.propertyModel.email_list[index].type;
      this.commonVariable.email = this.propertyModel.email_list[index].email;
    } else if (type == 'rentPrice') {
      this.U_rentPriceindex = index == 0 ? -1 : index;
      this.commonVariable.rentEffectivePrice = this.unitSavedModel.rent_pricing_list[index].effective_rent;
      this.commonVariable.rentEffectiveTerm = this.unitSavedModel.rent_pricing_list[index].term;
      this.commonVariable.rentEffectiveStartDate = this.timestampConversion(this.unitSavedModel.rent_pricing_list[index].date_range.start_date);
      this.commonVariable.rentEffectiveEndDate = this.timestampConversion(this.unitSavedModel.rent_pricing_list[index].date_range.end_date);

    }
    else if (type == 'roomType') {
      this.U_roomTypeindex = index == 0 ? -1 : index;
      this.floorPlanCount = this.floorPlanModel.room_types_list[index].count
      this.floorPlanComment = this.floorPlanModel.room_types_list[index].comment
      this.floorPlanRoomType = this.floorPlanModel.room_types_list[index].room_type
    }
    else if (type == 'pet') {
      this.petEdit = index == 0 ? -1 : index;
      this.PolicyDist.pet_Name = _.cloneDeep(this.PolicyDist.pet_types[index]);
    }
    else if (type == 'pets') {

      this.petsEdit = index == 0 ? -1 : index;
      this.PolicyDist = _.cloneDeep(this.propertyModel.policy_dict[index]);
    }
    else if (type == 'Types') {
      this.petTypeEdit = index == 0 ? -1 : index;
      this.parkingpolicydict.Types = _.cloneDeep(this.propertyModel.parking_policy_dict.types[index]);
    }
    else if (type == 'ParkingType') {
      this.petParkingTypeEdit = index == 0 ? -1 : index;
      this.parkingpolicydict.ParkingType = _.cloneDeep(this.propertyModel.parking_policy_dict.parking_type[index]);
    }
    else if (type == 'services_list') {
      this.Servicedist = index == 0 ? -1 : index;
      this.ServiceList = _.cloneDeep(this.propertyModel.services_list[index])
    }

    else {
      this.propertyModel.icon_highlights_list.splice(index, 1);
    }
  }

  public comparation() {
    if (this.isChooseFloorPlane && this.preDefinedUnitDetail != undefined) {
      if (
        !_.isEqual(this.unitSavedModel.fee_dict, this.preDefinedUnitDetail.fee_dict) ||
        !_.isEqual(this.unitSavedModel.sqft_dict, this.preDefinedUnitDetail.sqft_dict) ||
        !_.isEqual(this.unitSavedModel.effective_rent_dict, this.preDefinedUnitDetail.effective_rent_dict)) {
        this.unitSavedModel.inherit_from_floorplan = false;

      } else {
        this.unitSavedModel.inherit_from_floorplan = true;
      }
    }
  }

  //=====================toggle the all accordition======================
  public toggleAccordion() {
    this.accorditionToggle = !this.accorditionToggle;

    // ==============accordition icon color change=====================
    if (this.accorditionToggle) {
      $('.accorditionToggleIcon').removeClass('filterGray').addClass('filterActive');
    } else {
      $('.accorditionToggleIcon').removeClass('filterActive').addClass('filterGray');
    }

  }


  //DateConversion
  public timestampConversion(date) {
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

  public addPolicyDistPet() {
    var index = 0;
    if (this.commonService.validateEmpty(this.PolicyDist.pet_Name, true)) {
      if (this.PolicyDist.pet_types == undefined) {
        this.PolicyDist.pet_types = [];
      }
      if (this.petEdit != 0) {
        index = this.petEdit < 0 ? 0 : this.petEdit;
        this.PolicyDist.pet_types[index] = this.PolicyDist.pet_Name
      }
      else {
        this.PolicyDist.pet_types.push(this.PolicyDist.pet_Name)
      }
      this.petEdit = 0;
      this.PolicyDist.pet_Name = '';
    }
    else {
      this.commonService.addToast(false, "Enter pet type.");
    }
  }

  public addPolicyDist() {

    var index = 0;
    if (this.propertyModel.policy_dict == undefined) {
      this.propertyModel.policy_dict = [];
    }
    if (this.petsEdit != 0) {
      index = this.petsEdit < 0 ? 0 : this.petsEdit;
      this.propertyModel.policy_dict[index] = this.PolicyDist
    }
    else {
      this.propertyModel.policy_dict.push(this.PolicyDist);
    }
    this.petsEdit = 0;
    this.PolicyDist = new Policy_dist();
  }

  public addparkingpolicyType() {
    var index = 0;
    if (this.commonService.validateEmpty(this.parkingpolicydict.Types, true)) {
      if (this.propertyModel.parking_policy_dict.types == undefined) {
        this.propertyModel.parking_policy_dict.types = [];
      }
      if (this.petTypeEdit != 0) {
        index = this.petTypeEdit < 0 ? 0 : this.petTypeEdit;
        this.propertyModel.parking_policy_dict.types[index] = this.parkingpolicydict.Types
      }
      else {

        this.propertyModel.parking_policy_dict.types.push(this.parkingpolicydict.Types)
      }
      this.petTypeEdit = 0;
      this.parkingpolicydict.Types = '';
    }
    else {
      this.commonService.addToast(false, "Enter Type Detail.");
    }
  }

  public addparkingType() {
    var index = 0;
    if (this.commonService.validateEmpty(this.parkingpolicydict.ParkingType, true)) {
      if (this.propertyModel.parking_policy_dict.parking_type == undefined) {
        this.propertyModel.parking_policy_dict.parking_type = [];
      }
      if (this.petParkingTypeEdit != 0) {
        index = this.petParkingTypeEdit < 0 ? 0 : this.petParkingTypeEdit;
        this.propertyModel.parking_policy_dict.parking_type[index] = this.parkingpolicydict.ParkingType;
      }
      else {
        this.propertyModel.parking_policy_dict.parking_type.push(this.parkingpolicydict.ParkingType)
      }
      this.petParkingTypeEdit = 0;
      this.parkingpolicydict.ParkingType = '';
    }
    else {
      this.commonService.addToast(false, "Enter Parking Type Detail.");
    }
  }

  public addComment() {
    var index = 0;
    if (this.propertyModel.services_list == undefined) {
      this.propertyModel.services_list = [];
    }
    if (this.Servicedist != 0) {
      index = this.Servicedist < -1 ? 0 : this.Servicedist;
      console.log( this.Servicedist)
      this.propertyModel.services_list[index] = this.ServiceList
    }
    else {
      this.propertyModel.services_list.push(this.ServiceList)
    }
    this.ServiceList = new services_list();
  }

  minMaxValidation(from) {
    if (this.floorPlanModel[from].max != undefined) {
      this.floorPlanModel[from].max = Number(this.floorPlanModel[from].max)
        < Number(this.floorPlanModel[from].min) ?
        this.floorPlanModel[from].min : this.floorPlanModel[from].max;
    }
    else {
      this.floorPlanModel[from].max = this.floorPlanModel[from].min;
    }

  }
  deptminMaxValidation() {
    if (this.floorPlanModel.deposit_dict.amount_dict.value_range.max != undefined) {
      this.floorPlanModel.deposit_dict.amount_dict.value_range.max = Number(this.floorPlanModel.deposit_dict.amount_dict.value_range.max)
        < Number(this.floorPlanModel.deposit_dict.amount_dict.value_range.min) ?
        this.floorPlanModel.deposit_dict.amount_dict.value_range.min : this.floorPlanModel.deposit_dict.amount_dict.value_range.max;
    }
    else {
      this.floorPlanModel.deposit_dict.amount_dict.value_range.max = this.floorPlanModel.deposit_dict.amount_dict.value_range.min;
    }

  }
  //_keyPress Allow Only Numeric  Values
  public _keyPress(event: any, val, maxvalue) {
    var value = val + '' + event.key
    if (Number(value) > maxvalue) {
      event.preventDefault();
    }
  }
}



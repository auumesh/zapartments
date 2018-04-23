import { Component, OnInit } from '@angular/core';
import { ManagementCompanyService } from './ManagementCompany.service';
import { PagesComponent } from '../pages.component';
import { HttpService } from '../../service';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CompanyModel, CommonVariable, EmailList, PhoneList, system_creds_list, account_info_dict, saveModel } from './ManagementCompanyModel';
import * as $ from 'jquery';
import * as _ from 'lodash';
@Component({
    selector: 'ManagementCompany',
    templateUrl: './ManagementCompany.html',
    styleUrls: ['./ManagementCompany.css']
})

export class ManagementCompanyComponent {
    public showCreate = false;
    public companyModel: CompanyModel = new CompanyModel();
    public systemCredits: system_creds_list = new system_creds_list();
    public commonVariable: CommonVariable;
    public Action: string = "add";
    public SubmitbtnClicked = false;
    public addressInfo = '';
    public managementList = [];
    public editedIndex = 0;
    public phoneNoedit = 0;
    public emailEdit = 0;
    public accorditionToggle = false;
    public accorditionToggledata = [];
    public showGrid = true;

    constructor(public service: ManagementCompanyService,
        public commonService: PagesComponent, public activatedRoute: ActivatedRoute) {

    }

    ngOnInit() {
        window.scroll(0, 0);
        this.accorditionToggledata[0] = true;
        this.accorditionToggledata[1] = false;
        this.commonVariable = new CommonVariable();
        this.getGridDetails();
    }

    //============get management details============
    public getGridDetails() {
        var postBody = { "action": "get" }
        this.service.getmanagementCompany(postBody).subscribe(response => {
            this.managementList = response.data.management_companies;
        });
    }

    //============add/update management information deails============
    public addDataIntoModel(type) {
        if (type == 'email') {
            if ( this.commonService.validateEmails(this.commonVariable.email)) {
                if (this.editedIndex != 0) {
                    var index = this.editedIndex == -1 ? 0 : this.editedIndex;
                    this.companyModel.email_list[index] = {'type':this.commonVariable.emailType,'email':this.commonVariable.email};
                    this.editedIndex = 0;
                }
                else {
                    this.companyModel.email_list.push({'type':this.commonVariable.emailType,'email':this.commonVariable.email});
                }
                this.commonVariable.emailType = '';
                this.commonVariable.email = '';
            }
            else {
                this.commonService.addToast(false, "Invalid EmailId.");
            }
        } else if (type == 'phone') {
           

           
            if (this.commonService.validateEmpty(this.commonVariable.phone, true)) {
                if (this.phoneNoedit != 0) {
                    var index = this.phoneNoedit == -1 ? 0 : this.phoneNoedit;
                    this.companyModel.phone_list[index] =  {'type':this.commonVariable.phoneType,'phone':this.commonVariable.phone};
                    this.phoneNoedit = 0;
                }
                else {
                    this.companyModel.phone_list.push( {'type':this.commonVariable.phoneType,'phone':this.commonVariable.phone});
                }
                this.commonVariable.phoneType = '';
                this.commonVariable.phone = '';
            }
            else {
                this.commonService.addToast(false, "Enter The Phone Number.");
            }

        }
    }

    //============add/update management deails============
    public addNewManagementCompany() {
        this.SubmitbtnClicked = true;
        var tempModel: any = {};
        var address: any = {};
        var validate = true;
        if (this.Action == 'add') {
            tempModel.action = "add";
        }
        else {
            tempModel.action = "update";
            tempModel.management_id = this.companyModel.management_id;
        }
        address.address = this.addressInfo;
        address.type = 'property'
        this.companyModel.address_list = [];
        this.companyModel.address_list.push(address)
        tempModel.payload = this.companyModel;
        
        validate = this.commonService.validateURL(this.systemCredits.url, validate);
        validate = this.commonService.validateURL(this.companyModel.web_site, validate);
        validate = this.commonService.validateEmpty(this.companyModel.name, validate);
        if (validate) {
            this.service.addmanagementCompany(tempModel).subscribe(response => {
                this.SubmitbtnClicked = false;
                if (response.result) {
                    if (this.Action == 'add') {
                        this.commonService.addToast(true, 'Record Added Successfully.');
                    }
                    else {
                        this.commonService.addToast(true, 'Record Updated Successfully.');
                    }
                    this.backButtonAction();
                }
            });
        } else {
            this.commonService.addToast(false, "Enter Management Company Data.");
        }
    }
    //============add system deails============
    public addsystem() {
        if (this.editedIndex != 0) {
            this.editedIndex = this.editedIndex == -1 ? 0 : this.editedIndex;
            this.companyModel.system_creds_list[this.editedIndex] = this.systemCredits;
            this.systemCredits = new system_creds_list();
            this.editedIndex = 0;
        }
        else {
            this.companyModel.system_creds_list.push(this.systemCredits)
            this.systemCredits = new system_creds_list();
        }
    }
    //============edit system deails============
    public editTheSystem(index) {
        this.editedIndex = index != 0 ? index : -1;
        this.systemCredits = _.cloneDeep(this.companyModel.system_creds_list[index]);
    }
    //============delete system deails============
    public removeTheSystem(index) {
        this.companyModel.system_creds_list.splice(index, 1)
    }

    //============delete management deails============
    public removeThemanagement(index) {
        var tempModel: any = {};
        tempModel.action = "delete";
        tempModel.management_id = this.managementList[index].management_id;
        this.service.addmanagementCompany(tempModel).subscribe(response => {
            if (response == 1) {
                this.commonService.addToast(true, 'Record Deleted Successfully.');
                this.getGridDetails();
            }
            else {
                this.commonService.addToast(false, 'Error Occoured.');
            }

        });
    }

    //============edit management deails============
    public editTheManagement(index) {
        this.Action = 'update';
        this.companyModel = this.managementList[index];
        this.addressInfo = this.managementList[index].address_list[0] != undefined ? this.managementList[index].address_list[0].address : '';
        this.commonVariable = new CommonVariable();
        this.showGrid = false;
    }
    //============back button clicked in edit screen ============
    public backButtonAction() {
        this.showGrid = true;
        this.Action = 'add';
        this.getGridDetails();
    }

    //============Add management button clicked ============
    public addmanagement() {
        this.companyModel = new CompanyModel();
        this.commonVariable = new CommonVariable();
        this.showGrid = false;
        this.Action = 'add';
        this.addressInfo = '';
    }

    //============edit management information deails============
    public editTheManagementDetails(index, from) {
        if (from == 'phone') {
            this.phoneNoedit = index != 0 ? index : -1;
            this.commonVariable.phone =  this.companyModel.phone_list[index].phone;
            this.commonVariable.phoneType =  this.companyModel.phone_list[index].type;
        }
        else if (from == 'email') {
            this.emailEdit = index != 0 ? index : -1;
            this.commonVariable.email = this.companyModel.email_list[index].email;
            this.commonVariable.emailType = this.companyModel.email_list[index].type;
        }
    }

    //============delete management deails============
    public removemanagementDetails(index, from) {
        if (from == 'phone') {
            this.companyModel.phone_list.splice(index, 1);
        }
        else if (from == 'email') {
            this.companyModel.email_list.splice(index, 1);
        }
    }

    //=====================toggle the all accordition======================
    public toggleAccordion() {
        this.accorditionToggle = !this.accorditionToggle;
        this.accorditionToggledata[0] = !this.accorditionToggle;;
        this.accorditionToggledata[1] = !this.accorditionToggle;;
        // ==============accordition icon color change=====================
        if (this.accorditionToggle) {
            $('.accorditionToggleIcon').removeClass('filterGray').addClass('filterActive');
        } else {
            $('.accorditionToggleIcon').removeClass('filterActive').addClass('filterGray');
        }


    }
}
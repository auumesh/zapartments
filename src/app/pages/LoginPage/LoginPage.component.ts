import { Component, OnInit } from '@angular/core';
import { LoginPageService } from './LoginPage.service';

import { PagesComponent } from '../pages.component';
import { HttpService } from '../../service';
import { Headers } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as $ from 'jquery';

@Component({
    selector: 'LoginPage',
    templateUrl: './LoginPage.html',
    styleUrls: ['./LoginPage.css']
})

export class LoginComponent {
    public showCreate = false;
    public userName = '';
    public password = '';
    constructor(public service: LoginPageService,
        public activatedRoute: ActivatedRoute,
        public commonService: PagesComponent) {

    }
    ngOnInit() {
        window.scroll(0, 0);
        $('.sign-up-main-control').css("background-image", "url('assets/img/1.jpg')");
    }
    createPassword() {
        this.showCreate = true;
    }

    backClicked() {
        this.showCreate = false;
    }

    HeadermenuChange(from) {
        location.href = "/#/pages/" + from;
    }

    //Login In Process
    LoginButtonClick() {

        localStorage.setItem("userName", this.userName);
        localStorage.setItem("password", this.password);
        this.service.LoginProcess(this.userName, this.password).subscribe(res => {
            if (res.result == 1) {
                localStorage.setItem("Token", 'Bearer ' + res.user.token);
                if (res.user.tenant_dict != undefined) {
                    localStorage.setItem("Webtoken", res.user.tenant_dict.web_token);
                } else {
                    localStorage.setItem("id", res.user.id);
                }
                localStorage.setItem("AccountType", res.user.account_type);
                if (res.user.account_type == 0) {
                    location.href = "/#/pages/apartmentList";
                }
                else if (res.user.account_type == 3) {
                    location.href = "/#/pages/matches";
                }
                window.location.reload();
            }
            else {
                this.commonService.addToast(false, "Invalid User.");
            }
        });
    }
}
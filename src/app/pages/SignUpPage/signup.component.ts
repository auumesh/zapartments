import { Component, OnInit, NgZone } from '@angular/core';
import { SignUpService } from './signup.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { signupmodel, preferencesmodel, GeocoderRequests, marker } from './signup.model';
import { PagesComponent } from '../pages.component';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
@Component({
    selector: 'signup',
    templateUrl: './signup.html',
    styleUrls: ['./signup.css']
})

export class SignUpComponent {
    public showTermplate = 1;
    public latitude = 0;
    public longitude = 0;
    public street = ''
    date3 = new Date();
    signupdata = [];
    signupQuestion = '';
    lastAnswerModel = new signupmodel();
    nextDesabled = true;
    allow_signup = false;
    isLoading = false;
    public conversation_id = '';
    public preferencesmodel = new preferencesmodel();
    public Webtoken = 'a05fee89-f110-4607-b87d-85cfcd8a7948';
    public prograss: any;
    public request = new GeocoderRequests();
    public nextProcess = "";
    public nearbyPlaces = [];
    public marker: marker[] = new Array<marker>();;
    public markerdata: marker[] = new Array<marker>();;
    public selectedCities = 0;
    public AiconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue.png';
    public diconUrl = 'http://maps.google.com/mapfiles/ms/icons/red.png'
    public CommuteMethod = "";
    public CommuteMethodList = [];
    public Address = '';
    public NextAttempt = 0;
    public val = 60
    public nextQA = 0;
    public budjetQAExist = false;
    
    public signup = "pages/signup";
    public signuplimit = "pages/signup/limit";
    public signuplocation = "pages/signup/location";
    public signuppets = "pages/signup/pets";
    public signupmostimportant = "pages/signup/mostimportant";
    public signupmovein = "pages/signup/movein";

    constructor(public service: SignUpService,
        public activatedRoute: ActivatedRoute,
        public commonService: PagesComponent,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {


    }
    ngOnInit() {
        window.scroll(0, 0);
        this.service.getIpaddress().subscribe(detail => {
            this.latitude = detail.latitude;
            this.longitude = detail.longitude;
            this.street = detail.city;
        });
        this.CommuteMethodList = this.service.getCommuteMethodListDetails();
        // if (localStorage.getItem("orderNo") != undefined) {
        //     this.nextStep(Number(localStorage.getItem("orderNo")));

        // }

        // else {
        this.nextStep(1);
        // }



    }

    signupnextprocess(typeId, from) {
        this.nextDesabled = true;
        this.isLoading = true;
        var detail: any = {};
        detail.action = "next";
        // this.conversation_id
        detail.conversation_id = localStorage.getItem("conversation_id");
        this.conversation_id = localStorage.getItem("conversation_id");
        detail.order_num = from;
        detail.response = this.lastAnswerModel.response == undefined ? true : this.lastAnswerModel.response;
        detail.web_token = this.Webtoken;

        this.service.signupprocess(detail).subscribe(detail => {
            if (detail.conversation_id != undefined) {
                window.scroll(0, 0);

                var responceDetail: any = {};

                if (this.nextProcess != 'Previous' && this.lastAnswerModel.response_list != undefined &&
                    this.lastAnswerModel.response_list.length > 0) {

                    responceDetail = this.lastAnswerModel.response_list.filter(x => x.order_num ==
                        from + 1)[0];

                }
                console.log(responceDetail)
                this.lastAnswerModel.answer_conversion = [];
                if (this.nextProcess == 'Previous') {

                    responceDetail = this.lastAnswerModel.response_list.filter(x => x.order_num ==
                        from)[0];
                    console.log(responceDetail)
                    this.lastAnswerModel.question_text = responceDetail.question_text;
                    this.lastAnswerModel.response = responceDetail.response;
                    this.showTermplate = from;
                    this.prograss = detail.progress_pcnt;
                    this.isLoading = false;
                    // this.lastAnswerModel.prev_q = detail.prev_q;
                    //  this.lastAnswerModel.next_q = detail.next_q;
                }
                else {
                    this.lastAnswerModel = detail;
                    if (responceDetail != undefined) {
                        this.lastAnswerModel.response = responceDetail.response;
                        console.log(this.lastAnswerModel.response)
                        this.nextProcess == 'Previous'
                    }


                    this.nextDesabled = !detail.allow_skip;
                    this.allow_signup = detail.allow_signup;
                    this.signupdata[from] = detail;
                    this.prograss = detail.progress_pcnt;
                    // detail.next_order_num == 18 ? 19 : 
                    this.showTermplate = detail.next_order_num;
                    console.log(this.showTermplate)
                    if (detail.next_order_num == 10) {
                        this.budjetQAExist = true;
                    }
                    if (detail.next_order_num != undefined) {
                        localStorage.setItem("orderNo", Number(detail.next_order_num - 1).toString());
                    }

                    this.isLoading = false;
                }


                if (this.nextProcess != 'Previous' && detail.next_order_num == 14) {
                    this.nearbyPlaces = this.lastAnswerModel.curated_response_dict.recommended_nearby_cities_list
                    if (this.nearbyPlaces != undefined && this.nearbyPlaces.length > 0) {
                        this.nearbyPlaces.forEach(places => {
                            var placesdata: any = {};
                            placesdata.lng = Number(places.lng);
                            placesdata.lat = Number(places.lat);
                            placesdata.label = places.name
                            placesdata.draggable = true;
                            placesdata.icon = this.diconUrl;
                            placesdata.selected = false;
                            this.marker.push(placesdata)
                        })
                    }
                }
                if (this.nextProcess != 'Previous' && detail.next_order_num == 16) {
                    this.lastAnswerModel.response = 50;
                }
                if (this.nextProcess != 'Previous' && detail.next_order_num == 2) {

                    this.lastAnswerModel.response = this.lastAnswerModel.response > 0 ? this.lastAnswerModel.response : 10000;
                    this.valuechange(this.lastAnswerModel.response)
                }
                if (this.nextProcess != 'Previous' && detail.next_order_num == 6) {
                    this.lastAnswerModel.response = new Date();
                    this.nextDesabled = false;
                }

                if (this.nextProcess == 'Previous' && from == 1) {
                    this.lastAnswerModel.response = responceDetail.response;
                    this.lastAnswerModel.answer_conversion[this.lastAnswerModel.response] = true;
                    //  setTimeout(() => {
                    this.selectiondata(this.lastAnswerModel.response, 'selection-box', 0)
                    //   }, 200);
                    this.valuechange(this.lastAnswerModel.response)

                }
                else if (this.nextProcess == 'Previous' && from == 2
                ) {
                    this.lastAnswerModel.response = responceDetail.response;
                    this.valuechange(this.lastAnswerModel.response)
                }
                else if (this.nextProcess == 'Previous' && from == 3
                    && detail.curated_response_dict.move_location_dict.formatted_address != undefined) {
                    this.latitude = detail.curated_response_dict.move_location_dict.location_coords[0];
                    this.longitude = detail.curated_response_dict.move_location_dict.location_coords[1]
                    this.lastAnswerModel.response = detail.curated_response_dict.move_location_dict.formatted_address;
                    this.valuechange(this.lastAnswerModel.response)

                    //    
                    this.latitude = detail.curated_response_dict.move_location_dict.location_coords[1];
                    this.longitude = detail.curated_response_dict.move_location_dict.location_coords[0];
                    // this.getLatitudeLongitude(this.lastAnswerModel.response)
                }
                else if (this.nextProcess == 'Previous' && from == 4
                    && responceDetail.response != undefined) {
                    this.lastAnswerModel.response = responceDetail.response.toString();
                    this.valuechange(this.lastAnswerModel.response)
                    var details = ['', 'Dogs', 'Cats', 'Others']

                    responceDetail.response.forEach(x => {
                        details.forEach((y, index) => {
                            if (x == y) {
                                this.lastAnswerModel.answer_conversion[index] = true;
                                //  setTimeout(() => {
                                this.selectiondata(index, 'selection-box', 1)

                                //    }, 300);
                            }

                        })

                    })

                }

                else if (this.nextProcess == 'Previous' && from == 5
                ) {
                    this.lastAnswerModel.response = responceDetail.response;
                    this.valuechange(this.lastAnswerModel.response)
                    this.lastAnswerModel.answer_conversion[this.lastAnswerModel.response] = true;
                    //  setTimeout(() => {
                    this.selectiondata(responceDetail.response, 'selection-box', 0)
                    //   }, 300);
                }
                else if (this.nextProcess == 'Previous' && from == 6
                ) {
                    this.lastAnswerModel.response = new Date(responceDetail.response);
                    this.valuechange(this.lastAnswerModel.response)

                }
                else if (this.nextProcess == 'Previous' && from == 7
                ) {

                    this.lastAnswerModel.response = responceDetail.response;
                    this.lastAnswerModel.answer_conversion[this.lastAnswerModel.response] = true;
                    //    setTimeout(() => {
                    this.selectiondata(responceDetail.response, 'selection-box', 0)
                    //   }, 300);


                }
                else if (this.nextProcess == 'Previous' && from == 8
                ) {
                    this.lastAnswerModel.response = responceDetail.response;

                }
                else if (this.nextProcess == 'Previous' && from == 9
                ) {
                    this.lastAnswerModel.response = responceDetail.response;
                }
                else if (this.nextProcess == 'Previous' && from == 11
                ) {
                    // this.lastAnswerModel.response = responceDetail.response;
                    var details = ['', 'in-unit laundry', 'washer/dryer connections', 'on-site laundry']

                    responceDetail.response.forEach(x => {
                        details.forEach((y, index) => {
                            if (x == y) {
                                this.lastAnswerModel.answer_conversion[index] = true;
                                //     setTimeout(() => {
                                this.selectiondata(index, 'selection-box', 1)
                                //    }, 300);
                            }

                        })

                    })

                }
                else if (this.nextProcess == 'Previous' && from == 12
                ) {

                    this.lastAnswerModel.response = responceDetail.response == 'Garage' ? 1 : 2;

                    this.lastAnswerModel.answer_conversion[this.lastAnswerModel.response] = true;
                    // setTimeout(() => {
                    this.selectiondata(this.lastAnswerModel.response, 'selection-box', 0)
                    //  }, 300);
                }
                else if (this.nextProcess == 'Previous' && from == 13
                ) {
                    var details = ['', 'Hardwood floors', 'Dishwasher', 'Air Conditioning', 'Patio/Balcony', 'Pool', 'Gym']

                    responceDetail.response.forEach(x => {
                        details.forEach((y, index) => {
                            if (x == y) {
                                this.lastAnswerModel.answer_conversion[index] = true;
                                //  setTimeout(() => {

                                this.selectiondata(index, 'selection-box', 1)
                                // }, 300);
                            }

                        })

                    })
                    //    this.lastAnswerModel.response = responceDetail.response;
                }
                else if (this.nextProcess == 'Previous' && from == 14
                ) {

                    //  this.lastAnswerModel.response = responceDetail.response;
                }
                else if (this.nextProcess == 'Previous' && from == 15
                ) {

                    //  this.lastAnswerModel.response = responceDetail.response;
                    this.Address = responceDetail.response.address != undefined ? responceDetail.response.address : '';
                    this.CommuteMethod = responceDetail.response.mode != undefined ? responceDetail.response.mode : '';
                }
                else if (this.nextProcess == 'Previous' && from == 16
                ) {

                    this.lastAnswerModel.response = responceDetail.response;

                }
                else if (this.nextProcess == 'Previous' && from == 17
                ) {
                    this.lastAnswerModel.response = responceDetail.response;
                    //  setTimeout(() => {
                    this.selectiondata(responceDetail.response, 'selection-box', 0)
                    // }, 200);
                }
                else if (this.nextProcess == 'Previous' && from == 18
                ) {
                    this.lastAnswerModel.response = responceDetail.response;
                    //  setTimeout(() => {
                    this.selectiondata(responceDetail.response, 'selection-box', 0)
                    //  }, 300);


                }
                this.nextProcess == '';
                this.NextAttempt = 0;
            }
            else {
                this.NextAttempt++
                if (this.NextAttempt >= 3) {
                    window.location.reload();
                }
            }
            this.nextProcess = '';
        });
    }


    checkConversationId() {
        return (this.lastAnswerModel.conversation_id != undefined
            && this.lastAnswerModel.conversation_id != null
            && this.lastAnswerModel.conversation_id != '')
    }



    clickPreviousButton(typeId) {
        // var from = typeId - 1;
        this.nextProcess = 'Previous'

        if (this.budjetQAExist == false && typeId == 11) {
            typeId = typeId - 2;
            from = typeId;
        }

        var responceDetail = this.lastAnswerModel.response_list.filter(x => x.order_num ==
            typeId)[0];

        console.log(responceDetail)
        this.lastAnswerModel.response = responceDetail.response;

        this.nextQA = typeId;
        var from = typeId;





        this.signupnextprocess(typeId, from)
    }

    backGroundDesign(from) {
        switch (from) {
            case 1:
                $('.sign-up-main-control').css("background-image", "url('assets/img/1.jpg')");
                break;
            case 2:
                $('.sign-up-main-control').css("background-image", "url('assets/img/2.jpeg')");
                break;
            case 3:
                $('.sign-up-main-control').css("background-image", "url('assets/img/3.jpg')");
                break;
            case 4:
                $('.sign-up-main-control').css("background-image", "url('assets/img/4.jpg')");
                break;
            case 5:
                $('.sign-up-main-control').css("background-image", "url('assets/img/5.jpg')");
                break;
            case 6:
                $('.sign-up-main-control').css("background-image", "url('assets/img/6.jpg')");
                break;
            case 7:
                $('.sign-up-main-control').css("background-image", "url('assets/img/7.jpg')");
                break;
            case 8:
                $('.sign-up-main-control').css("background-image", "url('assets/img/8.jpg')");
                break;
            case 9:
                $('.sign-up-main-control').css("background-image", "url('assets/img/9.jpg')");
                break;
            case 10:
                $('.sign-up-main-control').css("background-image", "url('assets/img/9.jpg')");
                break;
            case 11:
                $('.sign-up-main-control').css("background-image", "url('assets/img/11.jpg')");
                break;
            case 12:
                $('.sign-up-main-control').css("background-image", "url('assets/img/12.jpg')");
                break;
            case 13:
                $('.sign-up-main-control').css("background-image", "url('assets/img/13.jpg')");
                break;
            case 14:
                $('.sign-up-main-control').css("background-image", "url('assets/img/14.jpg')");
                break;
            case 15:
                $('.sign-up-main-control').css("background-image", "url('assets/img/road.jpg')");
                break;
            case 16:
                $('.sign-up-main-control').css("background-image", "url('assets/img/15.jpg')");
                break;
            case 17:
                $('.sign-up-main-control').css("background-image", "url('assets/img/16.jpg')");
                break;
            case 18:
                $('.sign-up-main-control').css("background-image", "url('assets/img/16.jpg')");
                break;


        }
    }



    nextStep(typeId) {
        var from = typeId - 1;

        if (this.budjetQAExist == false && typeId == 10) {
            typeId = typeId + 1;
            from = typeId - 2;
        }

        // var typeId = 1;
        //  if (this.lastAnswerModel.next_q != undefined
        //   && this.lastAnswerModel.next_q.order_num != undefined) {
        //  if(this.nextQA!=0) 
        //  {
        //   from = this.nextQA;
        //  }  

        //   typeId = this.lastAnswerModel.next_q.order_num + 1;

        //}
        this.backGroundDesign(typeId)
        if (typeId == 1) {
            var detail: any = {};
            detail.action = 'start';
            detail.web_token = this.Webtoken;
            detail.order_num = 1;
            if (localStorage.getItem("conversation_id") != undefined) {
                detail.conversation_id = localStorage.getItem("conversation_id");
            }
            this.service.signupprocess(detail).subscribe(result => {
                this.signupdata = [];
                this.lastAnswerModel = result;
                this.signupdata[from] = result;
                localStorage.setItem("conversation_id", result.conversation_id)
            });
        }
        else if (typeId == 2) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 3) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 4) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 5) {
            var details = ['', 'Dogs', 'Cats', 'Others']
            this.lastAnswerModel.response = [];
            if (this.lastAnswerModel.answer_conversion != undefined
                && this.lastAnswerModel.answer_conversion.length > 0) {
                this.lastAnswerModel.answer_conversion.forEach((x, index) => {
                    if (x == true) {
                        this.lastAnswerModel.response.push(details[index])

                    }
                })
            }
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 6) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 7) {
            this.lastAnswerModel.response = this.date3;
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 8) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 9) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 10) {

            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 11) {

            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 12) {
            var details = ['', 'in-unit laundry', 'washer/dryer connections', 'on-site laundry']
            this.lastAnswerModel.response = [];
            console.log(this.lastAnswerModel.answer_conversion)
            if (this.lastAnswerModel.answer_conversion != undefined
                && this.lastAnswerModel.answer_conversion.length > 0) {
                this.lastAnswerModel.answer_conversion.forEach((x, index) => {
                    if (x == true) {
                        this.lastAnswerModel.response.push(details[index])
                    }
                })
            }

            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 13) {
            console.log(this.lastAnswerModel.answer_conversion)
            //  this.lastAnswerModel.response = this.lastAnswerModel.answer_conversion == 1 ? 'Garage' : 'parking';
            if (this.lastAnswerModel.answer_conversion != undefined
                && this.lastAnswerModel.answer_conversion.length >> 0) {
                this.lastAnswerModel.answer_conversion.forEach((x, index) => {
                    if (x == true) {
                        this.lastAnswerModel.response = index == 1 ? 'Garage' : 'parking';
                    }
                })
            }


            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 14) {
            var details = ['', 'Hardwood floors', 'Dishwasher', 'Air Conditioning', 'Patio/Balcony', 'Pool', 'Gym']
            this.lastAnswerModel.response = [];
            console.log(this.lastAnswerModel.answer_conversion)
            if (this.lastAnswerModel.answer_conversion != undefined
                && this.lastAnswerModel.answer_conversion.length >> 0) {
                this.lastAnswerModel.answer_conversion.forEach((x, index) => {
                    if (x == true) {
                        this.lastAnswerModel.response.push(details[index])
                    }
                })
            }

            this.signupnextprocess(typeId, from)
        }

        else if (typeId == 15) {
            this.lastAnswerModel.response = [];
            this.marker.forEach(x => {
                var selected = [];
                if (x.selectiondata) {
                    selected.push(x.lng)
                    selected.push(x.lat)
                    this.lastAnswerModel.response.push(selected)
                }
            })
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 16) {
            var ans: any = {};
            ans.address = this.Address;
            ans.mode = this.CommuteMethod;
            this.lastAnswerModel.response = ans;
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 17) {
            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 18) {

            this.signupnextprocess(typeId, from)
        }
        else if (typeId == 19) {
            // this.showTermplate = typeId;
            this.signupnextprocess(typeId, from)
        }


    }

    selectiondata(next_fs, from, include) {
        console.log(this.lastAnswerModel.answer_conversion)
        if (this.lastAnswerModel.answer_conversion == undefined) {
            this.lastAnswerModel.answer_conversion = [];
        }
        if (this.lastAnswerModel.answer_conversion[next_fs] == undefined
            || this.lastAnswerModel.answer_conversion[next_fs] == false) {
            this.lastAnswerModel.answer_conversion[next_fs] = true;
            this.lastAnswerModel.response = next_fs;
            this.nextDesabled = false;
            $('.' + from + '_' + next_fs).addClass('active');
            $('.' + from + '_' + next_fs).addClass('animate-scale');
            console.log('.' + from + '_' + next_fs)
            setTimeout(() => {
                $('.' + from + '_' + next_fs).removeClass('animate-scale');
            }, 200);
            if (this.nextProcess != 'Previous') {
                if (this.lastAnswerModel.answer_conversion.length > 0 && include == 0) {
                    this.lastAnswerModel.answer_conversion.forEach((element, index) => {
                        if (index != this.lastAnswerModel.response) {
                            this.lastAnswerModel.answer_conversion[index] = false;
                            $('.' + from + '_' + index).removeClass('active');
                        }
                    });
                }
            }
        }
        else {
            if (this.nextProcess != 'Previous') {
                this.lastAnswerModel.answer_conversion[next_fs] = false;
                $('.' + from + '_' + next_fs).removeClass('active');
            }
            if (include == 0) {
                this.nextDesabled = true;
            }
            else {
                var count = this.lastAnswerModel.answer_conversion.filter(x => x == true);
                this.nextDesabled = count != undefined && count.length > 0 ? false : true;
            }
        }
    }



    valuechange(event) {
        if (event == undefined || event == '' || event == null) {
            this.nextDesabled = true;
        }
        else {
            this.nextDesabled = false;
        }
    }

    savepreferences() {
        var detail: any = {};
        detail.action = "signup";
        detail.conversation_id = this.conversation_id;
        detail.response = this.preferencesmodel;
        detail.web_token = this.Webtoken;
        if (this.validateEmails(this.preferencesmodel.email)) {
            this.service.signupprocess(detail).subscribe(detail => {
                if (detail.result == 1) {
                    this.commonService.addToast(true, "Record add successfull...");
                    var token = detail.onetime_login_info.token;
                    localStorage.setItem("Token", 'Bearer ' + token);
                    if (detail.user.tenant_dict != undefined) {
                        var web_token = detail.user.tenant_dict.web_token;

                        localStorage.setItem("Webtoken", web_token);
                    } else {
                        var id = detail.user.id;

                        localStorage.setItem("id", id);
                    }
                    var account_type = detail.user.account_type;
                    localStorage.setItem("AccountType", account_type);
                    if (account_type == 0) {
                        location.href = "/#/pages/apartmentList";
                    }
                    else if (account_type == 3) {
                        location.href = "/#/pages/matches";
                    }
                    //  
                  //  window.location.reload();
                }
                else if (detail.result == 0) {
                    this.commonService.addToast(false, detail.error.message);
                }

            });
        }
        else {
            this.commonService.addToast(false, "Invalid Email Id");
        }
    }
    mapReady(tj) {

    }
    clickedMarker(event, model, index) {
        if (model.selectiondata == true) {
            model.selectiondata = false;
            model.icon = this.diconUrl;;

        }
        else {
            model.selectiondata = true;
            model.icon = this.AiconUrl;
        }
        this.selectedCities = this.marker.filter(x => x.selectiondata == true).length;

    }

    markerDragEnd(hjl) {

    }
    updateDiv(position) {
        this.latitude = position.coords.lat;
        this.longitude = position.coords.lng;
        this.getGeoLocation(this.latitude, this.longitude)
    }


    getGeoLocation(lat, lng) {
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
                        this.street = rsltAdrComponent[resultLength - (resultLength - 1)].short_name;

                        this.lastAnswerModel.response = rsltAdrComponent[resultLength - (resultLength - 1)].short_name
                            + "," + rsltAdrComponent[resultLength - (resultLength - 2)].short_name
                            + "," + rsltAdrComponent[resultLength - (resultLength - 3)].short_name
                            + "," + rsltAdrComponent[resultLength - (resultLength - 4)].short_name
                        this.Address = this.lastAnswerModel.response;
                        this.nextDesabled = false;
                    } else {
                        alert("No address available!");
                    }
                }
            });

        }
    }

    //_keyPress Allow Only Numeric  Values
    public _keyPress(event: any, val, maxvalue) {
        var value = val + '' + event.key
        if (Number(value) > maxvalue) {
            event.preventDefault();
        }
    }
    HeadermenuChange(from) {
        location.href = "/#/pages/" + from;
    }


    checkifActive(index) {

        if (this.lastAnswerModel.answer_conversion != undefined &&
            this.lastAnswerModel.answer_conversion[index] != undefined
            && this.lastAnswerModel.answer_conversion[index]) {
            return true;
        }
        else {
            return false;
        }
        // return false;
    }

    public validateEmails(string: any) {
        if (!(string == null || string == undefined || string == "")) {
            var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            var result = string.replace(/\s/g, "").split(/,|;/);
            for (var i = 0; i < result.length; i++) {
                if (!regex.test(result[i])) {
                    return false;
                }
            }

            return true;
        }
        else {
            return false;
        }
    }





}

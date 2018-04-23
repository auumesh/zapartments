import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
declare function spin(): void;

@Injectable()

export class HttpService extends Http {
  public serviceUrl: string = "https://goferapi.ambivo.com/";

  constructor(public xhrBackend: XHRBackend, public defaultOptions: RequestOptions) {
    super(xhrBackend, defaultOptions);
    var token = localStorage.getItem("Token");
    let header = new Headers();
    // header.append('Content-Type', 'multipart/form-data');

    header.append('Authorization', token);
    defaultOptions.headers = header;
  }
  get(url: string, option?: RequestOptionsArgs): Observable<Response> {
    this.turnOnModal();
    return this.intercept(super.get(url, option));
  }


  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    this.turnOnModal();
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }



  getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    return options;
  }


  intercept(observable: Observable<Response>): Observable<Response> {
    this.pendingRequests++;
    return observable
      .do((res: Response) => {
      }, (err: any) => {

        this.turnOffModal();
        if (err.status == 401) {
          this.turnOffModal();
          location.href = "/#/pages/indexpage";
        }
      })
      .finally(() => {
        var timer = Observable.timer(500);
        timer.subscribe(t => {
          this.turnOffModal();
        });
      });
  }
  public pendingRequests: number = 0;
  public showLoading: boolean = false;

  public turnOnModal() {
      if (!this.showLoading) {
        this.showLoading = true;

        spin();
      }
      this.showLoading = true;
   
  }

  public turnOffModal() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      if (this.showLoading) {
        spin();
      }
      this.showLoading = false;
    }
  }


  //get Login Details
  public getLoginDetails() {
    this.post(this.serviceUrl + 'user/login?email=sgosain%40zapartments.com&password=Z*apartments&os_version=xyz&os=xyz&device_id=xyz', '').map((response: Response) => response.json()).subscribe(response => {
      var token = response.user.token;
      localStorage.setItem("Token", 'Bearer ' + token);
      var web_token = response.user.tenant_dict.web_token;
      localStorage.setItem("Webtoken", web_token);
      window.location.reload();

    });
  }




}
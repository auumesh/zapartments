import { Component } from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Component({
  selector: 'pagesRoot',
  templateUrl: './pages.html',
})
export class PagesComponent {
  constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'material';
  }
  public addToast(errorType: boolean, message: string) {

    var toastOptions: ToastOptions = {
      title: message,
      //  msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'default',

      onAdd: (toast: ToastData) => {

      },
      onRemove: function (toast: ToastData) {

      }
    };

    // Add see all possible types in one shot 
    if (errorType) {
      this.toastyService.success(toastOptions);
    } else {
      this.toastyService.error(toastOptions);
    }
  }
  public validateURL(textval, validate) {
    if ((!(textval == null || textval == undefined || textval == ""))) {
      var expression = /[-a-zA-Z0-9@:%_\+.#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.#?&//=]*)?/gi;
      var regex = new RegExp(expression);

       return textval.match(regex) ? validate ? true : false : false;
     

      
     
    
    }
    else {
      return true;
    }

  }


  //============Validate if empty============
  public validateEmpty(value, validate) {
    if (!(value == null || value == undefined || value == "" || value == 0)) {
      return validate ? true : false;
    }
    else {
      return false;
    }

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

  //Trim function for object of object
  public deepTrim(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (typeof obj[prop] == 'string') {
          obj[prop] = obj[prop].trim();

        } else if (typeof obj[prop] == 'object') {
          this.deepTrim(obj[prop]);
        }
      }
    }
  }
}

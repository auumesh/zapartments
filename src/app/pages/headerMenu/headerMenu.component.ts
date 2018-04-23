import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'headermenu',
  templateUrl: './headermenu.html',
})
export class HeaderMenuComponent  {

    HeadermenuChange(from)
    {
      if(from=='indexpage')
      {
        localStorage.clear();
      }
      location.href = "/#/pages/"+from;
    }
  
}
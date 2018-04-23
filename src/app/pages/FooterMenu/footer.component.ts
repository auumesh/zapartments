import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'footercomponent',
  templateUrl: './footer.component.html',
})
export class FooterMenuComponent  {

    HeadermenuChange(from)
    {
      if(from=='indexpage')
      {
        localStorage.clear();
      }
      location.href = "/#/pages/"+from;
    }
  
}
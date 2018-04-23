import { Component, OnInit } from '@angular/core';
import { NopeService } from './nope.service';
import { NopeModel } from './nope.model';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-nope',
  templateUrl: './nope.html',
  //styleUrls: ['./apartment-list.component.css']
})
export class NopeComponent implements OnInit {
  public nopeModel: NopeModel;
  constructor(public service: NopeService) {
    this.nopeModel = new NopeModel();
  }
  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { LatestService } from './latest.service';
import { LatestModel } from './latest.model';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.html',
  //styleUrls: ['./apartment-list.component.css']
})
export class LatestComponent implements OnInit {
  public latestModel: LatestModel;
  constructor(public service: LatestService) {
    this.latestModel = new LatestModel();
  }
  ngOnInit() {
  }
}

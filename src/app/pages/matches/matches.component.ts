import { Component, OnInit } from '@angular/core';
import { MatchesService } from './matches.service';
import { MatchesModel } from './matches.model';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './matches.html',
  //styleUrls: ['./apartment-list.component.css']
})
export class MatchesComponent implements OnInit {
  public matchesModel: MatchesModel;
  constructor(public service: MatchesService) {
    this.matchesModel = new MatchesModel();
  }
  ngOnInit() {
  }
}

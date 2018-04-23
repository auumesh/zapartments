import { Component, OnInit } from '@angular/core';
import { ShortListService } from './shortlist.service';
import { ShortListModel, VisitingModel, LoveITModel, MayBeModel } from './shortlist.model';
import { jqxDropDownListComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shortlist',
  templateUrl: './shortlist.html',
  //styleUrls: ['./apartment-list.component.css']
})
export class ShortListComponent implements OnInit {
  public shortListModel: ShortListModel;
  public visitingModel: VisitingModel;
  public loveITModel: LoveITModel;
  public mayBeModel: MayBeModel;
  constructor(public service: ShortListService) {
    this.shortListModel = new ShortListModel();
    this.visitingModel = new VisitingModel();
    this.loveITModel = new LoveITModel();
    this.mayBeModel = new MayBeModel();
  }
  ngOnInit() {
  }
}

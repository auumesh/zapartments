import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { DataTableModule } from 'primeng/datatable';
import { PagesComponent } from './pages.component';
import { PageRouteModule } from './pages.route';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentService } from './apartment-list/apartment-list.service';

import { AddpropertyComponent } from './Addproperty/addproperty.component';
import { AddPropertyService } from './Addproperty/addproperty.service';
//====================jqwidgets===============
import { jqxDropDownListComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdropdownlist';
import { jqxSliderComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxslider';
//================primeng===================
import { DropdownModule, SliderModule, MultiSelectModule, 
  DialogModule, CalendarModule, FileUploadModule, InputMaskModule,
   DataScrollerModule ,CheckboxModule} from 'primeng/primeng';
//===================property detail============
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertyDetailService } from './property-detail/property-detail.service';
import { AgmCoreModule } from '@agm/core';
import { NgxGalleryModule } from 'ngx-gallery';
import { ToastyModule } from 'ng2-toasty';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import * as lodash from 'lodash';
import { SignUpComponent } from './SignUpPage/signup.component';
import { SignUpService } from './SignUpPage/signup.service';
import { LoginComponent } from './LoginPage/LoginPage.component';
import { LoginPageService } from './LoginPage/LoginPage.service';
import { OnlyNumber } from './OnlyNumber';
import { IndexComponent } from './IndexPage/Index.Component';
import { IndexService } from './IndexPage/Index.service';
import { HeaderMenuComponent } from './headerMenu/headerMenu.component';
import { FooterMenuComponent } from './FooterMenu/footer.component';
// import { ApartmentForRendComponent } from './apartmentRend/apartmentRend.components';
// import { ApartmentForRendService } from './apartmentRend/apartmentRend.service';
import { UserInfoComponent } from './userinfo/userinfo.component';
import { UserInfoService } from './userinfo/userinfo.service';
import { MatchesComponent } from './matches/matches.component';
import { MatchesService } from './matches/matches.service';
import { NopeComponent } from './nope/nope.component';
import { NopeService } from './nope/nope.service';
import { LatestComponent } from './latest/latest.component';
import { LatestService } from './latest/latest.service';
import { ShortListComponent } from './shortlist/shortlist.component';
import { ShortListService } from './shortlist/shortlist.service'; 
import { ManagementCompanyComponent } from './ManagementCompany/ManagementCompany.component';
import { ManagementCompanyService } from './ManagementCompany/ManagementCompany.service'; 
import { DatePipe, DecimalPipe } from '@angular/common';
@NgModule({
  imports: [
    CommonModule,
    PageRouteModule,
    FormsModule,
    DropdownModule,
    SliderModule,
    MultiSelectModule,
    DialogModule,
    CalendarModule,
    PaginatorModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6sW0ZPmecfeGr2zFd8v8zXPF9yySmgPA'
    }),
    NgxGalleryModule,
    AccordionModule,
    ToastyModule.forRoot(),
    DataTableModule,
    Ng2CarouselamosModule,
    InputMaskModule,
    DataScrollerModule,
    SliderModule,
    CheckboxModule
    
  ],
  declarations: [
    ApartmentListComponent,
    PagesComponent,
    jqxDropDownListComponent,
    jqxSliderComponent,
    PropertyDetailComponent,
    AddpropertyComponent,
    SignUpComponent,
    LoginComponent,
    OnlyNumber,
    IndexComponent,
    HeaderMenuComponent,
    FooterMenuComponent,
    //ApartmentForRendComponent,
    UserInfoComponent,
    MatchesComponent,
    NopeComponent,
    LatestComponent,
    ShortListComponent,
    ManagementCompanyComponent

  ],
  providers: [
    ApartmentService,
    PropertyDetailService,
    AddPropertyService,
    PagesComponent,
    SignUpService,
    LoginPageService,
    IndexService,
    //ApartmentForRendService,
    UserInfoService,
    MatchesService,
    NopeService,
    LatestService,
    ShortListService,
    ManagementCompanyService,
    DatePipe
  ],
  exports: [OnlyNumber],
})
export class PagesModule { }

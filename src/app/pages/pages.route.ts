import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//=====================page component======================
import {ApartmentListComponent} from './apartment-list/apartment-list.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import {PagesComponent} from './pages.component';
import { AddpropertyComponent } from './Addproperty/addproperty.component';
import { SignUpComponent } from './SignUpPage/signup.component'
import { LoginComponent } from './LoginPage/LoginPage.component';
import { IndexComponent } from './IndexPage/Index.Component';
import { UserInfoComponent } from './userinfo/userinfo.component';
import { MatchesComponent } from './matches/matches.component';
import { NopeComponent } from './nope/nope.component';
import { LatestComponent } from './latest/latest.component';
import { ShortListComponent } from './shortlist/shortlist.component';
import { ManagementCompanyComponent } from './ManagementCompany/ManagementCompany.component';
export const routes: Routes = [
    { path: '', component:  localStorage.getItem("AccountType")!=undefined
    &&localStorage.getItem("AccountType")=='0'?ApartmentListComponent :IndexComponent},
    { path: 'apartmentList', component: ApartmentListComponent },
    { path: 'propertyDetail', component: PropertyDetailComponent },
    { path: 'addPropertyDetail', component: AddpropertyComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'indexpage', component: IndexComponent },
    { path: 'userinfo', component: UserInfoComponent },
    { path: 'matches', component: MatchesComponent },
    { path: 'nope', component: NopeComponent },
    { path: 'latest', component: LatestComponent },
    { path: 'shortlist', component: ShortListComponent },
    { path: 'managementcompany', component: ManagementCompanyComponent },

];


export const PageRouteModule = RouterModule.forChild(routes);
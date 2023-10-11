import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import {LocationStrategy, HashLocationStrategy, APP_BASE_HREF} from '@angular/common';
import {LocationStrategy, PathLocationStrategy, APP_BASE_HREF} from '@angular/common';

import { routing, appRoutingProviders } from './app.routing';
import {ApplicationComponent} from './components/application/application';
import {HomeComponent} from './components/home/home';
import {AboutUsComponent} from "./components/pages/aboutus";
import {AddItemComponent} from "./components/pages/additem";
import {ItemComponent} from "./components/item/item";
import {CompareItemsComponent} from "./components/compare/compareitems";

import {RouteParamsService} from './services/routeparamsservice';
import {GlobalPurposeService} from './services/globalpurposeservice';

import {CommentComponent} from './components/comments/comment';
import {CommentFormComponent} from './components/comments/commentform';
import {CommentsGroupComponent} from './components/comments/comments';
import {CompareItemComponent} from "./components/compare/compareitem";
import {CompareItemNodeComponent} from "./components/compare/compareitemnode";
import {FooterComponent} from "./components/footer/footer";
import {ItemMinComponent} from "./components/item/itemmin";
import {ItemsVoteCountInfoComponent} from "./components/item/itemsvotecountinfo";
import {MainCategoriesComponent} from "./components/categories/maincategories";
import {PagerComponent} from "./components/pager/pager";
import {SearchBarComponent} from "./components/search/searchbar";
import {SearchComponent} from "./components/search/search";
import {SearchParametersComponent} from "./components/search/searchparameters";
import {SortCategoriesComponent} from "./components/categories/sortcategories";
import {VoteItemComponent} from './components/vote/voteitem';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, routing],
  declarations: [ 
	  ApplicationComponent, 
	  HomeComponent, 
	  AboutUsComponent, 
	  AddItemComponent, 
	  ItemComponent, 
	  CompareItemsComponent,

	  CommentComponent,
	  CommentFormComponent,
	  CommentsGroupComponent,
	  CompareItemComponent,
	  CompareItemNodeComponent,
	  FooterComponent,
	  ItemMinComponent,
	  ItemsVoteCountInfoComponent,
	  MainCategoriesComponent,
	  PagerComponent,

	  SearchBarComponent,
	  SearchComponent,
	  SearchParametersComponent, 
		SortCategoriesComponent,
	  VoteItemComponent,
  ],
  providers: [ 
  	appRoutingProviders,
  	GlobalPurposeService, 
  	RouteParamsService, 
  	{provide: LocationStrategy, useClass: PathLocationStrategy},
  	{provide: APP_BASE_HREF, useValue: '/'} ],
  bootstrap:    [ ApplicationComponent ]
})

export class AppModule { }


/*
{provide: LocationStrategy, useClass: HashLocationStrategy},
{provide: APP_BASE_HREF, useValue: '!'} ],
*/

import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './components/home/home';
import {AboutUsComponent} from "./components/pages/aboutus";
import {AddItemComponent} from "./components/pages/additem";
import {ItemComponent} from "./components/item/item";
import {CompareItemsComponent} from "./components/compare/compareitems";

const appRoutes: Routes = [
  	{path: '', component: HomeComponent},
  	{path: 'cultride/:itemId', component: ItemComponent},
	{path: 'cultrides/:pageSort/:pageStart/:pageLimit/:brandName/:searchPhraze', component: HomeComponent},
	{path: 'aboutus', component: AboutUsComponent},
	{path: 'additem', component: AddItemComponent},
	{path: 'compareitems', component: CompareItemsComponent},
];

export const appRoutingProviders: any[] = [

];

//export const routing = RouterModule.forRoot(appRoutes);
//export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
export const routing = RouterModule.forRoot(appRoutes, { useHash: false });

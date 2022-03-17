import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	url?: string;
	name?: string;
	icon?: string;
	title?:string;
	path?:string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	selected?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false
	public fullScreen = false;

	constructor() {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{	
			name:'Home',
			icon:'home',
			url: '/features/users',
		},
		{	
			name:'Users',
			icon:'supervisor_account',
			children:[
				{
				name:'Users-List',
				icon:'list',
				url: '/features/users'
				},
				{
				name:'Add-User',
				icon:'add_circle',
				url: '/features/UserForm'
				},
			]
		},
		{
			name:'Management',
			icon:'https',
			children: [
				{
					name:'Access Rules',
					icon:'settings',
					url: '/management/AccessRules',
				},
				{
					name:'Add Access Rules',
					icon:'add_circle',
					url: '/management/AccessRuleForm',
				},
			]
		}
	
]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}

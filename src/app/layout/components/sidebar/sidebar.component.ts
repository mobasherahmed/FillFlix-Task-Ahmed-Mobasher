import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from 'src/app/shared/services/nav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    menuItems: Menu[];
    constructor(private _navService:NavService,private router:Router) {
        this.getMenu()
    }

    getMenu(){
        this._navService.items.subscribe(menuItems=>{
            this.menuItems = menuItems;
            console.log("items",menuItems);
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                  menuItems.filter(items => {
                    if (items.url === event.url)
                      this.setNavActive(items)
                    if (!items.children) return false
                    items.children.filter(subItems => {
                      if (subItems.url === event.url)
                        this.setNavActive(subItems)
                      if (!subItems.children) return false
                      subItems.children.filter(subSubItems => {
                        if (subSubItems.url === event.url)
                          this.setNavActive(subSubItems)
                      })
                    })
                  })
                }
              })
        })
    }

    setNavActive(item) {
        this.menuItems.filter(menuItem => {
          if (menuItem != item)
            menuItem.active = false
          if (menuItem.children && menuItem.children.includes(item))
            menuItem.active = true
          if (menuItem.children) {
            menuItem.children.filter(submenuItems => {
              if (submenuItems.children && submenuItems.children.includes(item)) {
                menuItem.active = true
                submenuItems.active = true
              }
            })
          }
        })
      }

      toggleSelected(item){
          this.menuItems.forEach(item=>{
              item.selected=false;
              if(item.children){
                  item.children.forEach(subItem=>{
                    subItem.selected=false;
                  })
              }
            });
          console.log("this.menuItems",this.menuItems);
          
          item.selected = true;
      }
    checkRoute(url){
        console.log("url",url);
        
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (url === event.url) return true;
                return false;
            }
        })
    }
    ngOnInit() {
        this.showMenu = '';
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}

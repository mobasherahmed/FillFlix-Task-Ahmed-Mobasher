import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Menu, NavService } from 'src/app/shared/services/nav.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    menuItems: Menu[];
    constructor(private _navService:NavService,private router:Router) {
        this.getMenu()
    }

    getMenu(){
        this._navService.items.subscribe(menuItems=>{
            this.menuItems = menuItems;
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
          item.selected = true;
      }

    ngOnInit() {
    }

}


import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Menu, NavService } from 'src/app/shared/services/nav.service';
import { CustomizerService } from 'src/app/shared/services/customizer.service';
import { SharedDataService } from 'src/app/shared/services/shared-data.service';

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public openNav: boolean = false
  public right_sidebar: boolean = false
  public text: string;
  public elem;
  public isOpenMobile: boolean = false;
  lang:string = 'EN'
  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  notifications: any[] = [];

  constructor(
    public customize: CustomizerService,
    public navServices: NavService,
    private share:SharedDataService,
    @Inject(DOCUMENT) private document: any,
    private translate: TranslateService,
    private router:Router) {
  }


  ngOnDestroy() {
    this.removeFix();
  }


  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

  public changeLanguage(lang:string) {
    this.translate.use(lang.toLocaleLowerCase());
    // this.share.assignLang(lang.toLocaleLowerCase());
    lang === 'ar' ? this.customizeLayoutType('rtl') : this.customizeLayoutType('ltr')  ; 
    this.lang =  lang.toLocaleUpperCase();
    
  }

    // Customize Layout Type
    customizeLayoutType(val) {
      this.customize.setLayoutType(val)
      
    }
  
  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items = [];
    term = term.toLowerCase();
    this.items.filter(menuItems => {
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) return false
      menuItems.children.filter(subItems => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter(suSubItems => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
    });
  }

  checkSearchResultEmpty(items) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }
  ngOnInit() {
    this.elem = document.documentElement;
    // this.navServices.items.subscribe(menuItems => {
    //   this.items = menuItems
    // });
  }


  onLogout(){
    localStorage.removeItem('isLoggined');
    localStorage.removeItem('ucxToken');
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}

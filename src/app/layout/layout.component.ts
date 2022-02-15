import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-layout',
    template:`
    <app-topnav></app-topnav>
    <app-sidebar></app-sidebar>
    <div class="main-container">
        <router-outlet></router-outlet>
    </div>
    `
})
export class LayoutComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './componenets/categories-list/categories-list.component';
import { CategoryFormComponent } from './componenets/category-form/category-form.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [CategoriesListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),

  ]
})
export class CategoriesModule { }

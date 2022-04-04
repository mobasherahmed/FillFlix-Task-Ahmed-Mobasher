import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  categoriesForm:FormGroup;
    subIndex: any;
    categoryIndex: any;
    AccountType: string;
    AccountId: string;

    constructor(
        private _category:CategoryService,
        private fb:FormBuilder,
        private location:Location,
    ) {
        this.categoriesForm = fb.group({
            categories: fb.array([])
        })
    }

    ngOnInit() { 
     
        // this.addCategory(0);
        this.setValues();
    }

    setValues(){
        this._category.categories.subscribe(category=>{
          console.log("caa",category);
          
            if(category.id){
                    let elFormGroup = this.fb.group({
                        name:[category.name,Validators.required],
                        description:[category.description],
                        id:[category.id],
                        isDeleted:[false],
                        sub:this.fb.array([])
                    })
                    this.categories().push(elFormGroup);
                    category.sub.forEach(sub=>{
                       let subForm = this.fb.group({
                            name:[sub.name,Validators.required],
                            description:[sub.description],
                            isDeleted:[false],
                            id:[sub.id],
                        })
                    this.sub(0).push(subForm)
                    })
                 
                    this.categoriesForm.updateValueAndValidity();
            }else{
             this.addCategory(0);
            }
        })
    }

    categories(): FormArray {
        return this.categoriesForm.get('categories') as FormArray;
      }

    sub(Index): FormArray {
        return this.categories().at(Index).get("sub") as FormArray;
    }

    addCategory(categoryIndex) {
        this.categories().push(this.newCategory());
        this.addSubCategory(categoryIndex);
      }

    addSubCategory(index) {
        this.sub(index).push(this.newSub());
      }
  
    newCategory(): FormGroup {
        return this.fb.group({
        name:[,Validators.required],
        description:[],
        id:[null],
        isDeleted:[false],
        sub:this.fb.array([])
        });
    }

    newSub(): FormGroup {
        return this.fb.group({
         name:[,Validators.required],
         description:[],
         id:[null],
         isDeleted:[false],
        });
    }
    
      deleteCategory(index){
          if(!this.checkCategoryDelete()){
            let arr = this.categoriesForm.get('categories') as FormArray;
            arr.removeAt(index);
            }
      }

      deleteSubCategory(categoryIndex:number,subIndex:number) {
          // if(!this.checkSubCategoryDelete(categoryIndex)){
              this.sub(categoryIndex).removeAt(subIndex);
          // }
      }

      checkCategoryDelete(){
        let arr = this.categoriesForm.get('categories') as FormArray;
       if(arr.length == 1) return true;
       return false;
      }

      checkSubCategoryDelete(packgeIndex){
        let arr = this.categories().at(packgeIndex).get("sub") as FormArray;
       if(arr.length == 1) return true;
       return false;
      }


      cancel(){
        this.location.back()
      }
      submitForm(){
        this.manageCategories();
      }
    
      manageCategories(){
        const categories = this.categoriesForm.value.categories;
        this._category.manageCategory(categories).subscribe(res=>{
          this.cancel();
        })
      }

      checkDisable(){
        if(this.categoriesForm.invalid) return true
        return false;
      }

    ngOnDestroy(){
      this._category.categories.next({});
      // this._category.categories.unsubscribe();
    }

}

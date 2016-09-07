import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../model/category/category';
import {CategoryService} from '../../services/category/categoryService';
@Component({
  moduleId: module.id,
  selector: 'app-category',
  templateUrl: 'category.component.html',
  directives: [],
  providers: [CategoryModel, CategoryService]
})
export class CategoryComponent {
  private model: CategoryModel;
  categoryName: string;
  constructor(private Service: CategoryService) {
    this.bydefault();
  }

  bydefault() {
    this.model = new CategoryModel();
    this.model.CategoryID = 0;
    this.model.CategoryName = "";
    this.model.CreatedBy = 'vipin';
    this.model.ModifiedBy = 'vipin';   
  }

  addCompany() {
    this.Service.saveCategory(this.model).map(r => r.json())
      .subscribe(a => {
        if (a.success) {
          alert("category inserted!");
        
        }
        else {
          alert(a.data);
        }
      });
  }
}
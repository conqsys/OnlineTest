 
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrls } from '../../shared/ApiUrls';
import {CategoryModel} from '../../model/category/category';

@Injectable()
export class CategoryService {

  constructor(private http: Http) {

  }
    saveCategory(category):any{
       return this.http.post(ApiUrls.baseUrl + 'category',category);
   }
 
}
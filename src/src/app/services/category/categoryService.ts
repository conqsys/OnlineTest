 
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ApiUrl } from '../../shared/api-url.component';
import {CategoryModel} from '../../model/category/category';

@Injectable()
export class CategoryService {

  constructor(private http: Http) {

  }
    saveCategory(category):any{
       return this.http.post(ApiUrl.baseUrl + 'category',category);
   }
 
}
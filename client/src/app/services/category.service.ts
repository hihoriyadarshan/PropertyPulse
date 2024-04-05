  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { categoryUrls } from '../category.urls';

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryService {

    constructor(private http: HttpClient) { }

    // create category
    createCategory(categoryData: any): Observable<any> {
      return this.http.post<any>(categoryUrls.categoryServiceApi + 'create-category', categoryData)
        .pipe(
          catchError(error => {
            console.error('Error creating category:', error);
            return throwError(error);
          })
        );
    }

  // Fetch categories from the backend
  fetchCategories(): Observable<any> {
    return this.http.get<any>(categoryUrls.categoryServiceApi + 'fetch-categories')
      .pipe(
        catchError(error => {
          console.error('Error fetching categories:', error);
          return throwError(error);
        })
      );
  }


    // create sub-category
    createSubCategory(subcategoryData: any): Observable<any> {
      return this.http.post<any>(categoryUrls.categoryServiceApi + 'create-subcategories', subcategoryData)
        .pipe(
          catchError(error => {
            console.error('Error creating sub-category:', error);
            return throwError(error);
          })
        );
    }


  }

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


  // fetch Subcategories from the backend
  fetchSubCategories(): Observable<any> {
    return this.http.get<any>(categoryUrls.categoryServiceApi + 'fetch-subcategories')
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

// Get All category
  getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${categoryUrls.categoryServiceApi}getAllcategory`);  
}

// Get All SubCategory
  getAllSubCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${categoryUrls.categoryServiceApi}getAllsubcategories`);  
}


//  Delete Category
deleteCategory(categoryId: string): Observable<any> {
  return this.http.delete<any>(`${categoryUrls.categoryServiceApi}deletecategory/${categoryId}`);
}

// Delete Sub-Category
deleteSubCategory(subcategoryId: string): Observable<any> {
  return this.http.delete<any>(`${categoryUrls.categoryServiceApi}deletesubcategory/${subcategoryId}`);
}


}

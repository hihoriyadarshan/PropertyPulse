import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-sub-category',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './create-sub-category.component.html',
  styleUrl: './create-sub-category.component.css'
})
export default class CreateSubCategoryComponent implements OnInit {
  subCategoryName: string = '';
  category: string = '';
  categories: any[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Fetch categories from backend when component initializes
    this.fetchCategories();
  }

  // Fetch categories from backend
  fetchCategories() {
    this.categoryService.fetchCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Create sub-category
  createSubCategory() {
    const subcategoryData = {
      s_name: this.subCategoryName,
      category: this.category
    };

    this.categoryService.createSubCategory(subcategoryData).subscribe(
      (response: any) => {
        alert('Sub-category created successfully');
        
        console.log('Sub-category created successfully:', response);
        // Optionally, you can redirect or show a success message here
      },
      (error: any) => {
        alert('sub-Category already exists');
        console.error('Error creating sub-category:', error);
        // Handle error - show error message or log it
      }
    );
  }
}
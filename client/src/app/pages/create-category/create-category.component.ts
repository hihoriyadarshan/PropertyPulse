import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export default class CreateCategoryComponent {
  categoryName: string = '';
  
  constructor(private categoryService: CategoryService) {}

  createCategory(categoryForm: NgForm) {
    if (!this.categoryName) {
      alert('Category name is required');
      return;
    }

    this.categoryService.createCategory({ name: this.categoryName }).subscribe(
      response => {
        console.log('Category creation response:', response);
        if (response.success) {
          alert('Category created successfully');
          categoryForm.resetForm(); // Reset form after successful submission
          this.categoryName = ''; // Clear the input field value
        } else {
          alert('Category already exists');
        }
      },
      error => {
        console.error('Error creating category:', error);
        
      }
    );
  }
}
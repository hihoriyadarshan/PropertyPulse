import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export default class CreateCategoryComponent implements OnInit {
  categoryName: string = '';
  category: any[] = [];
  
  constructor(private categoryService: CategoryService) {}

    ngOnInit(): void {
      this.getAllCategory();
    }


  
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



  getAllCategory(): void {
    this.categoryService.getAllCategory()
      .subscribe(
        (response: any) => {
          if (response.status === 200 && Array.isArray(response.data)) {
            this.category = response.data; 
          } else {
            console.error('Invalid response format:', response);
          }
        },
        (error: any) => {
          console.error('Error fetching category:', error);
        }
      );
  }


  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this Category?')) {
      this.categoryService.deleteCategory(id)
        .subscribe(
          (response: any) => {
            console.log('Contact deleted successfully:', response);
            
            this.category = this.category.filter(category => category._id !== id);
          },
          (error: any) => {
            console.error('Error deleting user:', error);
          }
        );
    }
  }

}
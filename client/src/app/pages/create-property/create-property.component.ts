import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormsModule,NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-property',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './create-property.component.html',
  styleUrl: './create-property.component.css'
})
export default class CreatePropertyComponent implements OnInit {
  category: string = '';
  subcategory: string = '';

  categories: any[] = [];
  subcategories: any[] = [];  

  user_id: string | null = localStorage.getItem('user_id'); // Retrieve user_id from localStorage
  name: string = '';
  address: string = '';
  description: string = '';
  type: string = '';
  price: number = 0;
  sqft: number = 0;
  photo: File | null = null;
  latitude: string = '';
  longitude: string = '';

  constructor(private propertyService: PropertyService, private router: Router,private categoryService: CategoryService) { }
  ngOnInit(): void {
    // Fetch categories from backend when component initializes
    this.fetchCategories();
    this.fetchSubCategories();

  }

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

  fetchSubCategories() {
    this.categoryService.fetchSubCategories().subscribe(
      (response: any) => {
        this.subcategories = response.categories;
      },
      (error: any) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }

  onSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('user_id', this.user_id || '');
    formData.append('name', this.name);
    formData.append('address', this.address);
    formData.append('description', this.description);
    formData.append('type', this.type);
    formData.append('price', this.price.toString());
    formData.append('sqft', this.sqft.toString());
    if (this.photo) {
      formData.append('photo', this.photo, this.photo.name);
    }
    
    formData.append('latitude', this.latitude);
    formData.append('longitude', this.longitude);
    formData.append('category', this.category);
    formData.append('subcategory', this.subcategory);

    this.propertyService.createProperty(formData).subscribe(
      (response: any) => {
        console.log('Property created successfully:', response);
        this.router.navigate(['/property']);
      },
      (error) => {
        console.error('Error occurred while creating property:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.photo = event.target.files[0];
  }
}
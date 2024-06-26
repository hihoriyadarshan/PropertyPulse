import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css'
})

export default class PropertyComponent implements OnInit {
    properties: any[] = [];
    propertyPhotoMap: Map<string, string> = new Map(); // Use a map to store property photos
    selectedPriceFilter: number = 0; // Default value for price filter
    selectedRentSellFilter: string = ''; 
    
    constructor(private propertyService: PropertyService, private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.getPropertyPhoto(id);
        }
      });
  
      this.getAllProperties();
    }
  
    getAllProperties(): void {
      this.propertyService.getAllProperties().subscribe(
        (response: any[]) => {
          this.properties = response;
          this.properties.forEach(property => {
            this.getPropertyPhoto(property._id); // Fetch photos for each property
          });
        },
        (error: any) => {
          console.error('Error fetching properties:', error);
        }
      );
    }
  
    getPropertyPhoto(id: string): void {
      this.propertyService.getPropertyPhoto(id).subscribe(
        (photoBlob: Blob) => {
          this.createImageFromBlob(photoBlob, id); // Pass property ID to createImageFromBlob
        },
        (error: any) => {
          console.error('Error fetching property photo:', error);
        }
      );
    }
  
    createImageFromBlob(image: Blob, id: string): void {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.propertyPhotoMap.set(id, reader.result as string);
      }, false);
      if (image) {
        reader.readAsDataURL(image);
      }
    }

    getShortDescription(description: string): string {
      const words = description.split(' ');
      if (words.length > 8) {
        return words.slice(0, 8).join(' ') + '...'; 
      } else {  
        return description;
      }
    }



    
    applyFilter(filterValue: string): void {
      this.selectedRentSellFilter = filterValue;
      let filteredProperties = [...this.properties]; // Create a copy of this.properties
  
      if (this.selectedRentSellFilter !== '') {
        filteredProperties = filteredProperties.filter(property => property.Rent_sell === this.selectedRentSellFilter);
      }
  
      // Update properties list
      this.properties = filteredProperties;
    }
  }
    


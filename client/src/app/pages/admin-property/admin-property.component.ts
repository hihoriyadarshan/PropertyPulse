import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-admin-property',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-property.component.html',
  styleUrls: ['./admin-property.component.css'] 
})



export default class AdminPropertyComponent implements OnInit {
  properties: any[] = [];
  propertyPhotoMap: Map<string, string> = new Map(); // Use a map to store property photos

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) {}

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
      // Assign base64 encoded image to propertyPhotoMap using property ID as key
      this.propertyPhotoMap.set(id, reader.result as string);
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }


  deleteproperty(id: string): void {
    if (confirm('Are you sure you want to delete this Property?')) {
      this.propertyService.deleteproperty(id)
        .subscribe(
          (response: any) => {
            console.log('Contact deleted successfully:', response);
            // Remove the deleted contact from the contacts array
            this.properties = this.properties.filter(properties => properties._id !== id);
          },
          (error: any) => {
            console.error('Error deleting properties:', error);
          }
        );
    }
  }

}
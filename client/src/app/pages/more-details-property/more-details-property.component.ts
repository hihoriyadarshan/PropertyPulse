import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-more-details-property',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './more-details-property.component.html',
  styleUrls: ['./more-details-property.component.css']
})
export default class MoreDetailsPropertyComponent implements OnInit {
  propertyId: string = ''; 
  propertyDetails: any;
  propertyPhotoMap: Map<string, string> = new Map(); 

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyId = params['id'];
      this.getPropertyDetails();
    });
  }

  getPropertyDetails() {
    this.propertyService.getPropertyById(this.propertyId).subscribe(
      (data: any) => {
        this.propertyDetails = data;
        // Fetch property photo once details are fetched
        this.getPropertyPhoto(this.propertyDetails._id);
      },
      (error: any) => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  getPropertyPhoto(id: string): void {
    this.propertyService.getPropertyPhoto(id).subscribe(
      (photoBlob: Blob) => {
        this.createImageFromBlob(photoBlob, id); 
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
}

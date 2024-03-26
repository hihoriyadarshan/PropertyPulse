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
  styleUrls: ['./admin-property.component.css'] // Use styleUrls instead of styleUrl
})

// export default class AdminPropertyComponent implements OnInit {
//   properties: any[] = [];
//   propertyPhoto: any; // Declare propertyPhoto

//   constructor(private propertyService: PropertyService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       const id = params['id'];
//       if (id) {
//         this.getPropertyPhoto(id);
//       }
//     });

//     this.getAllProperties();
//   }

//   getAllProperties(): void {
//     this.propertyService.getAllProperties().subscribe(
//       (response: any) => {
//         this.properties = response;
//         // Fetch photos for each property
//         this.properties.forEach(property => {
//           this.getPropertyPhoto(property._id);
//         });
//       },
//       (error: any) => {
//         console.error('Error fetching properties:', error);
//       }
//     );
//   }

//   getPropertyPhoto(id: string): void {
//     this.propertyService.getPropertyPhoto(id).subscribe(photo => {
//       // Find the property corresponding to the fetched photo
//       const property = this.properties.find(p => p._id === id);
//       if (property) {
//         this.createImageFromBlob(photo, property);
//       }
//     });
//   }

//   createImageFromBlob(image: Blob, property: any): void {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//       property.photo = reader.result;
//     }, false);
//     if (image) {
//       reader.readAsDataURL(image);
//     }
//   }
// }



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
}
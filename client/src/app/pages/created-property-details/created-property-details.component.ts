import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-created-property-details',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './created-property-details.component.html',
  styleUrl: './created-property-details.component.css'
})

// export default class CreatedPropertyDetailsComponent implements OnInit {
//   userProperties: any[] = [];
//   propertyPhotoMap: Map<string, string> = new Map(); // Use a map to store property photos

//   constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     const userId = localStorage.getItem('user_id');
//     if (userId) {
//       this.propertyService.getUserPropertyById(userId).subscribe({
//         next: (properties) => {
//           this.userProperties = properties;
//         },
//         error: (err) => {
//           console.error('Error fetching user_properties:', err);
//         }
//       });
//     } else {
//       console.error('User ID not found in localStorage');
//     }
//   }


//   getPropertyPhoto(id: string): void {
//     this.propertyService.getPropertyPhoto(id).subscribe(
//       (photoBlob: Blob) => {
//         this.createImageFromBlob(photoBlob, id); // Pass property ID to createImageFromBlob
//       },
//       (error: any) => {
//         console.error('Error fetching property photo:', error);
//       }
//     );
//   }

//   createImageFromBlob(image: Blob, id: string): void {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => {
//       // Assign base64 encoded image to propertyPhotoMap using property ID as key
//       this.propertyPhotoMap.set(id, reader.result as string);
//     }, false);
//     if (image) {
//       reader.readAsDataURL(image);
//     }
//   }




// }

export default class CreatedPropertyDetailsComponent implements OnInit {
  userProperties: any[] = [];
  propertyPhotoMap: Map<string, string> = new Map(); // Use a map to store property photos

  constructor(private propertyService: PropertyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.propertyService.getUserPropertyById(userId).subscribe({
        next: (properties) => {
          this.userProperties = properties;
          // Fetch photos for each property
          this.userProperties.forEach(property => {
            this.getPropertyPhoto(property._id);
          });
        },
        error: (err) => {
          console.error('Error fetching user_properties:', err);
        }
      });
    } else {
      console.error('User ID not found in localStorage');
    }
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
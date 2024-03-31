import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-created-property-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './created-property-details.component.html',
  styleUrl: './created-property-details.component.css'
})

// export default class CreatedPropertyDetailsComponent implements OnInit {
//   userProperty: any;

//   constructor(private propertyService: PropertyService) { }

//   ngOnInit(): void {
//     const userId = localStorage.getItem('user_id');
//     if (userId) {
//       this.propertyService.getUserPropertyById(userId).subscribe({
//         next: (properties) => {
//           this.userProperty = properties[0]; // Assuming only one property is fetched
//         },
//         error: (err) => {
//           console.error('Error fetching user_property:', err);
//         }
//       });
//     } else {
//       console.error('User ID not found in localStorage');
//     }
//   }
// }


export default class CreatedPropertyDetailsComponent implements OnInit {
  userProperties: any[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.propertyService.getUserPropertyById(userId).subscribe({
        next: (properties) => {
          this.userProperties = properties;
        },
        error: (err) => {
          console.error('Error fetching user_properties:', err);
        }
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }
}
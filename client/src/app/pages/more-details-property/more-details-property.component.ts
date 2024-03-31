import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-more-details-property',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './more-details-property.component.html',
  styleUrl: './more-details-property.component.css'
})
export default class MoreDetailsPropertyComponent implements OnInit {
  propertyId: string = ''; 
  propertyDetails: any;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.propertyId = params['id'];
      this.getPropertyDetails();
    });
  }

  getPropertyDetails() {
    this.propertyService.getPropertyById(this.propertyId)
      .subscribe(
        (data: any) => {
          this.propertyDetails = data;
        },
        (error: any) => {
          // Handle error
        }
      );
  }
}
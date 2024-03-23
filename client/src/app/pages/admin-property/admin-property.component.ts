import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-admin-property',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-property.component.html',
  styleUrl: './admin-property.component.css'
})
export default class AdminPropertyComponent implements OnInit{
  property: any[] = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.getAllproperty()
  }

  getAllproperty(): void {
    this.propertyService.getAllproperty()
      .subscribe(
        (response: any) => {
          this.property = response; // Assign response to contacts array
        },
        (error: any) => {
          console.error('Error fetching property:', error);
        }
      );
  }
}



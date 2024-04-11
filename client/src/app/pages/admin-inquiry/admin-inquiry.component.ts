import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InquiryService } from '../../services/inquiry.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-inquiry',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-inquiry.component.html',
  styleUrl: './admin-inquiry.component.css'
})
export default class AdminInquiryComponent implements OnInit {
  inquiry: any[] = [];
  isLoggedIn: boolean = false;

  constructor(private inquiryService: InquiryService,private authService: AuthService) { }

ngOnInit(): void {
  this.getAllInquiry();


    this.authService.isLoggedIn$.subscribe(res=>{
      this.isLoggedIn = this.authService.isLoggedIn();
     })

}

getAllInquiry(): void {
  this.inquiryService.getAllInquiry()
    .subscribe(
      (response: any) => {
        this.inquiry = response; 
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
}

}



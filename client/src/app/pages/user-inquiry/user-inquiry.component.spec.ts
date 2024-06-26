import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInquiryComponent } from './user-inquiry.component';

describe('UserInquiryComponent', () => {
  let component: UserInquiryComponent;
  let fixture: ComponentFixture<UserInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

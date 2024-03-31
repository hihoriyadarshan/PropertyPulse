import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedPropertyDetailsComponent } from './created-property-details.component';

describe('CreatedPropertyDetailsComponent', () => {
  let component: CreatedPropertyDetailsComponent;
  let fixture: ComponentFixture<CreatedPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedPropertyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

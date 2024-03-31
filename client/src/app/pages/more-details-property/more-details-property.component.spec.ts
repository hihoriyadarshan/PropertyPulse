import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailsPropertyComponent } from './more-details-property.component';

describe('MoreDetailsPropertyComponent', () => {
  let component: MoreDetailsPropertyComponent;
  let fixture: ComponentFixture<MoreDetailsPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoreDetailsPropertyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoreDetailsPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

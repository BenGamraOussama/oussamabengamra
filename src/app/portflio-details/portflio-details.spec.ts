import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortflioDetails } from './portflio-details';

describe('PortflioDetails', () => {
  let component: PortflioDetails;
  let fixture: ComponentFixture<PortflioDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortflioDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortflioDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

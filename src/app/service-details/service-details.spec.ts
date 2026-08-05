import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ServiceDetails } from './service-details';

describe('ServiceDetails', () => {
  let component: ServiceDetails;
  let fixture: ComponentFixture<ServiceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetails],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

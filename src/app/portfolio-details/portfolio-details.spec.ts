import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { PortfolioDetails } from './portfolio-details';

describe('PortfolioDetails', () => {
  let component: PortfolioDetails;
  let fixture: ComponentFixture<PortfolioDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDetails],
      providers: [provideZonelessChangeDetection(), provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsItExpandedLegalComponent } from './is-it-expanded-legal.component';

describe('IsItExpandedLegalComponent', () => {
  let component: IsItExpandedLegalComponent;
  let fixture: ComponentFixture<IsItExpandedLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsItExpandedLegalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsItExpandedLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

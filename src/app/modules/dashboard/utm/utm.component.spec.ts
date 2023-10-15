import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtmComponent } from './utm.component';

describe('UtmComponent', () => {
  let component: UtmComponent;
  let fixture: ComponentFixture<UtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

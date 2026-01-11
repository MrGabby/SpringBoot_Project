import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcropComponent } from './getcrop.component';

describe('GetcropComponent', () => {
  let component: GetcropComponent;
  let fixture: ComponentFixture<GetcropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetcropComponent]
    });
    fixture = TestBed.createComponent(GetcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcropComponent } from './postcrop.component';

describe('PostcropComponent', () => {
  let component: PostcropComponent;
  let fixture: ComponentFixture<PostcropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostcropComponent]
    });
    fixture = TestBed.createComponent(PostcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

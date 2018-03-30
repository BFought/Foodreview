import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreviewComponent } from './newreview.component';

describe('NewreviewComponent', () => {
  let component: NewreviewComponent;
  let fixture: ComponentFixture<NewreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

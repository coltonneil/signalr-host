import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureConnectionComponent } from './secure-connection.component';

describe('SecureConnectionComponent', () => {
  let component: SecureConnectionComponent;
  let fixture: ComponentFixture<SecureConnectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureConnectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTextSizeComponent } from './settings-text-size.component';

describe('SettingsTextSizeComponent', () => {
  let component: SettingsTextSizeComponent;
  let fixture: ComponentFixture<SettingsTextSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsTextSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsTextSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

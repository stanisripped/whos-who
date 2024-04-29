import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsVolumeComponent } from './settings-volume.component';

describe('SettingsVolumeComponent', () => {
  let component: SettingsVolumeComponent;
  let fixture: ComponentFixture<SettingsVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsVolumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

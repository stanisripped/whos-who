import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsQuestionTypeComponent } from './settings-question-type.component';

describe('SettingsQuestionTypeComponent', () => {
  let component: SettingsQuestionTypeComponent;
  let fixture: ComponentFixture<SettingsQuestionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsQuestionTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsQuestionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

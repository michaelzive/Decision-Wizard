import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardRouteSummaryComponent } from './wizard-route-summary.component';

describe('WizardRouteSummaryComponent', () => {
  let component: WizardRouteSummaryComponent;
  let fixture: ComponentFixture<WizardRouteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardRouteSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WizardRouteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Component, Input } from '@angular/core';
import { DecisionTreeStep } from '../../models/decision-tree.model';

@Component({
  selector: 'app-wizard-route-summary',
  imports: [CommonModule, MatCardModule],
  templateUrl: './wizard-route-summary.component.html',
  styleUrls: ['./wizard-route-summary.component.scss']
})
export class WizardRouteSummaryComponent {
  @Input() steps: DecisionTreeStep[] = [];
  @Input() answers: { [stepId: string]: any } = {};

  getKeys(obj: any): string[] {
    return Object.keys(obj ?? {});
  }
}

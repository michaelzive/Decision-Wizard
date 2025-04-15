import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DecisionTreeStep, DecisionTree } from '../../models/decision-tree.model';
import { DecisionEngineService } from '../../services/decision-engine.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { StepFormComponent } from "../step-form/step-form.component";
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { WizardRouteSummaryComponent } from '../wizard-route-summary/wizard-route-summary.component';

@Component({
  selector: 'app-wizard',
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonModule,
    StepFormComponent,
    WizardRouteSummaryComponent
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.scss'
})
export class WizardComponent implements OnInit, OnDestroy {
  visitedSteps: DecisionTreeStep[] = [];
  currentStep: DecisionTreeStep | null = null;
  answers: { [stepId: string]: any } = {};
  stepSub!: Subscription;

  constructor(
    private decisionEngine: DecisionEngineService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.stepSub = this.http.get<DecisionTree>('/js/decision-tree.json').subscribe(tree => {
      this.decisionEngine.loadTree(tree);

      this.decisionEngine.currentStep$.subscribe(step => {
        this.currentStep = step;
        this.visitedSteps = this.decisionEngine.getVisitedSteps();
        this.answers = this.decisionEngine.getAnswers();
      });
    });
  }

  ngOnDestroy(): void {
      this.stepSub?.unsubscribe();
  }

  onStepSubmit(stepId: string, data: any): void {
    this.decisionEngine.submitStepData(stepId, data);
  }

  reset(): void {
    this.decisionEngine.reset();
  }
}

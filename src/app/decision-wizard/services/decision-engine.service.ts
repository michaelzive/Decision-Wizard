import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DecisionTree, DecisionTreeStep } from '../models/decision-tree.model';

@Injectable({ providedIn: 'root' })
export class DecisionEngineService {
  private tree: DecisionTree = [];
  private stepsMap: Map<string, DecisionTreeStep> = new Map();
  private answers: { [stepId: string]: any } = {};
  private path: string[] = [];

  private currentStepSubject = new BehaviorSubject<DecisionTreeStep | null>(null);
  currentStep$ = this.currentStepSubject.asObservable();

  constructor() {}

  loadTree(tree: DecisionTree): void {
    this.tree = tree;
    this.stepsMap.clear();
    tree.forEach(step => this.stepsMap.set(step.id, step));
    this.path = [];

    const startStep = this.tree[0];
    if (startStep) {
      this.path.push(startStep.id);
      this.currentStepSubject.next(startStep);
    }
  }

  getCurrentStep(): DecisionTreeStep | null {
    return this.stepsMap.get(this.getCurrentStepId()) ?? null;
  }

  getCurrentStepId(): string {
    return this.path[this.path.length - 1];
  }

  getAnswers(): { [stepId: string]: any } {
    return this.answers;
  }

  submitStepData(stepId: string, data: any): void {
    this.answers[stepId] = data;

    const currentStep = this.stepsMap.get(stepId);
    if (!currentStep?.next) {
      return;
    }

    const branchingKey = Object.keys(data)[0]; // assuming 1 key determines branching
    const userAnswer = data[branchingKey];
    const nextStepId = currentStep.next[userAnswer];

    if (nextStepId && this.stepsMap.has(nextStepId)) {
      this.path.push(nextStepId);
      this.currentStepSubject.next(this.stepsMap.get(nextStepId)!);
    } else {
      // If next step is missing or undefined, mark as done
      this.currentStepSubject.next(null);
    }
  }

  reset(): void {
    this.answers = {};
    this.path = [];
    if (this.tree.length > 0) {
      this.path.push(this.tree[0].id);
      this.currentStepSubject.next(this.tree[0]);
    }
  }

  goBack(): void {
    if (this.path.length > 1) {
      this.path.pop();
      const prevStep = this.stepsMap.get(this.getCurrentStepId());
      this.currentStepSubject.next(prevStep ?? null);
    }
  }

  getVisitedSteps(): DecisionTreeStep[] {
    return this.path.map(id => this.stepsMap.get(id)!).filter(Boolean);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DecisionTree, DecisionTreeStep } from '../models/decision-tree.model';
import { Parser } from 'expr-eval';

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
    const currentIndex = this.path.indexOf(stepId);
    const stepChanged = JSON.stringify(this.answers[stepId]) !== JSON.stringify(data);
  
    // Update answer
    this.answers[stepId] = data;
  
    if (stepChanged) {
      // Remove downstream steps & answers
      const removedStepIds = this.path.slice(currentIndex + 1);
      for (const id of removedStepIds) {
        delete this.answers[id];
      }
      this.path = this.path.slice(0, currentIndex + 1);
    }
  
    // Resolve next step
    const currentStep = this.stepsMap.get(stepId);
    const nextStepId = this.resolveNextStep(currentStep, data);
  
    // Avoid adding duplicate or invalid next step
    if (nextStepId && this.stepsMap.has(nextStepId)) {
      if (!this.path.includes(nextStepId)) {
        this.path.push(nextStepId);
      }
      this.currentStepSubject.next(this.stepsMap.get(nextStepId)!);
    } else {
      this.currentStepSubject.next(null);
    }
  }

  private resolveNextStep(step: DecisionTreeStep | undefined, data: any): string | null {
    if (!step || !step.next) return null;
  
    const next = step.next as any;
  
    // Legacy format
    if (!next.rules) {
      const branchingKey = Object.keys(data)[0];
      const value = data[branchingKey];
      return next[value] ?? next["default"] ?? null;
    }
  
    const parser = new Parser();
  
    for (const rule of next.rules) {
      // Expression-based rule
      if (rule.expression) {
        try {
          const expr = parser.parse(rule.expression);
          if (expr.evaluate(data)) {
            return rule.next;
          }
        } catch (e) {
          console.warn(`Invalid expression in rule: ${rule.expression}`, e);
        }
      }
  
      // Simple equality rule (backward compatibility)
      if (rule.field && rule.value !== undefined && data[rule.field] === rule.value) {
        return rule.next;
      }
    }
  
    return next.default ?? null;
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

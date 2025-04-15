import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DecisionTreeStep } from '../../models/decision-tree.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule
  ],
  templateUrl: './step-form.component.html',
  styleUrl: './step-form.component.scss'
})
export class StepFormComponent  implements OnInit {
  @Input() step!: DecisionTreeStep;
  @Input() model: any = {};
  @Output() submitStep = new EventEmitter<any>();
  @Input() readonly = false;

  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  options: FormlyFormOptions = {};

  ngOnInit(): void {
    this.fields = this.step.fields.map(f => ({
      key: f.key,
      type: f.type,
      props: f.templateOptions,
      validators: f.validators,
      asyncValidators: f.asyncValidators,
      modelOptions: f.modelOptions,
    }));
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitStep.emit(this.form.value);
    }
  }
}

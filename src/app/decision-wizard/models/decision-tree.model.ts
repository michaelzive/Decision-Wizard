export type FieldType =
  | 'input'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | string;

export interface DecisionField {
  key: string;
  type: FieldType;
  templateOptions: {
    label: string;
    type?: string; // e.g., 'text', 'number', 'email', etc.
    required?: boolean;
    options?: Array<{ label: string; value: any }>; // for select/radio
    [key: string]: any;
  };
  validators?: { [key: string]: any };
  asyncValidators?: { [key: string]: any };
  modelOptions?: {
      debounce?: {
          default: number;
      };
      updateOn?: 'change' | 'blur' | 'submit';
  };
}

export interface StepNextMap {
  [value: string]: string; // e.g., 'finance' => 'step-2a'
}

export interface DecisionTreeStep {
  id: string;
  title: string;
  fields: DecisionField[];
  next?: StepNextMap;
  isOutcome?: boolean; // Optional: true if this is a leaf/final step
  outcomeMessage?: string; // Optional: display for final step
}

export interface DecisionRule {
  field?: string;
  value?: any;
  expression?: string;
  next: string;
}

export interface DecisionNextRules {
  rules: DecisionRule[];
  default?: string;
}


export type DecisionTree = DecisionTreeStep[];

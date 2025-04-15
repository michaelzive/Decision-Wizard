import { AbstractControl } from "@angular/forms";
import { mockAsyncEmailValidator } from "./app/decision-wizard/utils/form-utils";
import { ConfigOption } from "@ngx-formly/core";

export const formlyConfig: ConfigOption = {
    validationMessages: [
        { 
            name: 'emailTaken', 
            message: (_: any, field: any) => `"${field.formControl?.value}" is already taken – please choose another`, 
        },
        { name: 'required', message: 'This field is required.' },
    ],
    validators: [
        {
            name: 'uniqueEmail',
            validation: mockAsyncEmailValidator,
        },
    ],
}
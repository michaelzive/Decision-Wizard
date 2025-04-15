import { AbstractControl, ValidationErrors } from "@angular/forms";
import { of, delay, map, Observable } from "rxjs";

const usedEmails = ['test@example.com', 'john@doe.com'];

export function mockAsyncEmailValidator(control: AbstractControl) : Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(1000),
      map(value => {
        console.log('[Async Validator] Checking:', value);
        const isTaken = usedEmails.includes(value?.toLowerCase());
        return isTaken ? { emailTaken: true } : null;
      })
    );
}
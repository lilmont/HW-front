import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export const uniqueSessionNumberValidator: ValidatorFn = (formArray: AbstractControl): ValidationErrors | null => {
    if (!(formArray instanceof FormArray)) {
        return null;
    }

    const numbers = formArray.controls.map(control => control.get('number')?.value);
    const duplicates = numbers.filter((item, index) => numbers.indexOf(item) !== index);

    return duplicates.length > 0 ? { duplicateSessionNumber: true } : null;
};

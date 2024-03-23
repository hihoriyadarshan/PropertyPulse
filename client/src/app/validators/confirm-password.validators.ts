import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export const confirmPasswordValidator = (controlName: string, controlNameToMatch: string) => {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const controlToMatch = formGroup.get(controlNameToMatch);

        if (!control || !controlToMatch) {
            return null;
        }

        if (controlToMatch.errors && !controlToMatch.errors['confirmPasswordValidator']) {
            return null;
        }

        if (control.value !== controlToMatch.value) {
            controlToMatch.setErrors({ 'confirmPasswordValidator': true });
            return { 'confirmPasswordValidator': true };
        } else {
            controlToMatch.setErrors(null);
            return null;
        }
    };
};

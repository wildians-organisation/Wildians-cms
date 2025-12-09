import { NumberFieldSingleValidation } from "payload";


export const isInteger: NumberFieldSingleValidation = (value: number | null | undefined) => {
    if (value === undefined || value === null) {
        return 'This field is required';
    }

    if (!Number.isInteger(value)) {
        return 'This field must be an integer';
    }

    return true;
}
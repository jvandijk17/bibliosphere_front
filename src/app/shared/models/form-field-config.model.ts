export interface FormFieldConfig {
    name: string;
    label: string;
    type: string;
    options?: Array<{ value: string | number; label: string; }>;
    validators: { required: boolean }
}
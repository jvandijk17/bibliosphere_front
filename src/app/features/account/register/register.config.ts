export const ACCOUNT_FORM_CONFIG = [
    {
        name: 'first_name',
        label: 'First Name',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        validators: { required: true, email: true }
    },
    {
        name: 'address',
        label: 'Address',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'city',
        label: 'City',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'province',
        label: 'Province',
        type: 'text',
        validators: { required: true }
    },
    {
        name: 'postal_code',
        label: 'Postal Code',
        type: 'number',
        validators: { required: true }
    },
    {
        name: 'birth_date',
        label: 'Birth Date',
        type: 'date',
        validators: { required: true }
    },
    {
        name: 'library',
        label: 'Select a Library',
        type: 'select',
        options: [],
        validators: { required: true },
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        validators: { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/ }
    },
    {
        name: 'confirm_password',
        label: 'Confirm Password',
        type: 'password',
        validators: { required: true, mustMatch: 'password' }
    },
];
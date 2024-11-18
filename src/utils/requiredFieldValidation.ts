/* eslint-disable @typescript-eslint/no-explicit-any */
// Function to validate if a field is required
export default function requiredFieldValidation(
    value: any,
    message: string
): string {
    let validationMessage = ''
    if (!value) {
        validationMessage = message || 'Required'
    }
    return validationMessage
}

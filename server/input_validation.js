export default function validateInput (type, input) {
    const result = {isValid: true, error: ""};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{6,10}$/;
    const generalRegex = /^[a-zA-Z0-9 ]{3,}$/;
    const trimmedInput = typeof input === "string" ? input.trim() : input;

    switch (type.toLowerCase()) {
        case "username":
            if (!usernameRegex.test(trimmedInput)) {
                result.isValid = false;
                result.error = "Username must be 6-10 characters and can only contain lowercase letters, numbers, hyphens, and underscores";
            }
            break;
        case "password":
            if (!passwordRegex.test(trimmedInput)) {
                result.isValid = false;
                result.error = "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)";
            }
            break;

        default:
            if (!generalRegex.test(trimmedInput)) {
                result.isValid = false;
                result.error = "Input must have at least 3 characters and can only contain letters, numbers, or spaces";
            }
            break;
    }
    return result;
}
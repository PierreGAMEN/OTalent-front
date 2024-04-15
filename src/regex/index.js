import { toast } from 'react-toastify';

export function emailRegex(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error(
            "L'adresse email doit respecter la forme suivant : exemple@domaine.com"
        );
        return false;
    } else {
        return true;
    }
}

export function passwordRegex(password) {
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
        toast.error(
            'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial'
        );
        return false;
    } else {
        return true;
    }
}

export function confirmPasswordRegex(password, confirmPassword) {
    if (password !== confirmPassword) {
        toast.error('Les mots de passe ne correspondent pas');
        return false;
    } else {
        return true;
    }
}

export function isNeeded(attribute, elementToDisplayInToast) {
    if (!attribute) {
        toast.error(`${elementToDisplayInToast} est nécessaire`);
    } else {
        return true;
    }
}

export function postalCodeRegex(postalCode) {
    const postalCodeRegex =
        /^0[1-9]\d{3}|[1-8]\d{4}|9[0-6]\d{3}|9[78][12478]\d{2}$/;
    if (!postalCodeRegex.test(postalCode)) {
        toast.error('Le code postale doit contenir 5 chiffres et être valide');
        return false;
    } else {
        return true;
    }
}

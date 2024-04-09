import { toast } from "react-toastify";

export function emailRegex (email: string) 
{const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("L'adresse email doit respecter la forme suivant : exemple@domaine.com");
      return false;
    }}

export function passwordRegex (password: string) 
{const passwordRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!passwordRegex.test(password)) {
    toast.error("Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial");
    return false
  }
}

export function confirmPasswordRegex (password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
        toast.error("Les mots de passe ne correspondent pas");
        return false;
      }
}

export function isNeeded (attribute: string | number, elementToDisplayInToast : string) {
    if (!attribute){
        toast.error(`${elementToDisplayInToast} est nécessaire`);
    }
}
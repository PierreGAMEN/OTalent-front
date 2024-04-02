import React, { useState, FormEvent, ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { requestWithVariable } from "../../../utils";
import { queryAddOrganization } from "../../../query";

interface FormValues {
  raisonSociale: string;
  adresse: string;
  codePostal: string;
  ville: string;
  siret: string;
  email: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  urlSite: string;
}

export default function FormOrganization(): JSX.Element {
  const [formValues, setFormValues] = useState<FormValues>({
    raisonSociale: "",
    adresse: "",
    codePostal: "",
    ville: "",
    siret: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    urlSite: ""
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<boolean> => {
    e.preventDefault();
  
    if (
      !validateFormData(
        formValues.raisonSociale,
        formValues.adresse,
        formValues.codePostal,
        formValues.ville,
        formValues.email,
        formValues.telephone,
        formValues.siret,
        formValues.password,
        formValues.confirmPassword,
        formValues.urlSite
      )
    ) {
      return false;
    }
  
  
    const variables = {
      input: {
        name: formValues.raisonSociale,
        email: formValues.email,
        phoneNumber: formValues.telephone,
        password: formValues.password,
        address: formValues.adresse,
        city: formValues.ville,
        postalCode: formValues.codePostal,
        siret: formValues.siret,
        image: null,
        urlSite: formValues.urlSite,
      },
    };
  
    try {
      await requestWithVariable(queryAddOrganization, variables);
      toast.success("Le formulaire a été soumis avec succès !");
      return true;
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      return false;
    }
  };

  
  function validateFormData(raisonSociale: string, address: string, postalCode: string, city: string, email: string, phoneNumber: string, siret: string, password: string, confirmPassword: string, urlSite: string) {

    if (!raisonSociale) {
      toast.error("La raison sociale de l'entreprise est requise");
      return false
    }
    if (!address) {
      toast.error("L'adresse est requise");
      return false
    }

        const postalCodeRegex = /^\d{5}$/;
    if (!postalCodeRegex.test(postalCode)) {
      toast.error("Le code postal doit contenir 5 chiffres");
      return false;
    }

    if(!city) {
      toast.error("Une ville est nécessaire");
      return false;
    }

    const phoneNumberRegex = /^\d{10}$/;
    if(!phoneNumberRegex.test(phoneNumber)) {
      toast.error("Le numéro de téléphone doit contenir 10 chiffres");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("L'adresse email doit respecter la forme suivant : exemple@domaine.com");
      return false;
    }


    const siretRegex = /^\d{14}$/;
    if(!siretRegex.test(siret)) {
      toast.error("Le numéro de SIRET doit contenir 14 chiffres");
      return false;
    }
  
    
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z\d]{8,}$/;
    if(!passwordRegex.test(password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, sans caractère spéciale");
      return false
    }
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return false;
    }


    return true;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="raisonSociale">Raison sociale</label>
          <input
            required
            id="raisonSociale"
            name="raisonSociale"
            value={formValues.raisonSociale}
            onChange={handleChange}
            placeholder="Raison sociale"
          />
        </div>
        <div>
          <label htmlFor="adresse">Adresse</label>
          <input
            id="adresse"
            name="adresse"
            value={formValues.adresse}
            onChange={handleChange}
            placeholder="Adresse"
          />
        </div>
        <div>
          <label htmlFor="codePostal">Code postal</label>
          <input
            id="codePostal"
            name="codePostal"
            value={formValues.codePostal}
            onChange={handleChange}
            placeholder="Code postal"
          />
        </div>
        <div>
          <label htmlFor="ville">Ville</label>
          <input
            id="ville"
            name="ville"
            value={formValues.ville}
            onChange={handleChange}
            placeholder="Ville"
          />
        </div>
        <div>
          <label htmlFor="email">Adresse e-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="florian@exemple.com"
          />
        </div>
        <div>
          <label htmlFor="telephone">Téléphone</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formValues.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
          />
        </div>
        <div>
          <label htmlFor="siret">N° SIRET</label>
          <input
            id="siret"
            name="siret"
            value={formValues.siret}
            onChange={handleChange}
            placeholder="N° SIRET"
          />
        </div>
        <div>
          <label htmlFor="urlSite">URL de votre site</label>
          <input
            id="urlSite"
            name="urlSite"
            value={formValues.urlSite}
            onChange={handleChange}
            placeholder="Url de votre site"
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Mot de passe"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
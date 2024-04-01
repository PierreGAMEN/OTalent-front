import React, { useState, FormEvent, ChangeEventHandler } from "react";

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
    confirmPassword: ""
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    e
  ): void => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Insérer la logique de soumission du formulaire
    console.log("Form submitted:", formValues);
  };

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
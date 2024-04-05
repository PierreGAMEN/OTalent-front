import React, { useState, FormEvent, ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loginRequest, requestWithVariable } from "../../../utils";
import { queryAddOrganization, queryGetInformationSiret } from "../../../query";
import { Link } from "react-router-dom";



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

  const [siretInformation, setSiretInformation] = useState(null)
  const [step1, setStep1]= useState(true)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3]= useState(false)
  const [stepBienvenue, setStepBienvenue] = useState(false)

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
      },
    };

    if (formValues.urlSite.trim() !== '') {
      variables.input.urlSite = formValues.urlSite;
    }
  
    try {
       const response = await requestWithVariable(queryAddOrganization, variables);
      toast.success("Le formulaire a été soumis avec succès !");
      await login()
      setStepBienvenue(true)
      setStep3(false)
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
  
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if(!passwordRegex.test(password)) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial");
      return false
    }
    if (password !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return false;
    }
    
    return true;
  }
  

  const getInformationFromSiret = async () => {
    const siretRegex = /^\d{14}$/;
    if(!siretRegex.test(formValues.siret)) {
      toast.error("Le numéro de SIRET doit contenir 14 chiffres");
      return false;
    }
    const variables = {
      siret: formValues.siret
    }
    const response = await requestWithVariable(queryGetInformationSiret,variables)
    setSiretInformation(response)
    if(response && response.siret !== null) {
      setStep2(true)
      setStep1(false)
      setFormValues({ ...formValues, 
        raisonSociale: response.siret.name,
        adresse: response.siret.address,
        ville: response.siret.city,
        codePostal: response.siret.postalCode
       });
    }
  }

  const login = async () => {

    const variables = {
      email: formValues.email,
      password: formValues.password,
    };
    const logger = await loginRequest(variables)
    
  }


  return (
    <div>
    <form className="flex flex-col gap-2" >
  
        {step1 && <>
          <label className="input input-bordered flex items-center gap-2" htmlFor="siret">N° SIRET
          <input
            id="siret"
            name="siret"
            value={formValues.siret}
            onChange={handleChange}
            placeholder="N° SIRET"
          /></label>

          <button type="button" onClick={getInformationFromSiret} className="btn">Vérifier votre numéro SIRET</button>
          </> }

          {siretInformation && siretInformation.siret === null &&
           <p>Votre numéro de SIRET ne semble pas enregistré. Vous pouvez consulter ce site en cas de problème :  <a href="https://www.economie.gouv.fr/cedef/numero-siret"><i>economie.gouv</i></a></p>}

          {step2 &&
          <>
          <label className="input input-bordered flex items-center gap-2" htmlFor="raisonSociale">Raison sociale
          <input
            required
            id="raisonSociale"
            name="raisonSociale"
            value={formValues.raisonSociale}
            onChange={handleChange}
            placeholder="Raison sociale"
          /></label>


          <label className="input input-bordered flex items-center gap-2" htmlFor="adresse">Adresse
          <input
            id="adresse"
            name="adresse"
            value={formValues.adresse}
            onChange={handleChange}
            placeholder="Adresse"
          /></label>
     

          <label className="input input-bordered flex items-center gap-2" htmlFor="codePostal">Code postal
          <input
            id="codePostal"
            name="codePostal"
            value={formValues.codePostal}
            onChange={handleChange}
            placeholder="Code postal"
          /></label>


          <label className="input input-bordered flex items-center gap-2" htmlFor="ville">Ville
          <input
            id="ville"
            name="ville"
            value={formValues.ville}
            onChange={handleChange}
            placeholder="Ville"
          /></label>
          <button className="btn bg-green-600 text-white" type="button" onClick={() => {setStep3(true), setStep2(false)}}>Valider / Modifier les informations</button>
          </>}

          {step3 && <>
          <label className="input input-bordered flex items-center gap-2" htmlFor="email">Adresse e-mail
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="florian@exemple.com"
          /></label>


          <label className="input input-bordered flex items-center gap-2" htmlFor="telephone">Téléphone
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formValues.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
          /></label>


          <label className="input input-bordered flex items-center gap-2" htmlFor="urlSite">URL de votre site
          <input
            id="urlSite"
            name="urlSite"
            value={formValues.urlSite}
            onChange={handleChange}
            placeholder="Url de votre site"
          /></label>

          <label className="input input-bordered flex items-center gap-2" htmlFor="password">Mot de passe
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Mot de passe"
          /></label>

          <label className="input input-bordered flex items-center gap-2" htmlFor="confirmPassword">Confirmez votre mot de passe
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer"
          /></label>


        <button onClick={handleSubmit} className="btn bg-green-600 text-white" type="submit">Submit</button>
        </>}
      </form>
      {stepBienvenue && 
      <div>
        <h3>Merci pour votre inscription !</h3>
        <button onClick={() => {location.reload()}} className="btn">Continuer sur le site</button>
      </div>
      }
      </div>

  );
}
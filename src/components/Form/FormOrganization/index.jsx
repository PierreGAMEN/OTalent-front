import React, { useState, FormEvent, ChangeEventHandler } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRequest, requestWithVariable } from '../../../utils';
import { queryAddOrganization, queryGetInformationSiret } from '../../../query';
import ImageUpload from '../Upload';
import { useAppSelector } from '../../../store/redux-hook/hook';
import { getImageUpload } from '../../../store/actions/getImageUpload';

export default function FormOrganization() {
  const uploadImage = useAppSelector(state => state.idImage.id);
  const [formValues, setFormValues] = useState({
    raisonSociale: '',
    adresse: '',
    codePostal: '',
    ville: '',
    siret: '',
    email: '',
    telephone: '',
    password: '',
    confirmPassword: '',
    urlSite: '',
  });

  const [siretInformation, setsiretInformation] = useState(null);
  const [step1, setstep1] = useState(true);
  const [step2, setstep2] = useState(false);
  const [step3, setstep3] = useState(false);
  const [stepBienvenue, setstepBienvenue] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async e => {
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
        email: formValues.email.toLowerCase(),
        phoneNumber: formValues.telephone,
        password: formValues.password,
        address: formValues.adresse,
        city: formValues.ville,
        postalCode: formValues.codePostal,
        siret: formValues.siret,
        image: uploadImage,
      },
    };

    if (formValues.urlSite !== '') {
      variables.input.urlSite = formValues.urlSite;
    }

    try {
      const response = await requestWithVariable(
        queryAddOrganization,
        variables
      );
      const errorMessage = [
        "la valeur d'une clé dupliquée rompt la contrainte unique « organization_email_key ",
        'duplicate key value violates unique constraint « organization_email_key »',
        'This email is already used',
      ];
      if (
        response.errors &&
        errorMessage.includes(response.errors[0].message)
      ) {
        toast.error('Oups, votre adresse est déjà utilisée.');
        return false;
      }
      toast.success('Le formulaire a été soumis avec succès !');
      await login();
      setstepBienvenue(true);
      setstep3(false);
      dispatch(getImageUpload(''));
      return true;
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      return false;
    }
  };

  function validateFormData(
    raisonSociale,
    address,
    postalCode,
    city,
    email,
    phoneNumber,
    siret,
    password,
    confirmPassword,
    urlSite
  ) {
    if (!raisonSociale) {
      toast.error("La raison sociale de l'entreprise est requise");
      return false;
    }
    if (!address) {
      toast.error("L'adresse est requise");
      return false;
    }

    const postalCodeRegex = /^\d{5}$/;
    if (!postalCodeRegex.test(postalCode)) {
      toast.error('Le code postal doit contenir 5 chiffres');
      return false;
    }

    if (!city) {
      toast.error('Une ville est nécessaire');
      return false;
    }

    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      toast.error('Le numéro de téléphone doit contenir 10 chiffres');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(
        "L'adresse email doit respecter la forme suivant : exemple@domaine.com"
      );
      return false;
    }

    const siretRegex = /^\d{14}$/;
    if (!siretRegex.test(siret)) {
      toast.error('Le numéro de SIRET doit contenir 14 chiffres');
      return false;
    }

    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et un caractère spécial'
      );
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return false;
    }

    return true;
  }

  const getInformationFromSiret = async () => {
    const siretRegex = /^\d{14}$/;
    if (!siretRegex.test(formValues.siret.replace(/\s/g, ''))) {
      toast.error('Le numéro de SIRET doit contenir 14 chiffres');
      return false;
    }
    const variables = {
      siret: formValues.siret.replace(/\s/g, ''),
    };
    const responseWithError = await requestWithVariable(
      queryGetInformationSiret,
      variables
    );
    const response = responseWithError.data;
    setsiretInformation(response);
    if (response && response.siret !== null) {
      setstep2(true);
      setstep1(false);
      setFormValues({
        ...formValues,
        raisonSociale: response.siret.name,
        adresse: response.siret.address,
        ville: response.siret.city,
        codePostal: response.siret.postalCode,
      });
    }
  };

  const login = async () => {
    const variables = {
      email: formValues.email.toLowerCase(),
      password: formValues.password,
    };
    const logger = await loginRequest(variables);
  };

  return (
    <div>
      <form className="flex flex-col gap-2">
        {step1 && (
          <>
            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="siret"
            >
              <span className="material-symbols-rounded text-4xl">123</span>
              <input
                id="siret"
                name="siret"
                value={formValues.siret}
                onChange={handleChange}
                placeholder="N° SIRET"
                className="grow w-full"
              />
            </label>

            <button
              type="button"
              onClick={getInformationFromSiret}
              className="btn btn-success"
            >
              Vérifiez votre numéro SIRET
            </button>
          </>
        )}

        {siretInformation && siretInformation.siret === null && (
          <p>
            Votre numéro de SIRET ne semble pas enregistré. Vous pouvez
            consulter ce site en cas de problème :{' '}
            <a href="https://www.economie.gouv.fr/cedef/numero-siret">
              <i>economie.gouv</i>
            </a>
          </p>
        )}

        {step2 && (
          <>
            <label
              className="input input-bordered flex items-center gap-2 material"
              htmlFor="raisonSociale"
            >
              <span className="material-symbols-rounded text-2xl">store</span>
              <input
                required
                id="raisonSociale"
                name="raisonSociale"
                value={formValues.raisonSociale}
                onChange={handleChange}
                placeholder="Raison sociale"
                className="grow w-full"
              />
            </label>

            {/* 20006340200016 */}

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="adresse"
            >
              <span className="material-symbols-rounded text-2xl">
                home_pin
              </span>
              <input
                id="adresse"
                name="adresse"
                value={formValues.adresse}
                onChange={handleChange}
                placeholder="Adresse"
                className="grow w-full"
              />
            </label>

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="codePostal"
            >
              <span className="material-symbols-rounded text-2xl">map</span>
              <input
                id="codePostal"
                name="codePostal"
                value={formValues.codePostal}
                onChange={handleChange}
                placeholder="Code postal"
              />
            </label>

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="ville"
            >
              <span className="material-symbols-rounded text-2xl">
                location_on
              </span>
              <input
                id="ville"
                name="ville"
                value={formValues.ville}
                onChange={handleChange}
                placeholder="Ville"
                className="grow w-full"
              />
            </label>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => {
                setstep3(true), setstep2(false);
              }}
            >
              Valider / Modifier les informations
            </button>
          </>
        )}

        {step3 && (
          <>
            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="email"
            >
              <span className="material-symbols-rounded text-2xl">mail</span>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="florian@exemple.com"
                className="grow w-full"
              />
            </label>

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="telephone"
            >
              <span className="material-symbols-rounded text-2xl">
                smartphone
              </span>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formValues.telephone}
                onChange={handleChange}
                placeholder="Téléphone"
                className="grow w-full"
              />
            </label>

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="urlSite"
            >
              <span className="material-symbols-rounded text-2xl">link</span>
              <input
                id="urlSite"
                name="urlSite"
                value={formValues.urlSite}
                onChange={handleChange}
                placeholder="http://votre-societe.com"
                className="grow w-full"
              />
            </label>

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="password"
            >
              <span className="material-symbols-rounded text-2xl">key</span>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="grow w-full"
              />
            </label>

            <label
              className="input input-bordered flex items-center gap-2"
              htmlFor="confirmPassword"
            >
              <span className="material-symbols-rounded text-2xl">key</span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmez votre mot de passe"
                className="grow w-full"
              />
            </label>

            <ImageUpload />

            {uploadImage && (
              <button
                onClick={handleSubmit}
                className="btn btn-success"
                type="submit"
              >
                S'inscrire
              </button>
            )}
          </>
        )}
      </form>
      {stepBienvenue && (
        <div className="flex flex-col gap-5">
          <p>Merci pour votre inscription !</p>
          <button
            onClick={() => {
              location.reload();
            }}
            className="btn btn-success"
          >
            Continuer sur le site
          </button>
        </div>
      )}
    </div>
  );
}

function dispatch(arg0) {
  throw new Error('Function not implemented.');
}

import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import { requestWithVariable } from '../../../../utils';
import {
  queryDeleteOrganization,
  queryUpdateOrganizationInformation,
} from '../../../../query';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { toast } from 'react-toastify';
import ImageUpload from '../../../Form/Upload';

export default function HeaderOrganizationEditPage({ data }) {
  // Ajouter URLSITE + image

  const [isEdit, setIsEdit] = useState(false);
  const [raisonSocial, setRaisonSocial] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [seeding, setseeding] = useState(false);
  const imageId = useAppSelector(state => state.idImage.id);
  const modalRef = useRef(null);
  const user = useAppSelector(state => state.token.user);
  const [openModalAcceptDelete, setOpenModalAcceptDelete] = useState(false);
  const [descriptionIsEdit, setDescriptionIsEdit] = useState(false)

  const handleChange = (e, setter) => {
    const value = e.target.value;
    setter(value);
  };

  const seedingState = () => {
    setRaisonSocial(data.name || '');
    setEmail(data.email || '');
    setCity(data.city || '');
    setPostal_code(data.postal_code || '');
    setWebsite(data.url_site || '');
    setAddress(data.address || '');
    setDescription(data.description || '');
    setPhoneNumber(data.phone_number || '');
    setseeding(true);
  };

  const verifyInformation = () => {
    if (raisonSocial.trim() === '') {
      toast.error('Le champs raison sociale est vide');
      return false;
    }
    const regexEmail = /\S+@\S+\.\S+/;
    if (!regexEmail.test(email)) {
      toast.error(
        "L'email n'est pas conforme, veuillez respecter le modèle suivant nom@domaine.com"
      );
      return false;
    }
    if (city.trim() === '') {
      toast.error('Le champs ville est vide');
      return false;
    }
    if (address.trim() === '') {
      toast.error('Le champs adresse est vide');
      return false;
    }
    const regexPostalCode = /^\d{5}$/;
    if (!regexPostalCode.test(postal_code)) {
      toast.error('Le champs ville est vide');
      return false;
    }
    const regexPhoneNumber = /^\d{10}$/;
    if (!regexPhoneNumber.test(phoneNumber)) {
      toast.error('Le numéro de téléphone doit contenir 10 chiffres');
      return false;
    }
    const regexUrl = /^(https?|ftp):\/\/[^\s/$.?#]+(?:[^\s]*)$/;
    if (website) {
      if (!regexUrl.test(website)) {
        toast.error("L'url n'a pas le bon format, merci de respecter");
        return false;
      }
    }

    return true;
  };

  const updateOrganizationInformation = async e => {
    e.preventDefault();
    const check = verifyInformation();

    if (check) {
      const variables = {
        modifyOrganizationId: user.id,
        input: {
          name: raisonSocial,
          email: email.toLowerCase(),
          phoneNumber: phoneNumber,
          address: address,
          city: city,
          postalCode: postal_code,
          description: description,
        },
      };

      if (website) {
        variables.input.urlSite = website;
      }

      const response = await requestWithVariable(
        queryUpdateOrganizationInformation,
        variables
      );
      location.reload();
    }
  };

  const deleteOrganization = async () => {
    if (!openModalAcceptDelete) {
      return false;
    }
    const variables = {
      deleteOrganizationId: user.id,
    };
    const response = await requestWithVariable(
      queryDeleteOrganization,
      variables
    );
    if (response.data.deleteOrganization === true) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  useEffect(() => {
    if (data) {
      seedingState();
    }
  }, [data]);

  return (
    seeding && (
      <div className="relative sm:pr-5">
        <div className="hidden lg:inline-block h-40 w-full bg-primary-color absolute top-0"></div>
        <div className="flex flex-col items-center lg:flex-row">
          {isEdit && (
            <div className="p-10 flex flex-col md:flex-row md:justify-around items-start md:items-center">
              <dialog className="modal" open>
                <form className="modal-box overflow-auto">
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        store
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setRaisonSocial)}
                        type="text"
                        value={raisonSocial}
                        placeholder="Raison sociale"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        mail
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setEmail)}
                        type="email"
                        value={email}
                        placeholder="Email"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        home_pin
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setAddress)}
                        type="text"
                        value={address}
                        placeholder="Adresse"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        location_on
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setCity)}
                        type="text"
                        value={city}
                        placeholder="Ville"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        map
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setPostal_code)}
                        type="text"
                        value={postal_code}
                        placeholder="Code postal"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        link
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setWebsite)}
                        type="text"
                        value={website}
                        placeholder="Site web"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label className="input input-bordered flex border border-black items-center gap-2">
                      <span className="material-symbols-rounded text-2xl">
                        smartphone
                      </span>
                      <input
                        className="grow"
                        onChange={e => handleChange(e, setPhoneNumber)}
                        type="text"
                        value={phoneNumber}
                        placeholder="Téléphone"
                      />
                    </label>
                  </div>
                  
                  <ImageUpload />
                  <div className="mt-5 flex flex-col gap-2">
                    <button type="button"
                      className="btn btn-success"
                      onClick={updateOrganizationInformation}
                    >
                      Valider les modifications
                    </button>
                    <button type="button"
                      className="btn btn-outline btn-error"
                      onClick={() => setIsEdit(false)}
                    >
                      Quitter l'éditeur
                    </button>
                  </div>
                </form>
              </dialog>
            </div>
          )}
            <>
              <div></div>
              <div className="modal-box flex flex-col gap-3 max-h-min sm:items">
                <button
                  className="material-symbols-rounded absolute top-4 right-10"
                  aria-label="Modifier mes informations"
                  onClick={() => setIsEdit(true)}
                >
                  edit
                </button>

                <div className="rounded-full">
                  <img
                    className="object-cover h-48 w-60"
                    src={
                      data && data.image
                        ? `https://res.cloudinary.com/${
                            import.meta.env.VITE_CDNY_CLOUDNAME
                          }/image/upload/c_scale,w_780,h_780/v1/otalent/${
                            data.image
                          }`
                        : `https://res.cloudinary.com/${
                            import.meta.env.VITE_CDNY_CLOUDNAME
                          }/image/upload/c_scale,w_780,h_780/v1/otalent/yocggnbjzfjygu3naanv`
                    }
                    alt="Organization Image"
                  />
                </div>
                <p className="text-xl">{data ? data.name : ''}</p>
                <p className="flex items-center">
                  <span className="material-symbols-rounded mr-2">email</span>{' '}
                  {data ? data.email : ''}
                </p>
                <p className="flex items-center">
                  <span className="material-symbols-rounded mr-2">
                    location_on
                  </span>{' '}
                  {data ? data.address : ''}, {data ? data.city : ''}
                </p>
                <p className="flex items-center">
                  <span className="material-symbols-rounded mr-2">map</span>{' '}
                  {data ? data.postal_code : ''}
                </p>
                <p className="flex items-center">
                  <span className="material-symbols-rounded mr-2">
                    language
                  </span>{' '}
                  {data ? <a href={data.url_site}>{data.url_site}</a> : ''}
                </p>
                <p className="flex items-center">
                  <span className="material-symbols-rounded mr-2">phone</span>
                  {data ? data.phone_number : ''}
                </p>
                <div className="divider before:bg-primary-color after:bg-primary-color"></div>
                <button
                  onClick={() => {
                    setOpenModalAcceptDelete(true);
                  }}
                  className="btn btn-outline btn-error"
                >
                  Supprimer votre compte
                </button>
                {openModalAcceptDelete && (
                  <div className="mt-5 mb-5 flex flex-col">
                    <p className="mb-2">
                      Êtes-vous sur de vouloir supprimer votre compte ?
                    </p>
                    <div className="flex flex-row">
                      <button
                        type="button"
                        className="btn btn-error uppercase w-1/2"
                        onClick={deleteOrganization}
                      >
                        oui
                      </button>
                      <button
                        className="btn btn-info ml-2 uppercase w-1/2"
                        onClick={() => {
                          setOpenModalAcceptDelete(false);
                        }}
                      >
                        non
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {descriptionIsEdit && 
              <>
              <div className="p-10 flex flex-col md:flex-row md:justify-around items-start md:items-center">
              <dialog className="modal" open>
                <form className="modal-box overflow-auto">
                <div className="mt-4">
                    <label className="block text-gray-700">Description :</label>
                    <textarea
                      className="textarea textarea-bordered mt-1 block w-full h-24 mb-5 min-h-[150px]"
                      onChange={e => handleChange(e, setDescription)}
                      value={description}
                    />
                  </div>
                <button type="button"
                      className="btn btn-success w-full mb-3"
                      onClick={updateOrganizationInformation}
                    >
                      Valider les modifications
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline btn-error w-full"
                      onClick={() => setDescriptionIsEdit(false)}
                    >
                      Quitter l'éditeur
                    </button>
                    </form>
                    </dialog>
                    </div>
                </>}
              <div className="ml-3 p-10 mt-10 lg:text-base lg:ml-12 lg:mt-60 lg:w-1/2">
                <div className="flex justify-between">
                  <h4 className="mb-3">Votre Description :</h4>
                  <button
                    className="material-symbols-rounded"
                    aria-label="Modifier ma description"
                    onClick={() => setDescriptionIsEdit(true)}
                  >
                    edit
                  </button>
                </div>
                <p className="text-justify">{data ? data.description : ''}</p>
              </div>
            </>
        </div>
      </div>
    )
  );
}

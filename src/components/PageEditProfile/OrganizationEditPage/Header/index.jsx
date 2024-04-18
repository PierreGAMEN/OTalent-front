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
    const imageId = useAppSelector((state) => state.idImage.id);
    const modalRef = useRef(null);
    const user = useAppSelector((state) => state.token.user);
    const [openModalAcceptDelete, setOpenModalAcceptDelete] = useState(false);

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

    const updateOrganizationInformation = async (e) => {
        e.preventDefault()
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
                    urlSite: website,
                },
            };

            const response = await requestWithVariable(
                queryUpdateOrganizationInformation,
                variables
            );
            // location.reload();
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

    useEffect(() => {
        if (isEdit && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [isEdit]);

    return (
        seeding && (
            <div className="relative pr-5">
                <div className="hidden lg:inline-block h-40 w-full bg-primary-color absolute top-0"></div>
                <div className="flex flex-col items-center lg:flex-row">
                    {isEdit ? (
                        <div className="p-10 flex flex-col md:flex-row md:justify-around items-start md:items-center">
                            <dialog className="modal" ref={modalRef}>
                                <form className="modal-box overflow-auto">
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>store</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setRaisonSocial
                                                    )
                                                }
                                                type="text"
                                                value={raisonSocial}
                                                placeholder='Raison sociale'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>mail</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(e, setEmail)
                                                }
                                                type="email"
                                                value={email}
                                                placeholder='Email'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>home_pin</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(e, setAddress)
                                                }
                                                type="text"
                                                value={address}
                                                placeholder='Adresse'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>location_on</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(e, setCity)
                                                }
                                                type="text"
                                                value={city}
                                                placeholder='Ville'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>map</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setPostal_code
                                                    )
                                                }
                                                type="text"
                                                value={postal_code}
                                                placeholder='Code postal'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>link</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(e, setWebsite)
                                                }
                                                type="text"
                                                value={website}
                                                placeholder='Site web'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="input input-bordered flex border border-black items-center gap-2">
                                        <span className='material-symbols-rounded text-2xl'>smartphone</span>
                                            <input
                                                className="grow"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setPhoneNumber
                                                    )
                                                }
                                                type="text"
                                                value={phoneNumber}
                                                placeholder='Téléphone'
                                            />
                                        </label>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-gray-700">
                                            Description :
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered mt-1 block w-full h-24 mb-5"
                                            onChange={(e) =>
                                                handleChange(e, setDescription)
                                            }
                                            value={description}
                                        />
                                    </div>
                                    <ImageUpload />
                                    <div className="mt-5">
                                        <button
                                                className="btn bg-green-600 text-white hover:bg-green-500 w-full mb-2"
                                                onClick={
                                                    updateOrganizationInformation
                                                }>
                                                Valider les changements
                                        </button>
                                        <button
                                            className="btn bg-grey w-full"
                                            onClick={() => setIsEdit(false)}>
                                            Quitter le mode edit
                                        </button>
                                       
                                
                                    </div>
                                </form>
                            </dialog>
                        </div>
                    ) : (
                        <>
                            <div></div>
                            <div className="modal-box flex flex-col items-center gap-3">
                                <button
                                    className="material-symbols-rounded absolute top-4 right-10"
                                    aria-label="Modifier mes informations"
                                    onClick={() => setIsEdit(true)}>
                                    edit
                                </button>

                                <div className="rounded-full">
                                    <img
                                        className="object-cover h-48 w-60"
                                        src={
                                            data && data.image
                                                ? `https://res.cloudinary.com/${
                                                      import.meta.env
                                                          .VITE_CDNY_CLOUDNAME
                                                  }/image/upload/c_scale,w_780,h_780/v1/otalent/${
                                                      data.image
                                                  }`
                                                : `https://res.cloudinary.com/${
                                                      import.meta.env
                                                          .VITE_CDNY_CLOUDNAME
                                                  }/image/upload/c_scale,w_780,h_780/v1/otalent/yocggnbjzfjygu3naanv`
                                        }
                                        alt="Organization Image"
                                    />
                                </div>
                                <p className="text-xl">
                                    {data ? data.name : ''}
                                </p>
                                <p className="flex items-center">
                                    <span className="material-symbols-rounded mr-2">
                                        email
                                    </span>{' '}
                                    {data ? data.email : ''}
                                </p>
                                <p className="flex items-center">
                                    <span className="material-symbols-rounded mr-2">
                                        location_on
                                    </span>{' '}
                                    {data ? data.address : ''},{' '}
                                    {data ? data.city : ''}
                                </p>
                                <p className="flex items-center">
                                    <span className="material-symbols-rounded mr-2">
                                        map
                                    </span>{' '}
                                    {data ? data.postal_code : ''}
                                </p>
                                <p className="flex items-center">
                                    <span className="material-symbols-rounded mr-2">
                                        language
                                    </span>{' '}
                                    {data ? (
                                        <a href={data.url_site}>
                                            {data.url_site}
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                </p>
                                <p className="flex items-center">
                                    <span className="material-symbols-rounded mr-2">
                                        phone
                                    </span>
                                    {data ? data.phone_number : ''}
                                </p>
                                <div className="divider before:bg-primary-color after:bg-primary-color"></div>
                                <button
                                    onClick={() => {
                                        setOpenModalAcceptDelete(true);
                                    }}
                                    className="btn bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
                                    Supprimer votre compte
                                </button>
                                {openModalAcceptDelete && (
                                    <div className="">
                                        <p>
                                            Voulez vous vraiment supprimer votre
                                            compte ?
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                className="btn bg-white text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                                                onClick={deleteOrganization}>
                                                OUI
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    setOpenModalAcceptDelete(
                                                        false
                                                    );
                                                }}>
                                                NON
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="ml-3 p-10 mt-10 text-2xl lg:text-base lg:ml-12 lg:mt-60 lg:w-1/2">
                                <div className="flex justify-between">
                                    <h4 className="mb-3">
                                        Votre Description :
                                    </h4>
                                    <button
                                        className="material-symbols-rounded"
                                        aria-label="Modifier ma description"
                                        onClick={() => setIsEdit(true)}>
                                        edit
                                    </button>
                                </div>
                                <p className="text-justify">
                                    {data ? data.description : ''}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        )
    );
}

import { useEffect, useState } from 'react';
import './style.scss';
import { requestWithVariable } from '../../../../utils';
import { queryUpdateOrganizationInformation } from '../../../../query';
import { useAppSelector } from '../../../../store/redux-hook/hook';
import { toast } from 'react-toastify';
import ImageUpload from '../../../Form/Upload';
import { useRef } from 'react';

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
    const [seeding, setSeeding] = useState(false);
    const imageId = useAppSelector(state => state.idImage.id);
    const modalRef = useRef(null);

    const user = useAppSelector(state => state.token.user);

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
        setSeeding(true);
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

    const updateOrganizationInformation = async () => {
        const check = verifyInformation();
        if (check) {
            const variables = {
                modifyOrganizationId: user.id,
                input: {
                    name: raisonSocial,
                    email: email,
                    phoneNumber: phoneNumber,
                    address: address,
                    city: city,
                    postalCode: postal_code,
                    description: description,
                    urlSite: website,
                    description: description,
                    urlSite: website,
                },
            };

            if (imageId) {
                variables.input.image = imageId;
            }

            const response = await requestWithVariable(
                queryUpdateOrganizationInformation,
                variables
            );
            location.reload();
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
            <div className="p-10 md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center gap-5">
                    <img
                        className=""
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
                        alt=""
                    />

                    <div className="flex flex-col w-full md:w-auto">
                        <div className="flex gap-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setIsEdit(true);
                                    if (modalRef.current) {
                                        modalRef.current.showModal();
                                    }
                                }}
                            >
                                Modifier mes informations
                            </button>
                        </div>
                        {isEdit ? (
                            <>
                                <dialog className="modal" ref={modalRef}>
                                    <div className="modal-box overflow-auto">
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Nom :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(
                                                        e,
                                                        setRaisonSocial
                                                    )
                                                }
                                                type="text"
                                                value={raisonSocial}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Email :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(e, setEmail)
                                                }
                                                type="email"
                                                value={email}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Adresse :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(e, setAddress)
                                                }
                                                type="text"
                                                value={address}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Ville :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(e, setCity)
                                                }
                                                type="text"
                                                value={city}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Code postal :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(
                                                        e,
                                                        setPostal_code
                                                    )
                                                }
                                                type="text"
                                                value={postal_code}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Site Web :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(e, setWebsite)
                                                }
                                                type="text"
                                                value={website}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                N° de téléphone :
                                            </label>
                                            <input
                                                className="input input-border mt-1 block w-full border border-black p-3"
                                                onChange={e =>
                                                    handleChange(
                                                        e,
                                                        setPhoneNumber
                                                    )
                                                }
                                                type="text"
                                                value={phoneNumber}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-700">
                                                Description :
                                            </label>
                                            <textarea
                                                className="textarea textarea-bordered mt-1 block w-full h-24 mb-5"
                                                onChange={e =>
                                                    handleChange(
                                                        e,
                                                        setDescription
                                                    )
                                                }
                                                value={description}
                                            />
                                        </div>
                                        <ImageUpload />
                                        <div className="flex justify-between mt-5">
                                            <button
                                                className="btn bg-grey"
                                                onClick={() => setIsEdit(false)}
                                            >
                                                Quitter le mode edit
                                            </button>
                                            {isEdit && (
                                                <button
                                                    className="btn bg-green-600 text-white hover:bg-green-500"
                                                    onClick={
                                                        updateOrganizationInformation
                                                    }
                                                >
                                                    Valider les changements
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </dialog>
                            </>
                        ) : (
                            <div className="p-5 modal-box flex flex-col gap-2 border-primary-color border">
                                <p className="">Nom: {data ? data.name : ''}</p>
                                <p>Email: {data ? data.email : ''}</p>
                                <p>Adresse: {data ? data.address : ''}</p>
                                <p>Ville: {data ? data.city : ''}</p>
                                <p>
                                    Code postal: {data ? data.postal_code : ''}
                                </p>
                                <p>
                                    Site Web:{' '}
                                    {data ? (
                                        <a href={data.url_site}>
                                            {data.url_site}
                                        </a>
                                    ) : (
                                        ''
                                    )}
                                </p>
                                <p>
                                    N° de téléphone:{' '}
                                    {data ? data.phone_number : ''}
                                </p>
                                <p>
                                    Description: {data ? data.description : ''}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}

import React, { useState } from 'react';
import { requestWithVariable } from '../../../utils';
import { querySendEmailToRecoverPassword } from '../../../query';
import { toast } from 'react-toastify';

export const ForgottenPassword = () => {
    const [email, setEmail] = useState('');
    const [sendEmailSucces, setSendEmailSucces] = useState(false)

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        setEmail(value);
    };

    const sendEmailToRecoverPassword = async (e) => {
        e.preventDefault();
        const variables = {
            input: {
                email: email.toLowerCase(),
            },
        };

        const response = await requestWithVariable(
            querySendEmailToRecoverPassword,
            variables
        );
        if (response.data.requestPasswordReset === null) {
            toast.error(
                "Nous n'avons pas pu retrouvé votre email en base de données"
            );
        } else {
          toast.success("Un email vous a été envoyé afin de changer votre mot de passe.")
          setSendEmailSucces(true)  
        }

    };

    return (
        <>
        {!sendEmailSucces && <form action="">
            <label
                className="input input-bordered flex items-center gap-4"
                htmlFor="">
                Email:
                <input onChange={handleChange} type="email" value={email} />
            </label>
            <button
                className="btn mb-5 mt-5 bg-blue-600 text-white"
                onClick={sendEmailToRecoverPassword}>
                Envoyez un email de récupération
            </button>
        </form>}
        {sendEmailSucces && <div className='mt-3 mb-3'>Votre demande a bien été prise en compte</div>}
        </>
    );
};

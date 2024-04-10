import { useState } from 'react';
import { loginRequest } from '../../../../utils';
import FormPage from '../../../Form';
import { ForgottenPassword } from '../../../Form/ForgottenPassword';

/**
 * Render the connection modal component
 */
export default function ConnectionFormModal() {
    // Define state variables
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongAuthentification, setWrongAuthentification] = useState(false);
    const [openSignupForm, setOpenSignupForm] = useState(false);
    const [openConnexionForm, setOpenConnexionForm] = useState(true);
    const [openForgottenPassword, setOpenForgottenPassword] = useState(false);

    // Define openModal function
    const openModal = () => {
        setIsOpen(true);
    };

    // Define closeModal function
    const closeModal = () => {
        setIsOpen(false);
        setWrongAuthentification(false);
        setOpenSignupForm(false);
        setOpenConnexionForm(true);
        setOpenForgottenPassword(false);
    };

    // Define handleChangeEmail function
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
    };

    // Define handleChangePassword function
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
    };

    // Define login function
    const login = async () => {
        const variables = {
            email: email,
            password: password,
        };

        const logger = await loginRequest(variables);
        if (logger.errors) {
            setWrongAuthentification(true);
        } else if (logger.data) {
            setWrongAuthentification(false);
            location.reload();
        }
    };

    return (
        <>
            <button className="btn" onClick={openModal}>
                Se connecter
            </button>
            {isOpen && (
                <dialog className="modal" open>
                    <div className="modal-box">
                        <h4>Bienvenue chez O'Talent !</h4>
                        <div className="divider"></div>
                        <div className="flex flex-col w-full border-opacity-50">
                            {openConnexionForm && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        <form
                                            onSubmit={e => {
                                                e.preventDefault();
                                                login();
                                            }}
                                            className="flex flex-col gap-2"
                                        >
                                            <label className="input input-bordered flex items-center gap-2">
                                                <span className="material-symbols-rounded">
                                                    mail
                                                </span>
                                                <input
                                                    type="text"
                                                    className="grow"
                                                    placeholder="Email"
                                                    value={email}
                                                    onChange={handleChangeEmail}
                                                />
                                            </label>
                                            <label className="input input-bordered flex items-center gap-2">
                                                <span className="material-symbols-rounded">
                                                    key
                                                </span>
                                                <input
                                                    type="password"
                                                    className="grow"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={
                                                        handleChangePassword
                                                    }
                                                />
                                            </label>
                                            <button
                                                type="submit"
                                                className="btn bg-green-600 text-white w-full"
                                            >
                                                Se connecter
                                            </button>
                                            {wrongAuthentification && (
                                                <div>
                                                    L'identifiant est incorrect
                                                </div>
                                            )}
                                        </form>
                                        <button
                                            onClick={() => {
                                                setOpenForgottenPassword(true);
                                                setOpenConnexionForm(false);
                                            }}
                                        >
                                            Mot de passe oublié ?
                                        </button>
                                    </div>
                                    <div className="divider">OU</div>
                                    <button
                                        onClick={() => {
                                            setOpenSignupForm(true);
                                            setOpenConnexionForm(false);
                                        }}
                                        className="btn bg-blue-600 text-white"
                                    >
                                        S'inscrire
                                    </button>
                                </div>
                            )}
                            {openSignupForm && <FormPage />}
                            {openForgottenPassword && (
                                <>
                                    <ForgottenPassword />
                                    <button
                                        onClick={() => {
                                            setOpenForgottenPassword(false);
                                            setOpenConnexionForm(true);
                                        }}
                                        className="btn"
                                    >
                                        Revenir à la page de connexion
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={closeModal}>
                                    Fermer
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}

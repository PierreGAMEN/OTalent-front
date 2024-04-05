import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/redux-hook/hook'
import { getStateModalForm } from '../../../../store/actions/modalActions'
import { loginRequest } from '../../../../utils';
import { Link, NavLink } from 'react-router-dom';
import FormPage from '../../../Form';
import { ForgottenPassword } from '../../../Form/ForgottenPassword';
 

export default function NewModalConnexion() {

    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [wrongAuthentification, setWrongAuthentification] = useState(false);
    const [openSignupForm, setOpenSignupForm] = useState(false)
    const [openConnexionForm, setOpenConnexionForm] = useState(true)
    const [openForgottenPassword, setOpenForgottenPassword] = useState(false)

    const dispatch = useAppDispatch()

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setWrongAuthentification(false)
        setOpenSignupForm(false)
        setOpenConnexionForm(true)
        setOpenForgottenPassword(false)
    };


    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setEmail(value)
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
    }

    const login = async () => {

      const variables = {
        email: email,
        password: password,
      };

      const logger = await loginRequest(variables)
      if(logger.errors) {
        setWrongAuthentification(true)
      } else if (logger.data) {
        setWrongAuthentification(false)
        location.reload();
      }
    }


    return (
        <>
            <button className="btn" onClick={openModal}>Se connecter</button>
            {isOpen && (
                <dialog className="modal" open>
                    <div className="modal-box">
                        <h4>Bienvenue chez O'Talent !</h4>
                        <div className='divider'></div>
                      
                        <div className="flex flex-col w-full border-opacity-50">
                        {openConnexionForm && <>
                            <div className='flex flex-col gap-4'>
                                <label className="input input-bordered flex items-center gap-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                    <input 
                                        type="text" 
                                        className="grow" 
                                        placeholder="Email"
                                        value={email}
                                        onChange={handleChangeEmail} />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                    <input 
                                        type="password" 
                                        className="grow" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={handleChangePassword} />
                                </label>
                                <button className="btn bg-green-600 text-white" onClick={login}>Se connecter</button>
                                {wrongAuthentification && <div>L'identifiant est incorrect</div>}
                                <button onClick = {()=> {setOpenForgottenPassword(true); setOpenConnexionForm(false)}}>Mot de passe oublié ?</button>
                            </div>
                            <div className="divider">OU</div>
                            <button onClick={() => {setOpenSignupForm(true); setOpenConnexionForm(false)}} className="btn bg-blue-600 text-white">S'inscrire</button>
                            </>}
                            {openSignupForm && <FormPage />}
                            {openForgottenPassword && <><ForgottenPassword/>
                            <button onClick={() => {setOpenForgottenPassword(false); setOpenConnexionForm(true)}} className='btn'>Revenir à la page de connexion</button></>}
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={closeModal}>Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}
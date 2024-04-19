import React, { useState, useEffect } from 'react';
import { changePassword, requestWithVariable } from '../../utils';
import { toast } from 'react-toastify';
import { querySendNewPassword, queryPrankTrainings } from '../../query';
import TrainingCard from '../HomePage/TrainingCard';
import { confirmPasswordRegex, passwordRegex } from '../../regex';
import Security from '/public/assets/Security On-bro';

const ResetPassword = () => {
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [trainingPrank, setTrainingPrank] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [buttonToAccesFormConnection, setButtonToAccesFormConnection] =
        useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const handleChange = (e, setter) => {
        const value = e.target.value;
        setter(value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateValueOfNewPassword()) {
            return false;
        }
        const variables = {
            updatedPassword: newPassword,
        };

        const response = await changePassword(
            querySendNewPassword,
            variables,
            token
        );
        if (response.data) {
            toast.success('Votre mot de passe a bien été modifié.');
        }
        setButtonToAccesFormConnection(true);
    };

    const getPrankTrainings = async () => {
        const variable = {
            trainingId: 120,
            trainingId2: 121,
        };
        setIsLoading(false);
        const response = await requestWithVariable(
            queryPrankTrainings,
            variable
        );
        setIsLoading(true);
        setTrainingPrank(response);
    };

    const validateValueOfNewPassword = () => {
        if (!passwordRegex(newPassword)) {
            return false;
        }
        if (!confirmPasswordRegex(newPassword, confirmNewPassword)) {
            return false;
        }
        return true;
    };

    if (!token) {
        return (
            <div className="flex justify-center">
                <div className="modal-box">
                    <h4>
                        Il semblerait que vous essayez d'accéder à un endroit
                        secret...
                    </h4>
                    <div><Security/></div>
                    <div className="divider"></div>
                    <div className="flex justify-center">
                        <a href="/" className="btn bg-green-600 text-white">
                            Retour sur la page d'accueil
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        getPrankTrainings();
    }, []);
    return (
        <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-full">
                {!buttonToAccesFormConnection && (
                    <form className="modal-box">
                    <h4 className='text-xl md:text-3xl'>Vous avez oublié votre mot de passe ?</h4>
                    <div className="divider"></div>
                    <div className="flex justify-center mb-5">
                        {/* Input pour le nouveau mot de passe */}
                        <input
                            className="input input-bordered text-center"
                            type="password"
                            placeholder="Nouveau mot de passe"
                            onFocus={(e) => e.target.placeholder = ''}
                            onBlur={(e) => e.target.placeholder = 'Nouveau mot de passe'}
                            onChange={(e) => {
                                handleChange(e, setPassword);
                            }}
                            value={newPassword}
                        />
                    </div>
                    <div className="flex justify-center mb-5">
                        <input
                            className="input input-bordered text-center"
                            type="password"
                            placeholder="Confirmez le nouveau mot de passe"
                            onFocus={(e) => e.target.placeholder = ''}
                            onBlur={(e) => e.target.placeholder = 'Confirmez le nouveau mot de passe'}
                            onChange={(e) => {
                                handleChange(e, setConfirmNewPassword);
                            }}
                            value={confirmNewPassword}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="btn bg-green-600 text-white">
                            Changer votre mot de passe
                        </button>
                    </div>
                </form>
                )}
                {buttonToAccesFormConnection && (
                    <div className="modal-box">
                        <p>
                            Votre mot de passe a bien été modifié, vous pouvez
                            désormais vous connecter avec votre nouveau mot de
                            passe !
                        </p>
                       
                    </div>
                )}
                <div className="divider"></div>
                {isLoading && (
                    <>
                        <h4 className="text-xl md:text-3xl mb-5  text-center">
                            Pour éviter que celà recommence, O'Talent vous
                            recommande...
                        </h4>
                        <div className="flex flex-col md:flex-row gap-5 mb-5">
                            <TrainingCard
                                key={trainingPrank.data.training1.id}
                                dateCreated={
                                    trainingPrank.data.training1.created_at
                                }
                                organizationId={
                                    trainingPrank.data.training1.organization.id
                                }
                                trainingId={trainingPrank.data.training1.id}
                                label={trainingPrank.data.training1.label}
                                duration={trainingPrank.data.training1.duration}
                                price={trainingPrank.data.training1.price}
                                organization={
                                    trainingPrank.data.training1.organization
                                        .name
                                }
                                category={
                                    trainingPrank.data.training1.category.label
                                }
                                image={trainingPrank.data.training1.image}
                                categoryId={
                                    trainingPrank.data.training1.category.id
                                }
                                reviews={trainingPrank.data.training1.reviews}
                            />
                            <TrainingCard
                                key={trainingPrank.data.training2.id}
                                dateCreated={
                                    trainingPrank.data.training2.created_at
                                }
                                organizationId={
                                    trainingPrank.data.training2.organization.id
                                }
                                trainingId={trainingPrank.data.training2.id}
                                label={trainingPrank.data.training2.label}
                                duration={trainingPrank.data.training2.duration}
                                price={trainingPrank.data.training2.price}
                                organization={
                                    trainingPrank.data.training2.organization
                                        .name
                                }
                                category={
                                    trainingPrank.data.training2.category.label
                                }
                                image={trainingPrank.data.training2.image}
                                categoryId={
                                    trainingPrank.data.training2.category.id
                                }
                                reviews={trainingPrank.data.training2.reviews}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;

import { ChangeEvent, useState, useEffect } from 'react';
import { changePassword, requestWithVariable } from '../../utils';
import { toast } from 'react-toastify';
import { querySendNewPassword, queryPrankTrainings } from '../../query';
import TrainingCard from '../HomePage/TrainingCard';

const ResetPassword = () => {
    const [newPassword, setPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [trainingPrank, setTrainingPrank] = useState({}) 
    const [isLoading, setIsLoading] = useState(false);
    const [buttonToAccesFormConnection, setButtonToAccesFormConnection] =
        useState(false);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const handleChange = (e: ChangeEvent<HTMLInputElement>, setter) => {
        const value = e.target.value;
        setter(value);
    };
    const handleSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        passwordAreSimilar();
        const variables = {
            updatedPassword: newPassword,
        };
        await changePassword(querySendNewPassword, variables, token);
        setButtonToAccesFormConnection(true);
    };

    const getPrankTrainings = async () => {
        const variable = {
            trainingId: 120,
            trainingId2: 121
        }
        setIsLoading(false)
        const response = await requestWithVariable(queryPrankTrainings, variable)
        setIsLoading(true)
        setTrainingPrank(response)
    }
    
    const passwordAreSimilar = () => {
        if (newPassword === confirmNewPassword) {
            return true;
        } else {
            toast.error('Les mots de passe ne correspondent pas');
            return false;
        }
    };
    
    if (!token) {
        return (
            <div className='flex justify-center'>

                <div className='modal-box'>
                    <h4>Il semblerait que vous essayez d'accéder à un endroit secret...</h4>
                    <div className='divider'></div>
                    <div className='flex justify-center'>
                    <a 
                        href='/'
                        className="btn bg-green-600 text-white"
                        >
                        Retour sur la page d'accueil
                        </a>
                    </div>
                </div>

            </div>
        )
    }

    useEffect(() => {
        getPrankTrainings()
    }, [])
    return (
        <div className='flex justify-center'>
        <div className='flex flex-col items-center'>
            {!buttonToAccesFormConnection && (
                <form className="modal-box">
                    <h4>Vous avez oublié votre mot de passe ?</h4>
                    <div className="divider"></div>
                    <label
                        className="input input-bordered flex items-center gap-4 mb-5"
                        htmlFor=""
                        >
                        Mot de passe :
                        <input
                            className=""
                            onChange={e => {
                                handleChange(e, setPassword);
                            }}
                            type="password"
                            value={newPassword}
                        />
                    </label>
                    <label
                        className="input input-bordered flex items-center gap-4 mb-5"
                        htmlFor=""
                        >
                        Confirmer votre mot de passe :
                        <input
                            onChange={e => {
                                handleChange(e, setConfirmNewPassword);
                            }}
                            type="password"
                            value={confirmNewPassword}
                            />
                    </label>
                    <div className='flex justify-center'>
                    <button
                        onClick={handleSubmit}
                        className="btn bg-green-600 text-white"
                        >
                        Changer votre mot de passe
                    </button>
                    </div>
                </form>
            )}
            {buttonToAccesFormConnection && (
                <div className='modal-box'>
                    <p>
                        Votre mot de passe a bien été modifié,
                        vous pouvez désormais vous connecter avec votre nouveau mot de
                        passe !
                    </p>
                    <div className='flex justify-center divider mt-10'>
                    <button className="btn bg-green-600 text-white mt-5">
                        Ouvrir le formulaire de connexion
                    </button>
                    </div>
                </div>
            )}
            <div className="divider"></div>
            {isLoading && <>
            <h4 className='mb-5'>Pour éviter que celà recommence, O'Talent vous recommande...</h4>
            <div className='flex gap-5 mb-5'>
                <TrainingCard
                    key={trainingPrank.data.training1.id}
                    dateCreated={trainingPrank.data.training1.created_at}
                    organizationId={trainingPrank.data.training1.organization.id}
                    trainingId={trainingPrank.data.training1.id}
                    label={trainingPrank.data.training1.label}
                    duration={trainingPrank.data.training1.duration}
                    price={trainingPrank.data.training1.price}
                    organization={trainingPrank.data.training1.organization.name}
                    category={trainingPrank.data.training1.category.label}
                    image={trainingPrank.data.training1.image}
                    categoryId={trainingPrank.data.training1.category.id}
                    reviews={trainingPrank.data.training1.reviews}
                    />
                <TrainingCard
                    key={trainingPrank.data.training2.id}
                    dateCreated={trainingPrank.data.training2.created_at}
                    organizationId={trainingPrank.data.training2.organization.id}
                    trainingId={trainingPrank.data.training2.id}
                    label={trainingPrank.data.training2.label}
                    duration={trainingPrank.data.training2.duration}
                    price={trainingPrank.data.training2.price}
                    organization={trainingPrank.data.training2.organization.name}
                    category={trainingPrank.data.training2.category.label}
                    image={trainingPrank.data.training2.image}
                    categoryId={trainingPrank.data.training2.category.id}
                    reviews={trainingPrank.data.training2.reviews}
                    />
                </div>
            </>}
        </div>
        </div>
    );
};

export default ResetPassword;

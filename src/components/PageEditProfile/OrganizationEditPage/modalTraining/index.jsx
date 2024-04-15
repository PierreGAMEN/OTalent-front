import React, { useEffect, useState } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../store/redux-hook/hook';
import { getstateModalEditTraining } from '../../../../store/actions/modalEditTrainingAction';
import { requestWithVariable } from '../../../../utils';
import {
    queryCreateTraining,
    queryTrainingInformation,
    queryUpdateTrainingInformations,
} from '../../../../query';
import ImageUpload from '../../../Form/Upload';
import { toast } from 'react-toastify';
import { getImageUpload } from '../../../../store/actions/getImageUpload';
import { isNeeded } from '../../../../regex';

const ModalTraining = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.token.user).id;
    const isOpen = useAppSelector((state) => state.editTraining.isOpen);
    const trainingId = useAppSelector((state) => state.editTraining.trainingId);
    const uploadImage = useAppSelector((state) => state.idImage.id);

    const categories = useAppSelector((state) => state.categories.list);
    const [prerequesiteCurrentValue, setPrerequesiteCurrentValue] =
        useState('');
    const [programCurrentValue, setProgramCurrentValue] = useState('');
    const [loader, setLoader] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: { categoryLabel: '', categoryId: '' },
        duration: '',
        prerequisites: [],
        program: [],
        price: '',
        excerpt: '',
        startingDate: '',
        endingDate: '',
        image: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCategoryChange = (event) => {
        setFormData({
            ...formData,
            category: {
                categoryLabel: event.target.value,
                categoryId: event.target.options[event.target.selectedIndex].id,
            },
        });
    };

    const handleChangePrerequesite = (e) => {
        const value = e.target.value;
        setPrerequesiteCurrentValue(value);
    };

    const updateSetFormDataWithPrerequesite = () => {
        setFormData({
            ...formData,
            prerequisites: [
                ...formData.prerequisites,
                prerequesiteCurrentValue,
            ],
        });
        setPrerequesiteCurrentValue('');
    };

    const handleChangeProgram = (e) => {
        const value = e.target.value;
        setProgramCurrentValue(value);
    };

    const updateSetFormDataWithProgram = () => {
        setFormData({
            ...formData,
            program: [...formData.program, programCurrentValue],
        });
        setProgramCurrentValue('');
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const getTrainingInformation = async () => {
        const variables = {
            trainingId: trainingId,
        };
        setLoader(false);
        const response = await requestWithVariable(
            queryTrainingInformation,
            variables
        );
        const training = response.data.training;

        const prerequisites = JSON.parse(training.prerequisites);
        const program = JSON.parse(training.program);

        setFormData({
            title: training.label,
            description: training.description,
            category: {
                categoryLabel: training.category.label,
                categoryId: training.category.id,
            },
            duration: training.duration,
            prerequisites: prerequisites,
            program: program,
            price: training.price,
            excerpt: training.excerpt,
            startingDate: training.dates[0],
            endingDate: training.dates[1],
            image: training.image,
        });

        setLoader(true);
        return response;
    };

    const validateFormData = () => {
        if (!isNeeded(formData.title, 'Le titre')) {
            return false;
        }
        if (!isNeeded(formData.description, 'La description')) {
            return false;
        }
        if (!isNeeded(formData.category.categoryId, 'La catégorie')) {
            return false;
        }
        if (!isNeeded(formData.duration, 'La durée')) {
            return false;
        }
        if (!isNeeded(formData.prerequisites[0], 'Le champs prérequis')) {
            return false;
        }
        if (!isNeeded(formData.prerequisites[0], 'Le champs prérequis')) {
            return false;
        }
        if (!isNeeded(formData.program[0], 'Le champs programme')) {
            return false;
        }
        if (!isNeeded(formData.price, 'Le prix')) {
            return false;
        }
        if (!isNeeded(formData.excerpt, 'Le résumé')) {
            return false;
        }
        return true;
    };

    const updateTrainingInformation = async () => {
        const variables = {
            modifyTrainingId: trainingId,
            input: {
                label: formData.title,
                description: formData.description,
                categoryId: formData.category.categoryId,
                duration: parseInt(formData.duration),
                prerequisites: JSON.stringify(formData.prerequisites),
                price: parseInt(formData.price),
                excerpt: formData.excerpt,
                program: JSON.stringify(formData.program),
                startingDate: formData.startingDate,
                endingDate: formData.endingDate,
                organizationId: userId,
                image: uploadImage ? uploadImage : formData.image,
            },
        };

        const response = await requestWithVariable(
            queryUpdateTrainingInformations,
            variables
        );
        if (response && response.data) {
            dispatch(getImageUpload(''));
            location.reload();
        }
    };

    const createTraining = async (e) => {
        e.preventDefault();
        if (!validateFormData()) {
            return false;
        }

        const variables = {
            input: {
                label: formData.title,
                description: formData.description,
                categoryId: formData.category.categoryId,
                duration: parseInt(formData.duration),
                prerequisites: JSON.stringify(formData.prerequisites),
                price: parseInt(formData.price),
                excerpt: formData.excerpt,
                program: JSON.stringify(formData.program),
                startingDate: formData.startingDate,
                endingDate: formData.endingDate,
                organizationId: userId,
                image: uploadImage,
            },
        };

        const response = await requestWithVariable(
            queryCreateTraining,
            variables
        );
        if (response.errors.length > 0) {
            toast.error(
                "Le formulaire n'a pas pu être envoyé, merci de vérifier les informations contenues dans la formation"
            );
        }
        if (response && response.data) {
            dispatch(getImageUpload(''));
            location.reload();
        }
    };

    const deletePrerequisite = (e) => {
        const indexToDelete = e.target.id;
        const newPrerequisites = formData.prerequisites.filter(
            (item) => item !== indexToDelete
        );
        setFormData({
            ...formData,
            prerequisites: [...newPrerequisites],
        });
    };

    const deleteProgram = (e) => {
        const indexToDelete = e.target.id;
        const newPorgram = formData.program.filter(
            (item) => item !== indexToDelete
        );
        setFormData({
            ...formData,
            program: [...newPorgram],
        });
    };

    useEffect(() => {
        if (trainingId) {
            getTrainingInformation();
        }
    }, [trainingId]);

    const handleCloseModal = () => {
        dispatch(
            getstateModalEditTraining({ isOpen: false, trainingId: null })
        );
        setFormData({
            title: '',
            description: '',
            category: { categoryLabel: '', categoryId: '' },
            duration: '',
            prerequisites: [],
            program: [],
            price: '',
            excerpt: '',
            startingDate: '',
            endingDate: '',
            image: '',
        });
    };

    return (
        isOpen && (
            <>
                <dialog
                    className=" max-w-none max-h-none overflow-auto w-full"
                    open={isOpen}>
                    <div className="modal-box max-w-none max-h-none">
                        <h4>Bienvenue chez O'Talent !</h4>
                        <div className="flex flex-col w-full border-opacity-50 ">
                            <form className="flex flex-col gap-4">
                                <label className="input input-bordered flex items-center gap-2">
                                    Titre:
                                    <input
                                        required
                                        className="grow"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="input input-bordered flex gap-2 w-full max-h-none h-[100px] flex-col">
                                    Description:
                                    <textarea
                                        required
                                        className="w-[100%] max-h-none h-[80%]"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label className="input input-bordered flex gap-2 w-full max-h-none h-20 flex-col">
                                    Catégorie:
                                    <select
                                        className=""
                                        value={formData.category.categoryLabel}
                                        onChange={handleCategoryChange}>
                                        <option value="">
                                            Veuillez choisir votre catégorie
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                id={category.id}
                                                key={category.id}
                                                value={category.label}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    Durée (h):
                                    <input
                                        className="grow"
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                    />
                                </label>

                                <label className="input input-bordered flex items-center gap-2">
                                    Prérequis:
                                    <textarea
                                        className="w-full h-full"
                                        name="prerequisites"
                                        value={prerequesiteCurrentValue}
                                        onChange={handleChangePrerequesite}
                                    />
                                </label>
                                <button
                                    onClick={updateSetFormDataWithPrerequesite}
                                    className="btn block">
                                    Ajouter le prérequis à la liste
                                </button>
                                <h4>Listes des prérequis</h4>
                                {formData.prerequisites.map((prerequisite) => (
                                    <div key={prerequisite}>
                                        {prerequisite}
                                        <button
                                            id={prerequisite}
                                            onClick={deletePrerequisite}
                                            className="btn ml-4 bg-red-500 text-white">
                                            X
                                        </button>
                                    </div>
                                ))}

                                <label className="input input-bordered flex items-center gap-2">
                                    Programme:
                                    <textarea
                                        className="w-full h-full"
                                        name="program"
                                        value={programCurrentValue}
                                        onChange={handleChangeProgram}
                                    />
                                </label>
                                <button
                                    onClick={updateSetFormDataWithProgram}
                                    className="btn block">
                                    Ajouter un programme à la liste
                                </button>
                                <h4>Listes du programme</h4>
                                {formData.program.map((prog) => (
                                    <div key={prog}>
                                        {prog}
                                        <button
                                            id={prog}
                                            onClick={deleteProgram}
                                            className="btn ml-4 bg-red-500 text-white">
                                            X
                                        </button>
                                    </div>
                                ))}
                                <label className="input input-bordered flex items-center gap-2">
                                    Prix:
                                    <input
                                        required
                                        className="grow"
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    Résumé:
                                    <input
                                        required
                                        className="grow"
                                        type="text"
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    Date de début:
                                    <input
                                        required
                                        className="grow"
                                        type="date"
                                        name="startingDate"
                                        value={formData.startingDate}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label className="input input-bordered flex items-center gap-2">
                                    Date de fin:
                                    <input
                                        required
                                        className="grow"
                                        type="date"
                                        name="endingDate"
                                        value={formData.endingDate}
                                        onChange={handleChange}
                                    />
                                </label>
                                <ImageUpload />
                                {trainingId && (
                                    <button
                                        onClick={updateTrainingInformation}
                                        className="btn bg-blue-600 text-white mt-5">
                                        Enregristrer les modification
                                    </button>
                                )}
                                {!trainingId && uploadImage && (
                                    <button
                                        onClick={createTraining}
                                        className="btn bg-blue-600 text-white mt-5">
                                        Créer la formation
                                    </button>
                                )}
                            </form>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button
                                    className="btn"
                                    onClick={handleCloseModal}>
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </>
        )
    );
};

export default ModalTraining;

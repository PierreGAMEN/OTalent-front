import React, { useEffect, useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../store/redux-hook/hook';
import { getstateModalEditTraining } from '../../../../store/actions/modalEditTrainingAction';
import { requestWithVariable, scrollTop } from '../../../../utils';
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
  const userId = useAppSelector(state => state.token.user).id;
  const isOpen = useAppSelector(state => state.editTraining.isOpen);
  const trainingId = useAppSelector(state => state.editTraining.trainingId);
  const uploadImage = useAppSelector(state => state.idImage.id);

  const categories = useAppSelector(state => state.categories.list);
  const [prerequesiteCurrentValue, setPrerequesiteCurrentValue] = useState('');
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = event => {
    setFormData({
      ...formData,
      category: {
        categoryLabel: event.target.value,
        categoryId: event.target.options[event.target.selectedIndex].id,
      },
    });
  };

  const handleChangePrerequesite = e => {
    const value = e.target.value;
    setPrerequesiteCurrentValue(value);
  };

  const updateSetFormDataWithPrerequesite = () => {
    if(prerequesiteCurrentValue.trim() === ""){
      return false
    }
    setFormData({
      ...formData,
      prerequisites: [...formData.prerequisites, prerequesiteCurrentValue.trim()],
    });
    setPrerequesiteCurrentValue('');
  };

  const handleChangeProgram = e => {
    const value = e.target.value;
    setProgramCurrentValue(value);
  };

  const updateSetFormDataWithProgram = () => {
    if(programCurrentValue.trim() === ""){
      return false
    }
    setFormData({
      ...formData,
      program: [...formData.program, programCurrentValue.trim()],
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

  const createTraining = async e => {
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

    const response = await requestWithVariable(queryCreateTraining, variables);
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

  const deletePrerequisite = e => {
    const indexToDelete = e.target.id;
    const newPrerequisites = formData.prerequisites.filter(
      (_, index) => index !== parseInt(indexToDelete, 10)
    );
    setFormData({
      ...formData,
      prerequisites: [...newPrerequisites],
    });
  };

  const deleteProgram = e => {
    const indexToDelete = e.target.id;
    const newPorgram = formData.program.filter(
      (_, index) => index !== parseInt(indexToDelete, 10)
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
    scrollTop()
    dispatch(getstateModalEditTraining({ isOpen: false, trainingId: null }));
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
          open={isOpen}
        >
          <div className="modal-box max-w-none max-h-none">
            <h4 className='mb-3 text-center'>Bienvenue chez O'Talent !</h4>
            <div className="flex flex-col w-full border-opacity-50">
              <form className="flex flex-col gap-4">
                <label className="input input-bordered flex items-center gap-2">
                  <span className='material-symbols-rounded text-3xl'>title</span>
                  <input
                    required
                    className="grow"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Titre'
                  />
                </label>
                <label className="block text-gray-700">
                  <textarea
                    required
                    className="border mt-1 block w-full mb-5 h-[150px] min-h-min p-1"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder='Décrivez votre formation'
                  />
                </label>

                <label className="input input-bordered flex items-center">
                  <select
                    className=""
                    value={formData.category.categoryLabel}
                    onChange={handleCategoryChange}
                  >
                    <option value="">Veuillez choisir votre catégorie</option>
                    {categories.map(category => (
                      <option
                        id={category.id}
                        key={category.id}
                        value={category.label}
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-3xl">timer</span>
                  <input
                    className="grow"
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Temps de la formation (h)"
                  />
                </label>

                <h5>Listes des prérequis</h5>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-3xl">list</span>
                  <input
                    className="w-full h-full"
                    name="prerequisites"
                    value={prerequesiteCurrentValue}
                    onChange={handleChangePrerequesite}
                    placeholder='Prérequis'
                    />
                </label>
                    {formData.prerequisites.map((prerequisite, index) => (
                      <div key={index} className="flex items-center">
                        
                        <button
                          id={index}
                          onClick={deletePrerequisite}
                          className="ml-4 material-symbols-rounded text-red-600"
                          aria-label="Supprimer ce pré-requis"
                          type="button"
                        >
                          delete
                        </button>
                        {prerequisite}
                      </div>
                    ))}
                <button 
                  type="button"
                  onClick={updateSetFormDataWithPrerequesite}
                  className="btn btn-success"
                >
                  Ajouter le prérequis à la liste
                </button>

                <h5>Listes du programme</h5>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-3xl">list</span>
                  <input
                    className="w-full h-full"
                    name="program"
                    value={programCurrentValue}
                    onChange={handleChangeProgram}
                    placeholder='Programme'
                  />
                </label>
                {formData.program.map((prog, index) => (
                  <div key={index} className="flex items-center">
                    
                    <button
                      id={index}
                      onClick={deleteProgram}
                      className="ml-4 material-symbols-rounded text-red-600"
                      aria-label="Supprimer cet item de votre programme"
                    >
                      delete
                    </button>
                    {prog}
                  </div>
                ))}
                <button
                  onClick={updateSetFormDataWithProgram}
                  className="btn btn-success"
                  type="button"
                >
                  Ajouter un programme à la liste
                </button>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-3xl">euro</span>
                  <input
                    required
                    className="grow"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder='Prix'
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-5xl">abc</span>
                  <input
                    required
                    className="grow"
                    type="text"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder='Résumé de la formation'
                  />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-3xl">event</span>
                  <input
                    required
                    className=""
                    type="date"
                    name="startingDate"
                    value={formData.startingDate}
                    onChange={handleChange}
                    placeholder='Date de début'
                  />
                </label>
                <p className='text-center sm:text-left sm:ml-10'>au</p>
                <label className="input input-bordered flex items-center gap-2">
                <span className="material-symbols-rounded text-3xl">event</span>
                  <input
                    required
                    className=""
                    type="date"
                    name="endingDate"
                    value={formData.endingDate}
                    onChange={handleChange}
                    placeholder='Date de fin'
                  />
                </label>
                <ImageUpload />
                {trainingId && (
                  <button
                    onClick={updateTrainingInformation}
                    className="btn bg-blue-600 text-white mt-5"
                  >
                    Enregristrer les modification
                  </button>
                )}
                {!trainingId && uploadImage && (
                  <button
                    onClick={e => {
                      createTraining(e);
                      handleCloseModal();
                    }}
                    className="btn bg-blue-600 text-white mt-5"
                  >
                    Créer la formation
                  </button>
                )}
              </form>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn btn-outline btn-error"
                  onClick={handleCloseModal}
                >
                  Fermer
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

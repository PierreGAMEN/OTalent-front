import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/redux-hook/hook';
import { getStateModalEditTraining } from '../../../../store/actions/modalEditTrainingAction';
import { requestWithVariable } from '../../../../utils';
import { queryCreateTraining, queryTrainingInformation, queryUpdateTrainingInformations } from '../../../../query';

const ModalTraining = ({ organizationId }: { organizationId: string }) => {

    const dispatch = useAppDispatch()
    const userId = useAppSelector((state) => state.token.user).id;
    const isOpen = useAppSelector((state) => state.editTraining.isOpen);
    const trainingId = useAppSelector((state) => state.editTraining.trainingId);
    const categories = useAppSelector(state => state.categories.list);
    const [prerequesiteCurrentValue, setPrerequesiteCurrentValue] = useState('')
    const [programCurrentValue, setProgramCurrentValue] = useState('')
    const [loader, setLoader] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: {categoryLabel: '', categoryId: ''},
        duration: '',
        prerequisites: [],
        program: [],
        price: '',
        excerpt: '',
        startingDate: '',
        endingDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setFormData({...formData, category: {categoryLabel: event.target.value, categoryId: event.target.options[event.target.selectedIndex].id} });
    };

    const handleChangePrerequesite = (e) => {
        const value = e.target.value
        setPrerequesiteCurrentValue(value)
    }

    const updateSetFormDataWithPrerequesite = () => {
        setFormData({
            ...formData,
            prerequisites: [...formData.prerequisites, prerequesiteCurrentValue]
        });
    };

    const handleChangeProgram = (e) => {
        const value = e.target.value
        setProgramCurrentValue(value)
    }

    const updateSetFormDataWithProgram = () => {
        setFormData({
            ...formData,
            program: [...formData.program, programCurrentValue]
        });
    };

    const getTrainingInformation = async () => {
        const variables = {
            trainingId: trainingId
        };
        setLoader(false);
        const response = await requestWithVariable(queryTrainingInformation, variables);
        const training = response.training;
    
        const prerequisites = JSON.parse(training.prerequisites);
        const program = JSON.parse(training.program)

    
        setFormData({
            title: training.label,
            description: training.description,
            category: { categoryLabel: training.category.label, categoryId: training.category.id },
            duration: training.duration,
            prerequisites: prerequisites,
            program: program,
            price: training.price,
            excerpt: training.excerpt,
            startingDate: training.dates[0],
            endingDate: training.dates[1]
        });
    
        setLoader(true);
        return response;
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
                organizationId: organizationId
            }
        }

        console.log(formData.category.categoryId)
        await requestWithVariable(queryUpdateTrainingInformations, variables)
        
        location.reload()
    }


    const createTraining = async () => {
        const variables = {
          
               input :  {label: formData.title,
                description: formData.description,
                categoryId: formData.category,
                duration: parseInt(formData.duration),
                prerequisites: formData.prerequisites,
                price: parseInt(formData.price),
                excerpt: formData.excerpt,
                program: formData.program,
                organizationId: userId
            }
                
  
        }
        
        await requestWithVariable(queryCreateTraining, variables)
        location.reload()
    }

    useEffect(() => {
        if(trainingId) {
            getTrainingInformation()
        }
    }, [trainingId])




    const handleCloseModal = () => {
        
        dispatch(getStateModalEditTraining({isOpen: false, trainingId: null}));
        setFormData(
            {
                title: "",
                description: "",
                category: {categoryLabel: '', categoryId: ''},
                duration: "",
                prerequisites: [],
                program: [],
                price: "",
                excerpt: "",
                startingDate: "",
                endingDate: ""
            })

    };


    return (
        isOpen && <>
        <dialog className=" max-w-none max-h-none overflow-auto w-full"  open={isOpen}>
            <div className="modal-box max-w-none max-h-none">
                <h3>Bienvenue chez O'Talent !</h3>
                <div className="flex flex-col w-full border-opacity-50 ">
                    <div className='flex flex-col gap-4'>
                        <label className="input input-bordered flex gap-2 max-h-none flex-col max-h-none h-20 p-2">
                            Titre:
                            <input className="w-full h-full" type="text" name="title" value={formData.title} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex gap-2 w-full max-h-none h-[100px] flex-col">
                            Description:
                            <textarea className="w-[100%] max-h-none h-[80%]" name="description" value={formData.description} onChange={handleChange} />
                        </label>

                        {/* Vérifier fonctionnement lors de l'allumage de l'API */}
                        <label className="input input-bordered flex gap-2 w-full max-h-none h-20 flex-col">
                        Catégorie:
                        <select
                        className=''
                        value={formData.category.categoryLabel}
                        onChange={handleCategoryChange}
                    >
                        <option value="">Veuillez choisir votre catégorie</option>
                        {categories.map((category) => (
                            <option id={category.id} key={category.id} value={category.label}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                    </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Durée:
                            <input className="w-full h-full" type="text" name="duration" value={formData.duration} onChange={handleChange} />
                        </label>
                        {/* Vérifier fonctionnement lors de l'allumage de l'API */}
                        <label className="input input-bordered flex items-center gap-2">
                            Prérequis:
                            <textarea className="w-full h-full" name="prerequisites" value={prerequesiteCurrentValue} onChange={handleChangePrerequesite} />
                        </label>
                        <button onClick={updateSetFormDataWithPrerequesite} className='btn block'>Ajouter le prérequis à la liste</button>
                        <h4>Listes des prérequis</h4>
                        {loader && formData.prerequisites.map((prerequisite) => (<div key={prerequisite}>{prerequisite}</div>))} 

                        {/* Vérifier fonctionnement lors de l'allumage de l'API */}
                        <label className="input input-bordered flex items-center gap-2">
                            Programme:
                            <textarea className="w-full h-full"  name="program" value={programCurrentValue} onChange={handleChangeProgram} />
                        </label>
                        <button onClick={updateSetFormDataWithProgram} className='btn block'>Ajouter le prérequis à la liste</button>
                        <h4>Listes des prérequis</h4>
                        {loader && formData.program.map((program) => (<div key={program}>{program}</div>))} 
                        <label className="input input-bordered flex items-center gap-2">
                            Prix:
                            <input className="w-full h-full" type="text" name="price" value={formData.price} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Résumé:
                            <input className="w-full h-full" type="text" name="excerpt" value={formData.excerpt} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Date de début:
                            <input className="w-full h-full" type="date" name="startingDate" value={formData.startingDate} onChange={handleChange} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            Date de fin:
                            <input className="w-full h-full" type="date" name="endingDate" value={formData.endingDate} onChange={handleChange} />
                        </label>
                    </div>
               
                    {trainingId && <button onClick={updateTrainingInformation} className="btn bg-blue-600 text-white mt-5">Enregristrer les modification</button>}
                    {!trainingId && <button onClick={createTraining} className="btn bg-blue-600 text-white mt-5">Créer la formation</button>}
                </div>
                <div className="modal-action">
                    <form method="dialog">
                        <button className="btn" onClick={handleCloseModal}>Close</button>
                    </form>
                </div>
            </div>
        </dialog>
        </>
    );
};

export default ModalTraining;

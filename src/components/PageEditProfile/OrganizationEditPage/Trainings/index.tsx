import { useState } from "react";
import TrainingCard from "../../../HomePage/TrainingCard";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hook/hook";
import { getStateModalEditTraining } from "../../../../store/actions/modalEditTrainingAction";
import ModalTraining from "../modalTraining";
import { requestWithVariable } from "../../../../utils";
import { queryDeleteTraining } from "../../../../query";

export default function OrganizationTrainings({ data }) {

    const [deleteConfim, setDeleteConfirm] = useState(false);
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.editTraining.isOpen);

    const openModal = (trainingId : string) => {
        dispatch(getStateModalEditTraining({isOpen: true, trainingId: trainingId}))
    }

    if (!data || !data.trainings) {
        return <section>Aucune formation disponible</section>;
    }

    const openModalToCreateTraining = () => {
        dispatch(getStateModalEditTraining({isOpen: true, trainingId: null}))
    }
    const deleteTraining = async (e) => {
       const idToDelete = e.target.id

       const variables = {
        deleteTrainingId: idToDelete
       }
       await requestWithVariable(queryDeleteTraining, variables)
       location.reload()
    }


    return (
        <section>
            <button onClick={openModalToCreateTraining} className="btn m-2">Créer une formation</button>  
            {!isOpen && ( 
                <> 
                    {data.trainings.length > 0 && (<>
                            
                        <div className="flex gap-5 overflow-auto p-10">
                            {data.trainings.map((training, index) => (
                                <div key={training.id} className="w-[308px]">
                                    <TrainingCard 
                                        key={training.id}
                                        label={training.label} 
                                        dateCreated={""} 
                                        duration={training.duration} 
                                        category={training.category.label} 
                                        image={training.image}
                                        categoryId={training.category.id} 
                                        organization={data.name}
                                        trainingId={training.id}
                                        organizationId={data.id}
                                        reviews={training.reviews}
                                        price={training.price}
                                    />
                                    <div className="flex gap-2 justify-around mt-2">
                                        {/* Vérifier fonctionnement du bouton delete */}

                                   {!deleteConfim && (
                                    <>
                                        <button key={training.id} onClick={() => {openModal(training.id)}} id={training.id} className="material-symbols-rounded">edit</button>
                                       <button key={training.id} id={training.id} onClick={() => {setDeleteConfirm(true)}} className="material-symbols-rounded">delete</button>
                                    </>
                                   )}
                                   {deleteConfim && (
                                    <div>
                                        <p>Êtes vous sûr de vouloir supprimer cette formation ?</p>
                                        <div className="flex justify-around mt-2">
                                            <button key={training.id} id={training.id} className="btn" onClick={deleteTraining}>Confirmer</button>
                                            <button className="btn" onClick={() => {setDeleteConfirm(false)}}>Annuler</button>
                                        </div>
                                    </div>
                                   )}
                                   </div>
                                </div>
                            ))}
                        </div>
                        </>)}
                </>
            )}
            <ModalTraining />
        </section>
    );
    
                            }  


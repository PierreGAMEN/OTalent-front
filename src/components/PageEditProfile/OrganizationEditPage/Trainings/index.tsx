import { useState } from "react";
import TrainingCard from "../../../HomePage/TrainingCard";
import { useAppDispatch, useAppSelector } from "../../../../store/redux-hook/hook";
import { getStateModalEditTraining } from "../../../../store/actions/modalEditTrainingAction";
import ModalTraining from "../modalTraining";

export default function OrganizationTrainings({ data }) {

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

    console.log(data)

    return (
        <section>
            <button onClick={openModalToCreateTraining} className="btn m-2">Créer une formation</button>  
            {!isOpen && ( 
                <> 
                    {data.trainings.length > 0 && (<>
                            
                        <div className="flex gap-5 overflow-auto p-10">
                            {data.trainings.map((training, index) => (
                                <div key={training.id}>
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
                                    />
                                   <button key={index} onClick={() => {openModal(training.id)}} id={training.id} className="btn bg-primary text-white">Modifier cette formation</button>
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

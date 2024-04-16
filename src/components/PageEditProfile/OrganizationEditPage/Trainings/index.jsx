import React, { useState } from 'react';
import TrainingCard from '../../../HomePage/TrainingCard';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../store/redux-hook/hook';
import { getstateModalEditTraining } from '../../../../store/actions/modalEditTrainingAction';
import ModalTraining from '../modalTraining';
import { requestWithVariable } from '../../../../utils';
import { queryDeleteTraining } from '../../../../query';

export default function OrganizationTrainings({ data }) {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.editTraining.isOpen);

    const openModal = (trainingId) => {
        dispatch(
            getstateModalEditTraining({ isOpen: true, trainingId: trainingId })
        );
    };

    if (!data || !data.trainings) {
        return <section>Aucune formation disponible</section>;
    }

    const openModalToCreateTraining = () => {
        dispatch(getstateModalEditTraining({ isOpen: true, trainingId: null }));
    };

    const deleteTraining = async (e) => {
        const idToDelete = e.target.id;

        const variables = {
            deleteTrainingId: idToDelete,
        };
        await requestWithVariable(queryDeleteTraining, variables);
        location.reload();
    };

    return (
        <section>
            <div className='flex justify-center'>
            <button onClick={openModalToCreateTraining} className="btn m-10 w-1/2 md:w-1/4 text-md md:text-xl">
                Créer une formation
            </button>
            </div>
            {!isOpen && (
                <>
                    {data.trainings.length > 0 && (
                        <>
                            <div className="flex gap-5 overflow-auto p-10">
                                {data.trainings.map((training, index) => (
                                    <div
                                        key={training.id}
                                        className="w-[308px]">
                                        <TrainingCard
                                            key={training.id}
                                            label={training.label}
                                            dateCreated={''}
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
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    openModal(training.id);
                                                }}
                                                id={training.id}
                                                className="material-symbols-rounded">
                                                edit
                                            </button>
                                            <button
                                                key={index}
                                                id={training.id}
                                                onClick={deleteTraining}
                                                className="material-symbols-rounded">
                                                delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
            <ModalTraining />
        </section>
    );
}

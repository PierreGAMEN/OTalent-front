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
  const isOpen = useAppSelector(state => state.editTraining.isOpen);
  const [openModalAcceptToDelete, setOpenModalAcceptToDelete] = useState(false);
  const [trainingToDelete, setTrainingToDelete] = useState(null);

  const openModal = trainingId => {
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

  const deleteTraining = async e => {
    const idToDelete = e.target.id;

    const variables = {
      deleteTrainingId: idToDelete,
    };
    await requestWithVariable(queryDeleteTraining, variables);
    location.reload();
  };

  return (
    <section className="sm:pl-10 sm:mt-10">
      <div className="flex flex-col justify-center items-center sm:items-start">
        <h4 className="sm:m-5">Vos formations</h4>
        <button
          onClick={openModalToCreateTraining}
          className="btn btn-success m-5 w-1/2 max-w-[400px] min-w-[300px]"
        >
          Créer une formation
          <span className="material-symbols-rounded text-white">
            add_circle
          </span>
        </button>
      </div>
      {!isOpen && (
        <>
          {data.trainings.length > 0 ? (
            <>
              <div className="flex gap-5 overflow-auto p-5">
                {data.trainings.map((training, index) => (
                  <div key={training.id} className="w-[308px]">
                    <TrainingCard
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
                    <div className="flex flex-col gap-2 justify-around mt-2">
                      <div className="flex justify-around">
                        <button
                          onClick={() => {
                            openModal(training.id);
                          }}
                          id={training.id}
                          className="material-symbols-rounded"
                          aria-label="Modifier cette formation"
                        >
                          edit
                        </button>
                        <button
                          id={training.id}
                          onClick={() => {
                            setTrainingToDelete(training.id);
                          }}
                          className="material-symbols-rounded"
                          aria-label="Supprimer cette formation"
                        >
                          delete
                        </button>
                      </div>
                      {trainingToDelete === training.id && (
                        <div>
                          <p>
                            Voulez-vous vraiment supprimer cette formation ?
                          </p>
                          <div className='flex justify-around mt-2'>
                          <button
                            key={training.id}
                            id={training.id}
                            onClick={deleteTraining}
                            className="btn btn-outline btn-error"
                            >
                            OUI
                          </button>
                          <button
                            onClick={() => {
                              setTrainingToDelete(null);
                            }}
                            className="btn btn-active"
                            >
                            NON
                          </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='p-5 text-center sm:text-left'>
              <p>Vous n'avez pas encore ajouté de formations disponibles</p>
            </div>
          )}
        </>
      )}
      <ModalTraining />
    </section>
  );
}

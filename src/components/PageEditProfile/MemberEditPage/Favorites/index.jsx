import React, { useState } from 'react';
import TrainingCard from '../../../HomePage/TrainingCard';
import { requestWithVariable } from '../../../../utils';
import { queryDissociateMemberTraining } from '../../../../query';

export default function FavoritesEditProfilPageMember({ data }) {
  const [favoritesTrainings, setFavoritesTrainings] = useState(data.trainings);
  const idMember = data.id;

  const dissociateMemberTraining = async idTraining => {
    const variables = {
      memberId: idMember,
      trainingId: idTraining,
    };
    const response = await requestWithVariable(
      queryDissociateMemberTraining,
      variables
    );
    return response;
  };

  const deleteFavorite = e => {
    const idTraining = e.target.id;

    const newFavoriteTrainings = favoritesTrainings.filter(
      training => training.id !== idTraining
    );
    setFavoritesTrainings(newFavoriteTrainings);
    dissociateMemberTraining(idTraining);
  };

  return (
    <div className="p-10">
      <h4 className="mb-10">Vos favoris</h4>
      <section className="flex gap-4 overflow-auto">
        {favoritesTrainings.length > 0 ? (
          favoritesTrainings.map(training => (
            <div className="flex flex-col gap-4" key={training.id}>
              <TrainingCard
                key={training.id}
                label={training.label}
                dateCreated={''}
                duration={training.duration}
                price={training.price}
                category={training.category.label}
                image={training.image}
                categoryId={training.category.id}
                organization={training.organization.name}
                trainingId={training.id}
                organizationId={training.organization.id}
                reviews={training.reviews}
              />
              <button
                className="btn btn-outline btn-error mb-5"
                onClick={deleteFavorite}
                id={training.id}
              >
                Retirer des favoris
              </button>
            </div>
          ))
        ) : (
          <p className="overflow-hidden">
            Vous n'avez pas encore ajouté de formations à vos favoris.
          </p>
        )}
      </section>
    </div>
  );
}

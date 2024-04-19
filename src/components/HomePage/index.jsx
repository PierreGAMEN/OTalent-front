import Hero from './Hero';
import TrainingList from './TrainingList';
import { useEffect, useState } from 'react';
import { requestWithVariable, requestWithoutVariable } from '../../utils';
import {
  queryAllTrainingCard,
  queryMemberInformationForHomePage,
} from '../../query';
import { Loader } from 'semantic-ui-react';
import Feature from './Feature';
import { useAppSelector } from '../../store/redux-hook/hook';
import Guide from './Guide';
import TrainingCard from './TrainingCard';
import NodataBro from '/public/assets/No data-bro';
import React from 'react';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [memberInfo, setMemberInfo] = useState({});
  const [isMemberInfoLoaded, setIsMemberInfoLoaded] = useState(false);
  const user = useAppSelector(state => state.token.user);

  const getTokenInformation = () => {
    if (user && user.member === true) {
      setIsMember(true);
    }
  };

  const getMemberInformation = async () => {
    const variables = {
      memberId: user.id,
    };
    setIsMemberInfoLoaded(false);
    const response = await requestWithVariable(
      queryMemberInformationForHomePage,
      variables
    );
    setMemberInfo(response);
    setIsMemberInfoLoaded(true);
  };

  const getAllTrainingCard = async () => {
    setIsLoading(false);
    const response = await requestWithoutVariable(queryAllTrainingCard);
    setData(response.data);
    setIsLoading(true);
  };

  useEffect(() => {
    getAllTrainingCard();
  }, []);

  useEffect(() => {
    getTokenInformation();
  }, [user]);

  useEffect(() => {
    if (isMember) {
      setIsMemberInfoLoaded(false);
      getMemberInformation().then(() => {
        setIsMemberInfoLoaded(true);
      });
    }
  }, [isMember]);

  let count = 0;
  return (
    <main className="gap-5 md:gap-10 flex flex-col lg:gap-20 lg:mb-20">
      <Hero />
      <Feature />
      <Guide />

      {isMemberInfoLoaded ? (
        <>
          {isMemberInfoLoaded &&
            memberInfo.data.member.categories.length > 0 && (
              <>
                <h3>Vos catégories préférées</h3>
                {isLoading && <Loader active inline="centered" />}
                {memberInfo.data.member.categories.map(category => (
                  <TrainingList
                    key={category.id}
                    data={data}
                    categoryChosen={category.label}
                  />
                ))}
              </>
            )}

          <h3>Proche de chez vous, en {memberInfo.data.member.region} :</h3>
          {isLoading && <Loader active inline="centered" />}
          {memberInfo.data.member.nearestOrganizations.length > 0 ? (
            <div className="flex overflow-auto ml-5 gap-5">
              {memberInfo.data.member.nearestOrganizations.map(organization =>
                organization.trainings.map(training => {
                  if (count < 5) {
                    count++;
                    return (
                      <TrainingCard
                        key={training.id}
                        dateCreated={training.created_at}
                        organizationId={training.organization.id}
                        trainingId={training.id}
                        label={training.label}
                        duration={training.duration}
                        price={training.price}
                        organization={training.organization.name}
                        category={training.category.label}
                        image={training.image}
                        categoryId={training.category.id}
                        reviews={training.reviews}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              )}
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <div className="flex flex-col md:flex-row lg:w-3/4 p-5 items-center justify-evenly gap-5 text-primary-color w-full">
                <div className='w-full '><NodataBro/></div>
                <p className="text-left text-xl md:text-3xl">
                  Nous sommes navrés, nous ne disposons pas encore de formations
                  disponibles dans votre région...
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <Loader active inline="centered" />
      )}

      {isLoading && <Loader active inline="centered" />}

      {data && (
        <>
          <h3 id="training_list">Découvrez notre sélection</h3>
          <TrainingList data={data} categoryChosen="Informatique" />
          <TrainingList data={data} categoryChosen="Arts" />
          <TrainingList data={data} categoryChosen="Finance" />
          <TrainingList data={data} categoryChosen="Business" />
        </>
      )}
    </main>
  );
}

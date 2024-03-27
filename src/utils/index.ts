import axios from "axios";


const url = 'http://otalent.florianperi-server.eddi.cloud/graphql'

export const fetchData = async (
  query: string,
  id: number | null = null,
  idName: string | null = null,
  setData: React.Dispatch<React.SetStateAction<any>>,
  setLoader: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const variables = id !== null ? { [idName!]: id } : {};

    setLoader(true);
    const response = await axios.post(url, {
      query,
      variables
    });

    const data = response.data.data;
    console.log(data)
    setData(data || []);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setLoader(false);
  }
};



export const dissociateMemberTraining = async (memberId: number, trainingId: number) => {
  try {

    const response = await axios.post(url, {
      query: `
        mutation Mutation($memberId: ID!, $trainingId: ID!) {
          dissociateMemberTraining(memberId: $memberId, trainingId: $trainingId)
        }
      `,
      variables: {
        memberId: memberId,
        trainingId: trainingId,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {

    console.error('Une erreur s\'est produite :', error);
    throw error;
  }
};

export const associateMemberTraining = async (memberId: number, trainingId: number) => {
  try {

    const response = await axios.post(url, {
      query: `
        mutation Mutation($memberId: ID!, $trainingId: ID!) {
          associateMemberTraining(memberId: $memberId, trainingId: $trainingId)
        }
      `,
      variables: {
        memberId: memberId,
        trainingId: trainingId,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {

    console.error('Une erreur s\'est produite :', error);
    throw error;
  }
};

export const associateMemberCategory = async (memberId: number, categoryId: number) => {
  try {

    const response = await axios.post(url, {
      query: `
        mutation Mutation($memberId: ID!, $categoryId: ID!) {
          associateMemberCategory(memberId: $memberId, categoryId: $categoryId)
        }
      `,
      variables: {
        memberId: memberId,
        categoryId: categoryId,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {

    console.error('Une erreur s\'est produite :', error);
    throw error;
  }
};

export const deleteMemberCategory = async (memberId: number, categoryId: number) => {
  try {

    const response = await axios.post(url, {
      query: `
        mutation Mutation($memberId: ID!, $categoryId: ID!) {
          dissociateMemberCategory(memberId: $memberId, categoryId: $categoryId)
        }
      `,
      variables: {
        memberId: memberId,
        categoryId: categoryId,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {

    console.error('Une erreur s\'est produite :', error);
    throw error;
  }
};

export const deleteReview = async (deleteReviewId) => {
  try {
    // Envoie de la requête GraphQL via Axios
    const response = await axios.post(url, {
      query: `
        mutation DeleteReview($deleteReviewId: ID!) {
          deleteReview(id: $deleteReviewId)
        }
      `,
      variables: {
        deleteReviewId: deleteReviewId
      }
    });

    console.log('Réponse de la requête GraphQL :', response.data);

    return response.data;
  } catch (error) {

    console.error('Une erreur s\'est produite lors de la requête GraphQL :', error);
    throw error;
  }
};

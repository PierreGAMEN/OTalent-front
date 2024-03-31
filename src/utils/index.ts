import axios from "axios";

const getJWT = () => {
  return localStorage.getItem('jwtToken');
};

const url = 'http://otalent.florianperi-server.eddi.cloud/graphql'

const authorizedRequest = async (url, requestData) => {
  try {
    const jwtToken = getJWT();

    // Inclusion du JWT dans les en-têtes de la requête Axios
    const response = await axios.post(url, requestData, {
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  }
};


export const fetchData = async (
  query: string,
  id: number | null | string = null,
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
    const response = await authorizedRequest(url, {
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

    console.log(response);

    return response;
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
    throw error;
  }
};

export const associateMemberTraining = async (memberId: number, trainingId: number) => {
  try {

    const response = await authorizedRequest(url, {
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

export const modifyReview = async (modifyReviewId, input) => {
  try {
    const response = await axios.post(url, {
      query: `
        mutation ModifyReview($modifyReviewId: ID!, $input: ReviewInput!) {
          modifyReview(id: $modifyReviewId, input: $input) {
            comment
          }
        }
      `,
      variables: {
        modifyReviewId: modifyReviewId,
        input: input,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la modification de la critique :', error);
    throw error;
  }
};


export const addReview = async (reviewInput) => {
  try {
    const response = await axios.post(url, {
      query: `
        mutation AddReview($input: ReviewInput!) {
          addReview(input: $input) {
            comment
            id
            rating
            member {
            avatar
            firstname
            id
            lastname
            }
          }
        }
      `,
      variables: {
        input: reviewInput,
      },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la critique :', error);
    throw error;
  }
};


export const loginRequest = async (variables) => {
  try {
    const response = await axios.post(url, {
      query: `
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: variables,
    });

    if (response.data && response.data.data && response.data.data.login && response.data.data.login.token) {
      localStorage.setItem('token', response.data.data.login.token);
    }

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la requête de connexion :', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
      const query = `
          query Categories {
              categories {
                  id
                  label
              }
          }
      `;

      const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';

      const response = await axios.post(url, { query });
      const data = response.data.data;
      const fetchedCategories = data.categories || [];
      

  } catch (error) {
      console.error('Error:', error);
  }
};
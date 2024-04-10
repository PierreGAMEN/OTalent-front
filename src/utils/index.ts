import axios, { AxiosError, AxiosResponse } from 'axios';

const getJWT = () => {
    return localStorage.getItem('token');
};

const url = import.meta.env.VITE_GRAPHQL_API;
const authorizedRequest = async (url: string, requestData: any) => {
    try {
        const jwtToken = getJWT();

     
        const headers: { [key: string]: string } = {};
        if (jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        const response = await axios.post(url, requestData, {
            headers: headers,
        });


    return response.data;
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
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
        const response = await authorizedRequest(url, {
            query,
            variables,
        });

        const data = response.data;
        console.log(data);
        setData(data || []);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoader(false);
    }
};

export const dissociateMemberTraining = async (
    memberId: number,
    trainingId: number
) => {
    try {
        const response = await authorizedRequest(url, {
            query: `
        mutation Mutation($memberId: ID!, $trainingId: ID!) {
          dissociateMemberTraining(memberId: $memberId, trainingId: $trainingId)
        }`
      ,
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


export const associateMemberTraining = async (
    memberId: number,
    trainingId: number
) => {
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
        console.error("Une erreur s'est produite :", error);
        throw error;
    }
};

export const associateMemberCategory = async (
    memberId: number,
    categoryId: number
) => {
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
        console.error("Une erreur s'est produite :", error);
        throw error;
    }
};

export const deleteMemberCategory = async (
    memberId: number | string,
    categoryId: number | string
) => {
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
        console.error("Une erreur s'est produite :", error);
        throw error;
    }
};

export const modifyReview = async (modifyReviewId: string, input: string) => {
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

export const addReview = async (reviewInput: {}) => {
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
        console.error("Erreur lors de l'ajout de la critique :", error);
        throw error;
    }
};

export const loginRequest = async (variables: {}) => {
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

        if (
            response.data &&
            response.data.data &&
            response.data.data.login &&
            response.data.data.login.token
        ) {
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

        const url = import.meta.env.VITE_GRAPHQL_API;

        const response = await axios.post(url, { query });
        const data = response.data.data;
        const fetchedCategories = data.categories || [];

        return fetchedCategories;
    } catch (error) {
        console.error('Error:', error);
    }
};

interface Variables {
    [key: string]: any;
}

interface ApiResponse {
    errors: {
      message: string;
    }[];
    // Autres propriétés éventuelles de la réponse
  }

export const requestWithVariable = async (query: string, variables: Variables): Promise<AxiosResponse> => {
    try {
      const response: AxiosResponse<ApiResponse> = await authorizedRequest(url, {
        query,
        variables
      });
  
      console.log('Réponse de l\'API:', response);
      return response;
    } catch (error) {
      // Type assertion pour indiquer à TypeScript que 'error' est de type AxiosError
      const axiosError = error as AxiosError;
  
      if (axiosError.response && axiosError.response.data) {
  
        const responseData = axiosError.response.data as ApiResponse;
        if (responseData.errors && responseData.errors[0].message === 'Context creation failed: Invalid token') {
          localStorage.clear();
          window.location.href = '/';
        }
      }
  
      console.error('Erreur lors de l\'envoi des données:', axiosError);
  
      throw axiosError;
    }
  };

export const requestWithoutVariable = async (query: string) : Promise<void> => {
  try {
    const response: AxiosResponse<any> = await authorizedRequest(url, {
      query
    });
    
    console.log('Réponse de l\'API:', response);
    return response
  } catch (error) {
   
    console.error('Erreur lors de l\'envoi des données:', error);
  }
}

export const changePassword = async (
    query: string,
    variables: any,
    token: string | null
) => {
    try {
        const tokenUrl = token;

        // Création des en-têtes de la requête
        const headers: { [key: string]: string } = {};
        if (tokenUrl) {
            headers['Authorization'] = `Bearer ${tokenUrl}`;
        }

        // Envoi de la requête avec les en-têtes appropriés
        const response = await axios.post(
            url,
            {
                query: query,
                variables: variables,
            },
            {
                headers: headers,
            }
        );

        return response.data;
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        throw error;
    }
};

export const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export const handleDateFormat = (dateString: string) => {
    if (isValidDate(dateString)) {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(dateString));
    } else {
        return 'Invalid Date';
    }
};

import axios from 'axios';
import { toast } from 'react-toastify';


// FUNCTION FETCH DATA WITH AXIOS

const getJWT = () => {
    return localStorage.getItem('token');
};

const url = import.meta.env.VITE_GRAPHQL_API;
const authorizedRequest = async (url, requestData) => {
    try {
        const jwtToken = getJWT();

        const headers = {};
        if (jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        const response = await axios.post(url, requestData, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        
        if(error.message === "Network Error" && window.location.pathname !== "/error") {
            window.location.href = "/error"
        }
        throw error;
    }
};

// GENERAL FETCHING FUNCTION
export const requestWithVariable = async (query, variables) => {
    try {
        const response = await authorizedRequest(url, {
            query,
            variables,
        });

        console.log("Réponse de l'API:", response);
        return response;
    } catch (error) {
        const axiosError = error;

        if (axiosError.response && axiosError.response.data) {
            const responseData = axiosError.response.data;
            if (
                responseData.errors &&
                responseData.errors[0].message ===
                    'Context creation failed: Invalid token'
            ) {
                localStorage.clear();
                window.location.href = '/';
            }
        }

        console.error("Erreur lors de l'envoi des données:", axiosError);

        throw axiosError;
    }
};

export const requestWithoutVariable = async (query) => {
    try {
        const response = await authorizedRequest(url, {
            query,
        });

        console.log("Réponse de l'API:", response);
        return response;
    } catch (error) {
        console.error("Erreur lors de l'envoi des données:", error);
    }
};

// SPECIFIC FETCHING FUNCTION
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




export const changePassword = async (query, variables, token) => {
    try {
        const tokenUrl = token;

        const headers = {};
        if (tokenUrl) {
            headers['Authorization'] = `Bearer ${tokenUrl}`;
        }

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
        
        return response;
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        toast.error("Oups, le lien que vous avez utilisé ne doit plus être actif, changement de mot de passe impossible. Veuillez réessayer avec un nouveau lien");
        throw error;
    }
};


// UTILS GENERAL FUNCTION 
export const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

export const handleDateFormat = (dateString) => {
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


export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
}
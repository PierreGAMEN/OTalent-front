import axios from "axios";

export const fetchData = async (query: string, idCategorie = null, setData: React.Dispatch<React.SetStateAction<any>>, setLoader: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';
        const variables = idCategorie !== null ? { categoryId: idCategorie } : {};

        setLoader(true);
        const response = await axios.post(url, {
            query,
            variables
        });

        const data = response.data.data;
        setData(data || []);
        setLoader(false);
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
        setLoader(false);
    } 
};


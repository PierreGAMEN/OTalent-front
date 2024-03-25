import axios from "axios";

export const fetchData = async (
  query: string,
  id: number | null = null,
  idName: string | null = null,
  setData: React.Dispatch<React.SetStateAction<any>>,
  setLoader: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const url = 'http://otalent.florianperi-server.eddi.cloud/graphql';
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
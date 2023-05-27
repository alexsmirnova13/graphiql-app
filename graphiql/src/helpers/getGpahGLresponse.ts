import axios from 'axios';
const endpoint = 'https://rickandmortyapi.com/graphql';

const getGpahGLresponse = async (body: string, variables: string) => {
  try {
    const graphqlQuery = {
      query: `${body}`,
      variables: JSON.parse(variables === '' ? '{}' : variables),
    };
    const headers = {
      'content-type': 'application/json',
    };

    const response = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery,
    });

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return err.message;
    } else {
      return 'Not found';
    }
  }
};

export default getGpahGLresponse;

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

    console.log(graphqlQuery);

    const response = await axios({
      url: endpoint,
      method: 'post',
      headers: headers,
      data: graphqlQuery,
    });

    console.log(response.data); // data
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

import axios from 'axios';
const endpoint = 'https://rickandmortyapi.com/graphql';

const getScheme = async (value?: string) => {
  try {
    const graphqlQuery = {
      query: `query  IntrospectionQuery {
 __schema {
   queryType {
     fields {
      name
      type {
        kind
      }
     }
   }
 }
}`,
      variables: {},
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

export default getScheme;

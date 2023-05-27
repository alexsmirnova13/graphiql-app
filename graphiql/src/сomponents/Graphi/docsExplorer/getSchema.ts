import axios from 'axios';
const endpoint = 'https://rickandmortyapi.com/graphql';

export const getSchema = async () => {
  try {
    const graphqlQuery = {
      query: `query  IntrospectionQuery {
 __schema {
   queryType {
     fields {
      description
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

export const getType = async (name: string) => {
  try {
    const graphqlQuery = {
      query: `query IntrospectionQuery{
  __type(name: "${name}") {
description
    kind
    fields {
description
      name
      type {
        description
        name
        kind
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

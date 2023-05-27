import { getIntrospectionQuery, buildClientSchema, IntrospectionQuery } from 'graphql';

export const getSchema = async () => {
  const introspectionQuery = getIntrospectionQuery();

  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const { data } = (await response.json()) as { data: IntrospectionQuery };

  const schema = buildClientSchema(data);

  return schema;
};

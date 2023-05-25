import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLFieldMap,
} from 'graphql';

interface TreeData {
  id: string;
  // label: string;
  name: string;
  expanded: boolean;
  children: TreeData[];
}

const parseQueryType = (queryType: GraphQLObjectType<any, any>) => {
  const fieldMap = queryType.getFields();
  const fields = Object.values(fieldMap);
  if (fields.length) {
    const fieldTypes = fields.reduce((acc, u) => {
      const type = u.type;
      if (type) {
        acc.push(type as GraphQLObjectType);
      }
      return acc;
    }, [] as GraphQLObjectType[]);
  }
  return queryType;
};

const parseFieldMap = (fieldMap: GraphQLFieldMap<any, any>) => {
  const fields = Object.values(fieldMap);
  const pFields = fields.map((field) => {
    console.log(field);
    console.log(field.type);
    // const fieldType: GraphQLObjectType = field.type;
    return {
      name: field.name,
      // fields: fieldType.getFields(),
    };
  });
  console.log(pFields);
  return fieldMap;
};

export const parseSchema = (schema: GraphQLSchema) => {
  console.log(schema, 'schema');
  const types = [
    ...Object.entries(schema.getTypeMap()).filter(([key, val]) => {
      return key.slice(0, 2) !== '__';
    }),
  ];
  const queryType = schema.getQueryType();
  if (!queryType) {
    return;
  }
  const data = parseQueryType(queryType);
  // const data = {
  //   type: queryType.name,
  //   fields: parseFieldMap(queryType.getFields()),
  // };
  return data;
};

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
  // console.log('query type', queryType);
  return schema;
};

async function main() {
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
}

export default getFields;

async function getFields() {
  const schema = await main();
  console.log(schema);
  const rootType = schema.getQueryType();
  console.log(rootType);
  if (rootType) {
    addProperty(rootType);
  }

  if (!rootType) {
    throw new Error('Root type not found');
  }
  if (!rootType) {
    return {
      id: 'root',
      // label: 'Root',
      name: 'Root',
      expanded: true,
      children: [],
    };
  }

  const rootNode: TreeData = {
    id: 'root',
    // label: rootType.name,
    name: rootType.name,
    expanded: true,
    children: [],
  };

  const fields = rootType.getFields();

  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName];

    const fieldNode: TreeData = {
      id: fieldName,
      // label: fieldName,
      name: fieldName,
      expanded: false,
      children: [],
    };

    rootNode.children.push(fieldNode);
  });

  // console.log('rootNode', rootNode);
  return rootNode;
}

function addProperty(obj: GraphQLObjectType) {
  console.log(obj, 'ghjghjghjgh');
  const result = {
    name: obj.name,
    children: Object.values(obj.getFields()),
  };
}

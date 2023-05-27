import { Button } from '@mantine/core';
import { getSchema } from './getSchema';
import { useState } from 'react';
import Docs from './Docs/Docs';

export type Item = {
  description: string;
  name: string;
  type: {
    kind: string;
  };
};
export interface Schema {
  data: {
    __schema: {
      queryType: {
        fields: Item[];
      };
    };
  };
}

const Heading = () => {
  const [schema, setSchema] = useState<Schema | null>(null);
  const submit = async () => {
    if (schema === null) {
      const response = await getSchema();
      setSchema(response);
      console.log(response);
    } else {
      setSchema(null);
    }
  };
  return (
    <>
      <Button variant="light" onClick={() => submit()}>
        Query
      </Button>
      {schema && <Docs items={[...schema.data.__schema.queryType.fields]} />}
    </>
  );
};

export default Heading;

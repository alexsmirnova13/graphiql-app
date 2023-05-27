import { Button, Flex, MantineTheme, createStyles, Box } from '@mantine/core';
import { getSchema } from './getSchema';
import { Suspense, useState } from 'react';
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

const useStyles = createStyles((theme: MantineTheme) => ({
  middle: {
    border: '1px solid',
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[1],
    overflow: 'scroll',
    ['@media (max-width: 1100px)']: {
      width: '100%',
    },
    backgroundColor: theme.colorScheme === 'dark' ? '#282c34' : theme.colors.gray[1],
  },
}));

const DocsExplorer = () => {
  const { classes } = useStyles();

  const [schema, setSchema] = useState<Schema | null>(null);
  const submit = async () => {
    if (schema === null) {
      const response = await getSchema();
      setSchema(response);
    } else {
      setSchema(null);
    }
  };

  return (
    <Flex w="350px" direction="column" gap="sm" className={classes.middle} h={636}>
      <Box>
        <Button variant="light" onClick={() => submit()} fullWidth radius={0}>
          Query
        </Button>
      </Box>
      {schema && <Docs items={[...schema.data.__schema.queryType.fields]} />}
    </Flex>
  );
};

export default DocsExplorer;

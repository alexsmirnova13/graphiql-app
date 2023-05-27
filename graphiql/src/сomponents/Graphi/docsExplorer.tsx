import { Flex, Input, createStyles } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { GraphQLNamedType, GraphQLObjectType, GraphQLSchema, OperationTypeNode } from 'graphql';
import { useState } from 'react';
import { SchemaComponents } from './Schema/const';
import { SchemaType } from './Schema/SchemaType';
import { TypeDetails } from './Schema/TypeDetails';

export interface IDocsExplorerProps {
  schema?: GraphQLSchema;
}

const useStyles = createStyles({
  middle: {
    flex: '1',
    ['@media (max-width: 1100px)']: {
      width: '100%',
    },
  },
});

const DocsExplorer = ({ schema }: IDocsExplorerProps) => {
  const [focusedType, setFocusedType] = useState<GraphQLNamedType>();
  const [focusedFieldName, setFocusedFieldName] = useState<string | undefined>();
  const { classes } = useStyles();

  if (!schema) {
    return <div>Kek</div>;
  }

  const handleClick = (name: string, component: SchemaComponents) => {
    if (component === SchemaComponents.FIELD) {
      setFocusedFieldName(name);
    } else if (component === SchemaComponents.TYPE) {
      setFocusedFieldName(undefined);
      const type = schema.getType(name);

      if (type) {
        setFocusedType(type);
      }
    }
  };

  const rootTypeMap = Object.values(OperationTypeNode).reduce((acc, u) => {
    const key = u as OperationTypeNode;
    const rootType = schema.getRootType(key);
    if (rootType) {
      acc.set(key, rootType);
    }
    return acc;
  }, new Map<OperationTypeNode, GraphQLObjectType>());

  return (
    <Flex w="200px" direction="column" gap="sm" className={classes.middle}>
      <Input icon={<IconSearch size="1rem" />} placeholder="search" maw="300px" />
      {focusedType ? (
        <TypeDetails type={focusedType} onClick={handleClick} focusedFieldName={focusedFieldName} />
      ) : (
        <>
          {[...rootTypeMap.entries()].map(([name, type]) => {
            return (
              <>
                <Flex>
                  <span>{name}: </span>
                  <SchemaType key={name} onClick={handleClick} name={type.name} />
                </Flex>
              </>
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default DocsExplorer;

<<<<<<< HEAD
import { Flex } from '@mantine/core';
import { GraphQLObjectType, GraphQLSchema, OperationTypeNode } from 'graphql';
import { useEffect, useState } from 'react';
import { Header } from './Schema/Header';
import { IHistory } from './Schema/interfaces';
import { Type } from './Schema/Type';
import { Input } from './Schema/Input';
import { TypeDetails } from './Schema/TypeDetails';
import { Search } from './Schema/Search';
import { getSchema } from '../../utils/graphiApi';

export interface IDocsExplorerProps {
  onClose: () => void;
}

const DocsExplorer = ({ onClose }: IDocsExplorerProps) => {
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();
  const [focusedTypeName, setFocusedTypeName] = useState<string | undefined>();
  const [focusedFieldName, setFocusedFieldName] = useState<string | undefined>();
  const [history, setHistory] = useState<IHistory[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const downloadSchema = async () => {
      const schema = await getSchema();
      setSchema(schema);
    };

    downloadSchema();
  }, []);

  if (!schema) {
    return <div>Loading schema...</div>;
  }

  const handleClick = (newEntry: IHistory) => {
    setHistory(
      history.concat({
        typeName: focusedTypeName,
        fieldName: focusedFieldName,
        search: search,
      })
    );
    setSearch('');
    setFocusedFieldName(newEntry.fieldName);
    setFocusedTypeName(newEntry.typeName);
  };

  const rootTypeMap = Object.values(OperationTypeNode).reduce((acc, u) => {
    const key = u as OperationTypeNode;
    const rootType = schema.getRootType(key);
    if (rootType) {
      acc.set(key, rootType);
    }
    return acc;
  }, new Map<OperationTypeNode, GraphQLObjectType>());

  const handleHistoryBack = () => {
    const previousHistoryItem = history.slice(-1)[0];
    if (previousHistoryItem) {
      setFocusedTypeName(previousHistoryItem.typeName);
      setFocusedFieldName(previousHistoryItem.fieldName);
      setSearch(previousHistoryItem.search || '');
      setHistory(history.slice(0, -1));
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  console.log(schema);

  const previousHistoryItem = history.slice(-1)[0];
  const headerTitle = focusedFieldName || focusedTypeName || 'Documentation explorer';
  const backButtonText = previousHistoryItem
    ? previousHistoryItem.fieldName || previousHistoryItem.typeName || 'Schema'
    : undefined;

  const focusedType = focusedTypeName && schema.getType(focusedTypeName);

  return (
    <Flex w={450} direction="column" bg="grey">
      <Header
        onBackClick={handleHistoryBack}
        onCloseClick={onClose}
        title={headerTitle}
        backButtonText={backButtonText}
      />
      {!focusedFieldName && (
        <Input placeHolder="Schema" onChange={handleSearchChange} value={search} />
      )}
      {search ? (
        <Search
          search={search}
          schema={schema}
          onClick={handleClick}
          focusedTypeName={focusedTypeName}
        />
      ) : focusedType ? (
        <TypeDetails type={focusedType} onClick={handleClick} focusedFieldName={focusedFieldName} />
      ) : (
        <>
          <p>A GraphQL schema provides a root type for each kind of operation.</p>
          <p>Root types</p>
          {[...rootTypeMap.entries()].map(([name, type]) => {
            return (
              <>
                <Flex>
                  <span>{name}: </span>
                  <Type key={name} onClick={handleClick} name={type.name} />
                </Flex>
              </>
            );
          })}
        </>
      )}
=======
import { Flex, Input, createStyles } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const useStyles = createStyles({
  middle: {
    flex: '1',
    ['@media (max-width: 1100px)']: {
      width: '100%',
    },
  },
});

const DocsExplorer = () => {
  const { classes } = useStyles();
  return (
    <Flex w="200px" direction="column" gap="sm" className={classes.middle}>
      <Input icon={<IconSearch size="1rem" />} placeholder="search" maw="300px" />
      <p>тут инфа разная</p>
>>>>>>> develop
    </Flex>
  );
};

export default DocsExplorer;

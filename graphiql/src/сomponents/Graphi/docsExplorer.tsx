import { Flex, MantineTheme, useMantineTheme, createStyles, Button, Box } from '@mantine/core';
import { GraphQLObjectType, GraphQLScalarType, GraphQLSchema, OperationTypeNode } from 'graphql';
import { useEffect, useState } from 'react';
import { Header } from './Schema/Header';
import { IHistory } from './Schema/interfaces';
import { Type } from './Schema/Type';
import { Input } from './Schema/Input';
import { TypeDetails } from './Schema/TypeDetails';
import { Search } from './Schema/Search';
import { getSchema } from '../../utils/graphiApi';
import { ReactComponent as Logo } from './../../assets/svg/docsLogo.svg';

const useStyles = createStyles((theme: MantineTheme) => ({
  docsExplorer: {
    background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
    borderRight: '1px solid #ddd',
    ['@media (max-width: 1025px)']: {
      width: '100%',
    },
  },
}));
const DocsExplorer = () => {
  const theme = useMantineTheme();
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();
  const [focusedTypeName, setFocusedTypeName] = useState<string | undefined>();
  const [focusedFieldName, setFocusedFieldName] = useState<string | undefined>();
  const [history, setHistory] = useState<IHistory[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | undefined>();
  const { classes } = useStyles();
  useEffect(() => {
    const downloadSchema = async () => {
      try {
        const schema = await getSchema();
        setSchema(schema);
      } catch (e) {
        setError('loh');
      }
    };

    downloadSchema();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

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

  const previousHistoryItem = history.slice(-1)[0];
  const headerTitle = focusedFieldName || focusedTypeName || 'docsExplorer.h1';
  const backButtonText = previousHistoryItem
    ? previousHistoryItem.fieldName || previousHistoryItem.typeName || 'Schema'
    : undefined;

  const focusedType = focusedTypeName && schema.getType(focusedTypeName);
  const showSearch = !(focusedFieldName || focusedType instanceof GraphQLScalarType);
  const placeholderText = 'Search ' + (focusedTypeName || 'Schema') + '...';

  const svgColor = theme.colorScheme === 'dark' ? '#a5d8ff' : '#228be6';

  return (
    <Flex w={350} direction="column" className={classes.docsExplorer}>
      <Box
        component="a"
        target="_blank"
        href="https://rickandmortyapi.com/documentation"
        sx={{
          textDecoration: 'none',
        }}
      >
        <Button
          variant="light"
          fullWidth
          radius={0}
          leftIcon={<Logo width={30} hanging={30} fill={svgColor} />}
        >
          Rick&Morty
        </Button>
      </Box>
      <Header onBackClick={handleHistoryBack} title={headerTitle} backButtonText={backButtonText} />
      {showSearch && (
        <Input placeHolder={placeholderText} onChange={handleSearchChange} value={search} />
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
              <Flex key={name}>
                <span>{name}:&nbsp;</span>
                <Type key={name} onClick={handleClick} name={type.name} />
              </Flex>
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default DocsExplorer;

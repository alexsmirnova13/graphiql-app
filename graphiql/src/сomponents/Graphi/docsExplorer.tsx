import { Flex, MantineTheme, useMantineTheme, createStyles, Button, Box } from '@mantine/core';
import { GraphQLObjectType, GraphQLScalarType, GraphQLSchema, OperationTypeNode } from 'graphql';
import { Header } from './Schema/Header';
import { Type } from './Schema/Type';
import { Input } from './Schema/Input';
import { TypeDetails } from './Schema/TypeDetails';
import { Search } from './Schema/Search';
import { ReactComponent as Logo } from './../../assets/svg/docsLogo.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { historyBack, setSearch } from '../../store/docsSlice';

const useStyles = createStyles((theme: MantineTheme) => ({
  docsExplorer: {
    background: theme.colorScheme === 'dark' ? theme.colors.gray[9] : theme.colors.gray[1],
    borderRight: '1px solid #ddd',
    ['@media (max-width: 1025px)']: {
      width: '100%',
    },
  },
}));
const DocsExplorer = ({ schema }: { schema: GraphQLSchema | undefined }) => {
  const theme = useMantineTheme();
  const { focusedTypeName, focusedFieldName, history, search } = useAppSelector(
    (state) => state.docs
  );
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  if (!schema) {
    return <div>No schema found...</div>;
  }

  const rootTypeMap = Object.values(OperationTypeNode).reduce((acc, u) => {
    const key = u as OperationTypeNode;
    const rootType = schema.getRootType(key);
    if (rootType) {
      acc.set(key, rootType);
    }
    return acc;
  }, new Map<OperationTypeNode, GraphQLObjectType>());

  const handleSearchChange = (value: string) => {
    dispatch(setSearch(value));
  };

  const handleHistoryBack = () => {
    dispatch(historyBack());
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
        <Search search={search} schema={schema} focusedTypeName={focusedTypeName} />
      ) : focusedType ? (
        <TypeDetails type={focusedType} focusedFieldName={focusedFieldName} />
      ) : (
        <>
          <p>A GraphQL schema provides a root type for each kind of operation.</p>
          <p>Root types</p>
          {[...rootTypeMap.entries()].map(([name, type]) => {
            return (
              <Flex key={name}>
                <span>{name}:&nbsp;</span>
                <Type key={name} name={type.name} />
              </Flex>
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default DocsExplorer;

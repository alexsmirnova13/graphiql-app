import { Flex } from '@mantine/core';
import { GraphQLArgument, GraphQLInputObjectType, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { Arguments } from './Arguments';
import { FieldName } from './FieldName';
import { Type } from './Type';
import { parseType } from './utils';

interface ISearchProps {
  schema: GraphQLSchema;
  focusedTypeName?: string;
  search: string;
}

interface ISearchMatch {
  typeName: string;
  fieldName?: string;
  argName?: string;
}

export const Search = ({ schema, search, focusedTypeName }: ISearchProps) => {
  const criteria = search.toLowerCase();
  const typeMap = schema.getTypeMap();

  const focusedType = (focusedTypeName && typeMap[focusedTypeName]) || undefined;

  const focusedMatches =
    focusedType &&
    (focusedType instanceof GraphQLObjectType || focusedType instanceof GraphQLInputObjectType) &&
    [...Object.values(focusedType.getFields())].reduce((acc: ISearchMatch[], field) => {
      if (field.name.toLowerCase().includes(criteria)) {
        acc.push({
          typeName: focusedType.name,
          fieldName: field.name,
        });
      } else {
        const args = field.args as GraphQLArgument[];
        if (args?.length) {
          args.forEach((arg) => {
            if (arg.name?.toLowerCase().includes(criteria)) {
              acc.push({
                typeName: focusedType.name,
                fieldName: field.name,
                argName: arg.name,
              });
            }
          });
        }
      }

      return acc;
    }, []);

  const matches = [...Object.values(typeMap)].reduce((acc, type) => {
    if (type.name.toLowerCase().includes(criteria)) {
      acc.push({
        typeName: type.name,
      });
    }

    if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
      const fields = [...Object.values(type.getFields())];

      fields.forEach((field) => {
        if (field.name.toLowerCase().includes(criteria)) {
          acc.push({
            typeName: type.name,
            fieldName: field.name,
          });
        }

        const args = field.args as GraphQLArgument[];

        if (args?.length) {
          args.forEach((arg) => {
            if (arg.name?.toLowerCase().includes(criteria)) {
              acc.push({
                typeName: type.name,
                fieldName: field.name,
                argName: arg.name,
              });
            }
          });
        }
      });
    }

    return acc;
  }, [] as ISearchMatch[]);

  matches.sort((a, b) => {
    if (a.fieldName && b.fieldName) {
      if (a.argName && b.argName) {
        return 0;
      } else if (!a.argName && b.argName) {
        return -1;
      } else if (a.argName && !b.argName) {
        return 1;
      }
    } else if (!a.fieldName && b.fieldName) {
      return -1;
    } else if (a.fieldName && !b.fieldName) {
      return 1;
    }

    return 0;
  });

  return (
    <Flex direction={'column'}>
      {focusedMatches &&
        focusedMatches.map((match) => {
          const type = typeMap[match.typeName];
          const parsedType = parseType(type);
          const [prefix, typeName, postfix] = parsedType.split('-');
          const args = match.argName && [
            {
              name: match.argName,
              type: typeName,
              typePrefix: prefix,
              typePostfix: postfix,
            },
          ];

          return (
            match.fieldName && (
              <Flex direction={'row'} key={typeName + match.fieldName + match.argName}>
                <FieldName
                  key={match.typeName + match.fieldName + match.argName}
                  parentTypeName={match.typeName}
                  name={match.fieldName}
                />
                {args && <Arguments args={args} />}
              </Flex>
            )
          );
        })}
      {focusedTypeName && <p>Other Results</p>}
      {matches.map((match) => {
        const type = typeMap[match.typeName];
        const { fieldName, argName } = match;
        if (!type) return null;
        const parsedType = parseType(type);
        const [prefix, typeName, postfix] = parsedType.split('-');
        const args = argName && [
          {
            name: argName,
            type: typeName,
            typePrefix: prefix,
            typePostfix: postfix,
          },
        ];
        return (
          <Flex direction={'row'} key={typeName + fieldName + argName}>
            <Type name={typeName} prefix={prefix} postfix={postfix}></Type>
            {fieldName && (
              <div>
                .<FieldName parentTypeName={typeName} name={fieldName} />
              </div>
            )}
            {args && (
              <div>
                <Arguments args={args} />
              </div>
            )}
          </Flex>
        );
      })}
    </Flex>
  );
};

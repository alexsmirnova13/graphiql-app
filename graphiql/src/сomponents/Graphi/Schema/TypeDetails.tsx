import { Flex } from '@mantine/core';
import {
  GraphQLArgument,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLNamedType,
  GraphQLObjectType,
} from 'graphql';
import { FieldDetails } from './FieldDetails';
import { IHistory } from './interfaces';
import { Field } from './Field';
import { parseType } from './utils';

interface ITypeDetailsProps {
  type: GraphQLNamedType;
  focusedFieldName?: string;
  onClick: (newEntry: IHistory) => void;
}

export const TypeDetails = ({ type, onClick, focusedFieldName }: ITypeDetailsProps) => {
  if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
    const fieldsMap = type.getFields();

    if (focusedFieldName) {
      const field = fieldsMap[focusedFieldName];
      const [prefix, typeName, postfix] = parseType(field.type).split('-');
      const args =
        type instanceof GraphQLObjectType &&
        type
          .getFields()
          [focusedFieldName].args.concat()
          .map((arg) => {
            const [prefix, typeName, postfix] = parseType(arg.type).split('-');
            return {
              name: arg.name,
              type: typeName,
              typePrefix: prefix,
              typePostfix: postfix,
            };
          });
      return (
        <FieldDetails
          description={field.description || undefined}
          args={args || undefined}
          onClick={onClick}
          type={{
            name: typeName,
            prefix,
            postfix,
          }}
        />
      );
    } else {
      const fields = [...Object.values(fieldsMap)];
      return (
        <>
          <p>{type.description || 'No Description'}</p>
          {fields.length && (
            <>
              <p>Fields</p>
              {fields.map((value) => {
                const args = value.args?.concat().map((arg: GraphQLArgument) => {
                  const [prefix, typeName, postfix] = parseType(arg.type);
                  return {
                    name: arg.name,
                    type: typeName,
                    typePrefix: prefix,
                    typePostfix: postfix,
                  };
                });
                return (
                  <Field
                    key={value.name}
                    name={value.name}
                    parentTypeName={type.name}
                    type={value.type}
                    args={args}
                    onClick={onClick}
                  />
                );
              })}
            </>
          )}
        </>
      );
    }
  } else if (type instanceof GraphQLEnumType) {
    const values = type.getValues();
    return (
      <Flex direction={'column'}>
        {values.map((value) => (
          <>
            <p>{value.name}</p>
            <p>{value.description}</p>
          </>
        ))}
      </Flex>
    );
  }

  return <p>{type.description}</p>;
};

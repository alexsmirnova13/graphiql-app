import { Flex } from '@mantine/core';
import { GraphQLArgument, GraphQLField, GraphQLOutputType } from 'graphql';
import { Argument } from './Argument';
import { SchemaComponents } from './const';
import { SchemaType } from './SchemaType';
import { parseType } from './utils';

export interface IFieldDetailsProps {
  field: GraphQLField;
  type: GraphQLOutputType;
  args: GraphQLArgument[];
  onClick: (name: string, component: SchemaComponents) => void;
}

export const FieldDetails = ({ field, type, args, onClick }: IFieldDetailsProps) => {
  const parsedType = parseType(type);
  const [prefix, typeName, postfix] = parsedType.split('-');
  return (
    <Flex direction={'column'}>
      <span>{field.description}</span>
      {type && (
        <>
          <p>Type</p>
          <p>
            <SchemaType prefix={prefix} name={typeName} postfix={postfix} onClick={onClick} />
          </p>
        </>
      )}

      {args.length && (
        <>
          <p>Arguments</p>
          {args.map((argument) => (
            <Argument key={argument.name} argument={argument} onClick={onClick} />
          ))}
        </>
      )}
    </Flex>
  );
};

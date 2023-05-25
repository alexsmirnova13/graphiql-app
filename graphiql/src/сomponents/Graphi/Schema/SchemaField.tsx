import { Flex } from '@mantine/core';
import { GraphQLArgument, GraphQLOutputType } from 'graphql';
import { SchemaComponents } from './const';
import { FieldName } from './FieldName';
import { SchemaArgs } from './SchemaArgs';
import { SchemaType } from './SchemaType';
import { parseType } from './utils';

export interface ISchemaFieldProps {
  name: string;
  type: GraphQLOutputType;
  args: GraphQLArgument[];
  onClick: (name: string, component: SchemaComponents) => void;
}

export const SchemaField = ({ name, type, args, onClick }: ISchemaFieldProps) => {
  const parsedType = parseType(type);
  const [prefix, typeName, postfix] = parsedType.split('-');
  return (
    <Flex>
      <FieldName name={name} onClick={onClick} />
      <span>&nbsp;</span>
      {Boolean(args.length) && <SchemaArgs args={args} onClick={onClick} />}
      <span>:&nbsp;</span>
      <SchemaType prefix={prefix} name={typeName} postfix={postfix} onClick={onClick} />
    </Flex>
  );
};

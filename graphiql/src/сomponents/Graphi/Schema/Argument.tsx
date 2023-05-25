import { Flex } from '@mantine/core';
import { GraphQLArgument } from 'graphql';
import { SchemaComponents } from './const';
import { SchemaType } from './SchemaType';
import { parseType } from './utils';

interface IArgumentProps {
  argument: GraphQLArgument;
  onClick: (name: string, component: SchemaComponents) => void;
}

export const Argument = ({ argument, onClick }: IArgumentProps) => {
  const type = argument.type;
  const parsedType = parseType(type);
  const [prefix, typeName, postfix] = parsedType.split('-');
  return (
    <Flex key={argument.name}>
      <span>{argument.name}:&nbsp;</span>
      <SchemaType prefix={prefix} name={typeName} postfix={postfix} onClick={onClick} />
    </Flex>
  );
};

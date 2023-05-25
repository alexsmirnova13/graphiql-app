import { Flex } from '@mantine/core';
import { GraphQLArgument } from 'graphql';
import { Argument } from './Argument';
import { SchemaComponents } from './const';

interface ISchemaArgsProps {
  args: GraphQLArgument[];
  onClick: (name: string, component: SchemaComponents) => void;
}

export const SchemaArgs = ({ args, onClick }: ISchemaArgsProps) => {
  return (
    <Flex>
      <span>(</span>
      {args.map((argument, i) => {
        return (
          <>
            <Argument key={argument.name} argument={argument} onClick={onClick} />
            {i === args.length - 1 ? null : <span>,&nbsp;</span>}
          </>
        );
      })}
      <span>)</span>
    </Flex>
  );
};

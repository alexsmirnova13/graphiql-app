import { Flex } from '@mantine/core';
import { Argument } from './Argument';
import { IArgument } from './interfaces';

interface IArgumentsProps {
  args: IArgument[];
}

export const Arguments = ({ args }: IArgumentsProps) => {
  return (
    <Flex>
      <span>(</span>
      {args.map((argument, i) => {
        return (
          <Flex key={argument.name}>
            <Argument argument={argument} />
            {i === args.length - 1 ? null : <span>,&nbsp;</span>}
          </Flex>
        );
      })}
      <span>)</span>
    </Flex>
  );
};

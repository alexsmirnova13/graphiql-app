import { Flex } from '@mantine/core';
import { Argument } from './Argument';
import { IArgument, IHistory } from './interfaces';

interface IArgumentsProps {
  args: IArgument[];
  onClick: (newEntry: IHistory) => void;
}

export const Arguments = ({ args, onClick }: IArgumentsProps) => {
  return (
    <Flex>
      <span>(</span>
      {args.map((argument, i) => {
        return (
          <Flex key={argument.name}>
            <Argument argument={argument} onClick={onClick} />
            {i === args.length - 1 ? null : <span>,&nbsp;</span>}
          </Flex>
        );
      })}
      <span>)</span>
    </Flex>
  );
};

import { Flex, Text } from '@mantine/core';
import { IArgument, IHistory } from './interfaces';
import { Type } from './Type';

interface IArgumentProps {
  argument: IArgument;
  onClick: (newEntry: IHistory) => void;
}

export const Argument = ({ argument, onClick }: IArgumentProps) => {
  const { type, typePostfix, typePrefix, name } = argument;
  return (
    <Flex>
      <Text>{name}:&nbsp;</Text>
      <Type prefix={typePrefix} name={type} postfix={typePostfix} onClick={onClick} />
    </Flex>
  );
};

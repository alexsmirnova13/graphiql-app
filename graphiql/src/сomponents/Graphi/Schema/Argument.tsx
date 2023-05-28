import { Flex, Text } from '@mantine/core';
import { IArgument } from './interfaces';
import { Type } from './Type';

interface IArgumentProps {
  argument: IArgument;
}

export const Argument = ({ argument }: IArgumentProps) => {
  const { type, typePostfix, typePrefix, name } = argument;
  return (
    <Flex>
      <Text>{name}:&nbsp;</Text>
      <Type prefix={typePrefix} name={type} postfix={typePostfix} />
    </Flex>
  );
};

import { Flex } from '@mantine/core';
import { IArgument, IHistory } from './interfaces';
import { Type } from './Type';

interface IArgumentProps {
  argument: IArgument;
  onClick: (newEntry: IHistory) => void;
}

export const Argument = ({ argument, onClick }: IArgumentProps) => {
  // if (argument) {
  //   const type = argument.type;
  //   const parsedType = parseType(type);
  //   const [prefix, parsedTypeName, postfix] = parsedType.split('-');
  //   return (
  //     <Flex>
  //       <span>{argument.name}:&nbsp;</span>
  //       <Type prefix={prefix} name={parsedTypeName} postfix={postfix} onClick={onClick} />
  //     </Flex>
  //   );

  const { type, typePostfix, typePrefix, name } = argument;
  return (
    <Flex>
      <span>{name}:&nbsp;</span>
      <Type prefix={typePrefix} name={type} postfix={typePostfix} onClick={onClick} />
    </Flex>
  );

  return null;
};

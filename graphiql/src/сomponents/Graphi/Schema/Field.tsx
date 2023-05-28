import { Flex } from '@mantine/core';
import { GraphQLOutputType } from 'graphql';
import { FieldName } from './FieldName';
import { IArgument } from './interfaces';
import { Arguments } from './Arguments';
import { Type } from './Type';
import { parseType } from './utils';

export interface IFieldProps {
  name: string;
  parentTypeName: string;
  type: GraphQLOutputType;
  args?: IArgument[];
}

export const Field = ({ name, type, args, parentTypeName }: IFieldProps) => {
  const parsedType = parseType(type);
  const [prefix, typeName, postfix] = parsedType.split('-');
  const argsArr = args?.map((arg) => ({
    name: arg.name,
    type: typeName,
    typePrefix: prefix,
    typePostfix: postfix,
  }));
  return (
    <Flex wrap={'wrap'}>
      <FieldName name={name} parentTypeName={parentTypeName} />
      <span>&nbsp;</span>
      {argsArr && Boolean(argsArr.length) && <Arguments args={argsArr} />}
      <span>:&nbsp;</span>
      <Type prefix={prefix} name={typeName} postfix={postfix} />
    </Flex>
  );
};

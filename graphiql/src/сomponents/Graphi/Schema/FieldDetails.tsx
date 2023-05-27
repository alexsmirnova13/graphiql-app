import { Flex } from '@mantine/core';
import { Argument } from './Argument';
import { IArgument, IHistory, IType } from './interfaces';
import { Type } from './Type';

export interface IFieldDetailsProps {
  description?: string;
  type: IType;
  args?: IArgument[];
  onClick: (newEntry: IHistory) => void;
}

export const FieldDetails = ({
  description,
  type,
  type: { prefix, name, postfix },
  args,
  onClick,
}: IFieldDetailsProps) => {
  return (
    <Flex direction={'column'}>
      <span>{description}</span>
      {type && (
        <>
          <p>Type</p>
          <p>
            <Type prefix={prefix} name={name} postfix={postfix} onClick={onClick} />
          </p>
        </>
      )}

      {Boolean(args && args.length) && (
        <>
          <p>Arguments</p>
          {args?.map((argument) => (
            <Argument key={argument.name} argument={argument} onClick={onClick} />
          ))}
        </>
      )}
    </Flex>
  );
};

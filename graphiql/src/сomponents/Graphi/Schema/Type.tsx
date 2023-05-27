import { IHistory } from './interfaces';

interface ITypeProps {
  prefix?: string;
  postfix?: string;
  name: string;
  onClick: (newEntry: IHistory) => void;
}

export const Type = ({ prefix, postfix, name, onClick }: ITypeProps) => {
  return (
    <span>
      {prefix && <span>{prefix}</span>}
      <span onClick={() => onClick({ typeName: name })}>{name}</span>
      {postfix && <span>{postfix}</span>}
    </span>
  );
};

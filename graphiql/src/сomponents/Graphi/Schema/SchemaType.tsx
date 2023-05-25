import { SchemaComponents } from './const';

interface ISchemaTypeProps {
  prefix?: string;
  postfix?: string;
  name: string;
  onClick: (name: string, component: SchemaComponents) => void;
}

export const SchemaType = ({ prefix, postfix, name, onClick }: ISchemaTypeProps) => {
  return (
    <span>
      {prefix && <span>{prefix}</span>}
      <span onClick={() => onClick(name, SchemaComponents.TYPE)}>{name}</span>
      {postfix && <span>{postfix}</span>}
    </span>
  );
};

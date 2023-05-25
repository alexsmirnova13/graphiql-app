import { SchemaComponents } from './const';

interface IFieldNameProps {
  name: string;
  onClick: (name: string, component: SchemaComponents) => void;
}

export const FieldName = ({ name, onClick }: IFieldNameProps) => {
  return <span onClick={() => onClick(name, SchemaComponents.FIELD)}>{name}</span>;
};

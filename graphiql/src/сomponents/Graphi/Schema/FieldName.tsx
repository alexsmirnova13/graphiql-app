import { IHistory } from './interfaces';

interface IFieldNameProps {
  parentTypeName: string;
  name: string;
  onClick: (newEntry: IHistory) => void;
}

export const FieldName = ({ name, parentTypeName, onClick }: IFieldNameProps) => {
  return (
    <span
      style={{ cursor: 'pointer', color: 'orange' }}
      onClick={() => onClick({ fieldName: name, typeName: parentTypeName })}
    >
      {name}
    </span>
  );
};

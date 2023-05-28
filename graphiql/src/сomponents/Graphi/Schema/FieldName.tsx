import { setFocusedFieldName } from '../../../store/docsSlice';
import { useAppDispatch } from '../../../store/hooks';

interface IFieldNameProps {
  parentTypeName: string;
  name: string;
}

export const FieldName = ({ name, parentTypeName }: IFieldNameProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setFocusedFieldName({ name, parentTypeName }));
  };

  return (
    <span style={{ cursor: 'pointer', color: 'orange' }} onClick={handleClick}>
      {name}
    </span>
  );
};

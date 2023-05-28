import { setFocusedTypeName } from '../../../store/docsSlice';
import { useAppDispatch } from '../../../store/hooks';

interface ITypeProps {
  prefix?: string;
  postfix?: string;
  name: string;
}

export const Type = ({ prefix, postfix, name }: ITypeProps) => {
  const dispatch = useAppDispatch();
  const handleTypeClick = () => {
    dispatch(setFocusedTypeName(name));
  };
  return (
    <span>
      {prefix && <span>{prefix}</span>}
      <span style={{ cursor: 'pointer', color: 'green' }} onClick={handleTypeClick}>
        {name}
      </span>
      {postfix && <span>{postfix}</span>}
    </span>
  );
};

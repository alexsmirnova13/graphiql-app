import { GraphQLNamedType, GraphQLObjectType } from 'graphql';
import { SchemaComponents } from './const';
import { FieldDetails } from './FieldDetails';
import { SchemaField } from './SchemaField';

interface ITypeDetailsProps {
  type: GraphQLNamedType;
  focusedFieldName?: string;
  onClick: (name: string, component: SchemaComponents) => void;
}

export const TypeDetails = ({ type, onClick, focusedFieldName }: ITypeDetailsProps) => {
  if (type instanceof GraphQLObjectType) {
    const fields = type.getFields();
    if (focusedFieldName) {
      const field = fields[focusedFieldName];
      return <FieldDetails field={field} args={field.args} onClick={onClick} type={field.type} />;
    } else {
      return (
        <>
          {[...Object.values(fields)].map((value) => {
            return (
              <SchemaField
                key={value.name}
                name={value.name}
                type={value.type}
                args={value.args}
                onClick={onClick}
              />
            );
          })}
        </>
      );
    }
  }

  return <p>{type.description}</p>;
};

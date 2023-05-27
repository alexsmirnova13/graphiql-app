import { GraphQLInputType, GraphQLList, GraphQLNonNull, GraphQLOutputType } from 'graphql';

export const parseType = (type: GraphQLInputType | GraphQLOutputType): string => {
  if (type instanceof GraphQLNonNull) {
    return `${parseType(type.ofType)}!`;
  } else if (type instanceof GraphQLList) {
    return `[${parseType(type.ofType)}]`;
  }
  return `-${type.name}-`;
};

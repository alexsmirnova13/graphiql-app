export interface IHistory {
  typeName?: string;
  fieldName?: string;
  search?: string;
}

export interface IType {
  name: string;
  prefix?: string;
  postfix?: string;
}

export interface IArgument {
  name: string;
  type: string;
  typePrefix?: string;
  typePostfix?: string;
}

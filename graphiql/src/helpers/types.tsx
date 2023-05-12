export type FormType = {
  email: string;
  password: string;
};

export type UserState = {
  id?: string;
  name?: string;
  email: string;
};

export type UserExtension = {
  token: string;
};

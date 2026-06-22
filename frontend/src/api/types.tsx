export type FilterTypes = {
  author: string;
  type: string;
  tag: string;
};

export type UserType = {
  username: string;
  email: string;
};

export type TagType = {
  tag: string;
};
interface SpiderBase {
  id?: number;
  name: string;
  type: string;
  description: string;
}
export interface SpiderType extends SpiderBase {
  id: number;
  author: UserType;
  tags: TagType[];
  date_created: string;
}
export interface SpiderTypeCreate extends SpiderBase {
  tags: string;
}

export type LoginFormType = {
  username: string;
  password: string;
};
export type LoginResponse = {
  username: string;
  password: string;
  user: UserType;
  access: string;
  refresh: string;
};
export type TokenType = {
  access: string;
  refresh: string;
};

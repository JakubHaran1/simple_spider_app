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
  name: string;
  type: string;
  description: string;
}
export interface SpiderType extends SpiderBase {
  author: UserType;
  tags: TagType[];
  date_created: string;
}
export interface SpiderTypeCreate extends SpiderBase {
  tags: string;
}

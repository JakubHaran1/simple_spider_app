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

export type SpiderType = {
  author: UserType;
  name: string;
  type: string;
  description: string;
  tag: TagType[];
  date_created: string;
};

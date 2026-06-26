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
export interface SpiderType {
  id: number;
  author: UserType;
  name: string;
  type: string;
  tags_detail: TagType[];
  spider_img_detail: ImgTypeDetail[];
  description: string;
  date_created: string;
}

export interface SpiderTypeCreate extends SpiderBase {
  spider_img: ImgType;
  tags: string;
}

export type LoginFormType = {
  username: string;
  email?: string;
  password: string;
};
export type SignUpType = {
  username: string;
  email: string;
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

export type ImgType = {
  img: File | null;
};

export type ImgTypeDetail = {
  img: string;
};

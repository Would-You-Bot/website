interface UserType {
  id: string;
  avatar: string;
  username: string;
  global_name: string;
  access_token: string;
}

interface MemberType {
  global_name: string | undefined;
  user: UserType;
  iat: number;
  exp: number;
}

export default interface Member {
  member: MemberType;
}

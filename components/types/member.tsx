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
    iat: number; // Unix timestamp for issued at
    exp: number; // Unix timestamp for expiration 
  }

  export default interface Member {
    member: MemberType;
  }
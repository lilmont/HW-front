export interface IJWTDecodedToken {
  exp: number;
  name: string;
  sub: string;
  username?: string;
}
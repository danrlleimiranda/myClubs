export type LoginData = {
  email: string,
  password: string
};

export default interface ILogin{
  sign(data: LoginData): string
}

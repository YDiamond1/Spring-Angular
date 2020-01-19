export class UserCredentials {
  public username: string;
  public password: string;
  constructor( _login: string , _password: string) {
    this.username = _login;
    this.password = _password;
  }

}

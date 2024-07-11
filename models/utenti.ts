export class ModelUtenti {
  id_devices: Array<number> = [];
  Pk: number;
  username: string;
  email: string;
  password: string;
  primaryKey!: number;

  constructor(email: string, password: string) {
    this.Pk = Math.random();
    this.username = email.split("@")["0"];
    this.email = email;
    this.password = password;
  }
}

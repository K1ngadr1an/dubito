export class ModelDevices {
  Pk: number;
  token: number;
  id_device: number;
  constructor(token: number, id_device: number) {
    this.Pk = Math.random();
    this.token = token;
    this.id_device = id_device;
  }
}

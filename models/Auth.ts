export class ModelAuth {
  Pk: number;
  token: number;
  refereceKeyUtenti: number;
  devices: number;
  referenceKeyUser!: number;
  constructor(referenceKeyUtenti: number, devices: number) {
    this.Pk = Math.random();
    this.token = Math.random();
    this.refereceKeyUtenti = referenceKeyUtenti;
    this.devices = devices;
  }
}

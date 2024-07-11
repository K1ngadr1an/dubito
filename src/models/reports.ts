export class ModelReports {
  Pk: number;
  referenceKeyUtenti: number;
  referenceKeyAnnunci: number;
  description: string;
  status: string;
  constructor(
    referenceKeyUtenti: number,
    referenceKeyAnnunci: number,
    description: string,
    status: string
  ) {
    this.Pk = Math.random();
    this.referenceKeyUtenti = referenceKeyUtenti;
    this.referenceKeyAnnunci = referenceKeyAnnunci;
    this.description = description;
    this.status = status;
  }
}

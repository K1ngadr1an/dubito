export class ModelFavorites {
  Pk: number;
  referenceKeyUtenti: number;
  referenceKeyAnnunci: number;
  constructor(referenceKeyUtenti: number, referenceKeyAnnunci: number) {
    this.Pk = Math.random();
    this.referenceKeyUtenti = referenceKeyUtenti;
    this.referenceKeyAnnunci = referenceKeyAnnunci;
  }
}

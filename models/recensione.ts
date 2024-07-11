export class ModelRecensione {
  primaryKey: number;
  referenceKeyUtente: number;
  title: string;
  description: string;
  rating: number;
  data: Date;
  referencesKeyAnnuncio: number;
  constructor(
    referenceKeyUtenti: number,
    title: string,
    description: string,
    referenceKeyAnnunci: number,
    rating: number
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUtente = referenceKeyUtenti;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.data = new Date();
    this.referencesKeyAnnuncio = referenceKeyAnnunci;
  }
}

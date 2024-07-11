export class ModelAnnunci {
  title: string;
  description: string;
  category: string;
  status: string;
  price: number;
  photo: string;
  address: string;
  sold: boolean;
  phone: string;
  createdata: Date;
  refereceKeyUtenti: number;
  idAnnunci: number;
  constructor(
    title: string,
    description: string,
    category: string,
    status: string,
    price: number,
    photo: string,
    address: string,
    sold: boolean,
    phone: string,
    referenceKeyUtenti: number
  ) {
    this.createdata = new Date();
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.price = price;
    this.photo = photo;
    this.address = address;
    this.sold = sold;
    this.phone = phone;
    this.refereceKeyUtenti = referenceKeyUtenti;
    this.idAnnunci = Math.random();
  }
}

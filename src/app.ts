import { ModelAnnunci } from "./models/annunci";
import { ModelAuth } from "./models/Auth";
import { ModelFavorites } from "./models/favorites";
import { ModelRecensione } from "./models/recensione";
import { ModelReports } from "./models/reports";
import { ModelUtenti } from "./models/utenti";
import DocAPI from "./models/DocAPI";
import { ModelDevices } from "./models/devices";

export class App {
  users: Array<ModelUtenti> = [];
  ads: Array<ModelAnnunci> = [];
  rewiews: Array<ModelRecensione> = [];
  auth: Array<ModelAuth> = [];
  reports: Array<ModelReports> = [];
  favorites: Array<ModelFavorites> = [];
  devices: Array<ModelDevices> = [];
  register(email: string, password: string) {
    let user = new ModelUtenti(email, password);
    const userFound = this.users.find(function (user) {
      if (user.email === email) return true;
      return false;
    });
    if (!!userFound) return false;
    else {
      const newUser = new ModelUtenti(email, password);
      this.users = [...this.users, newUser];
      return true;
    }
  }
  login(email: string, password: string, id_device: number) {
    let userFound = this.users.find(function (user: ModelUtenti) {
      if (email === user.email && password === user.password) return true;
      return false;
    });
    if (!!userFound) {
      const newAuth = new ModelAuth(userFound.Pk, id_device);
      this.auth = [...this.auth, newAuth];
      return newAuth.token;
    } else console.log("Utente non registrato");
    userFound = this.users.find(function (user: ModelUtenti) {
      if (user.id_devices.length <= 2) return true;
      else console.log("Hai raggiunto il limite massimo di dispositivi");
    });
  }

  logout(token: number) {
    //cerca nell'array auth il token, se lo trova
    const authFound = this.auth.find(function (auth) {
      if (auth.token === token) return true;
      return false;
    });
    if (!!authFound) {
      this.auth = this.auth.filter(function (auth) {
        if (auth.token === token) return false;
        return true;
      });
      return true;
    } else return false;
  }
  createAd(
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
    const classModelAnnunci = new ModelAnnunci(
      title,
      description,
      category,
      status,
      price,
      photo,
      address,
      sold,
      phone,
      referenceKeyUtenti
    );
    this.ads = [...this.ads, classModelAnnunci];
    return true;
    //Legge i dati e crea l'annuncio
  }
  updateAd() {
    //Legge i dati e li modifica
  }

  deleteAd(token: number, idAd: number) {
    //Controlla il token, trova l'annuncio tramite l'id ed elimina l'annuncio
    const authData = this.auth.find(function (data) {
      if (data.token === token) {
        return true;
      } else {
        return false;
      }
    });
    if (!!authData) {
      this.ads = this.ads.filter(function (dataAd) {
        if (idAd != dataAd.idAnnunci) {
          return true;
        } else {
          return false;
        }
      });
      return true;
    }
    return false;
  }

  createReview(
    titolo: string,
    token: number,
    keyAnnunci: number,
    description: string,
    rating: number
  ) {
    //Controlla il token, traghetta l'annuncio e legge i dati
    const authData = this.auth.find(function (data) {
      if (data.token === token) {
        return true;
      } else {
        return false;
      }
    });
    if (!!authData) {
      const NewReview = new ModelRecensione(
        authData.refereceKeyUtenti,
        titolo,
        description,
        rating,
        keyAnnunci
      );
      this.rewiews = [...this.rewiews, NewReview];
      console.log("Recensione aggiunta con successo");
    }
  }
  deleteReview(token: number, idReview: number) {
    const authFound = this.auth.find(function (el) {
      if (el.token === token) return true;
      else return false;
    });
    if (!authFound) console.log("token non trovato ");
    else {
      const reviewFound = this.rewiews.find(function (review) {
        if (review.primaryKey === idReview) return true;
        else return false;
      });
      if (!reviewFound) console.log("recensione non trovata");
      else {
        if (reviewFound.referenceKeyUtente !== authFound.refereceKeyUtenti)
          console.log("errore 404");
        else {
          this.rewiews = this.rewiews.filter(function (review) {
            if (review.primaryKey === idReview) return false;
            else return true;
          });
          console.log("recensione eliminata");
        }
      }
    }
  }

  deleteAccount(referenceKeyUtenti: number, token: number) {
    //Controlla il token, elimina l'utente
    const authData = this.auth.find(function (data) {
      if (data.token === token) {
        return true;
      } else {
        return false;
      }
    });
    if (!!authData) {
      this.users = this.users.filter(function (data) {
        if (data.primaryKey === referenceKeyUtenti) return false;
        else return true;
      });
    }
  }
  getAuthbyToken(authToken: number) {
    const authFound = this.auth.find(function (auth) {
      if (auth.token === authToken) return true;
      else return false;
    });
    if (!!authFound) return authFound;
    else return null;
  }
  addFavorite(token: number, referencekeyAd: number) {
    const userAuth = this.getAuthbyToken(token);
    if (!userAuth) console.log("token non valido!");
    else {
      const newFavourite = new ModelFavorites(
        userAuth.referenceKeyUser,
        referencekeyAd
      );
      this.favorites = [...this.favorites, newFavourite];
      console.log("elemento aggiunto ai preferiti");
    }
  }
}
const apis = {
  login: new DocAPI("/Login", "POST", false),
  register: new DocAPI("/Register", "POST", false),
  logout: new DocAPI("/Auth/Logout", "POST", true),
  createAd: new DocAPI("/Annunci", "POST", true),
  updateAd: new DocAPI("/Annunci/{PrimaryKeyAd},/email", "PATCH", true),
  deleteAd: new DocAPI("/Annunci", "DELETE", true),
  createReview: new DocAPI("/Recensioni", "POST", true),
  deleteReview: new DocAPI("/Recensioni", "DELETE", true),
  deleteAccount: new DocAPI("/Utenti/{PrimaryKeyUtenti}", "DELETE", true),
  addFavorite: new DocAPI("/Preferiti", "POST", true),
  getFavorites: new DocAPI("/Preferiti", "GET", true),
  getAds: new DocAPI("/Annunci", "GET", true),
  getReviews: new DocAPI("/Recensioni", "GET", true),
  getAuthbyToken: new DocAPI("/Auth", "GET", true),
  getReports: new DocAPI("/Reports", "GET", true),
  getProfile: new DocAPI("/Utenti", "GET", true),
};

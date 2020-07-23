export interface BggGame {
  gameId: number;
  name: string;
  rank: number;
  thumbnail: string;
  yearPublished: number;
}

export interface GoogleUser {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
}

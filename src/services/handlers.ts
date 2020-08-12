import { getContext } from "svelte";
// import type { GoogleUser } from '../models';

export const login = async () => {
  const app = getContext("firebase").getFirebase();

  const provider = new app.auth.GoogleAuthProvider();
  try {
    const result = await app.auth().signInWithPopup(provider);
  } catch (err) {
    console.log(err);
  }
};

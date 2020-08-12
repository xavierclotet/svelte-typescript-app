/* import { readable, Readable } from "svelte/store";
import { authState } from "rxfire/auth";
import { auth, googleProvider } from "../firebase";
import { map } from "rxjs/operators";
import { GoogleUser } from "../models";

export const user: Readable<GoogleUser> = readable(null, (set) => {
  const unsubscribe = authState(auth)
    .pipe(map((user) => (user?.providerData[0] ? user.providerData[0] : null)))
    .subscribe((u: GoogleUser) => {
      set(u);
    });
});
 */

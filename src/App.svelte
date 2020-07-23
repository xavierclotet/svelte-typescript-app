<script lang="ts">
  import Profile from "./Profile.svelte";
  /* import Todos from "./Todos.svelte"; */
  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";
  import { map } from "rxjs/operators";
  import Hotness from "./Hotness.svelte";

  interface GoogleUser {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
  }

  let user: GoogleUser;
  const unsubscribe = authState(auth)
    .pipe(map((user) => user?.providerData[0]))
    .subscribe((u: GoogleUser) => {
      user = u;
    });
  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<section>
  {#if user}
    <Profile {user} />
    <button on:click={() => auth.signOut()}>Logout</button>
    <hr />
    <!-- <Todos uid={user.uid} /> -->
    <Hotness top="20" />
  {:else}
    <button on:click={login}>Login amb Google</button>
  {/if}
</section>

<script>
  import Profile from "./components/Profile.svelte";
  /* import Todos from "./Todos.svelte"; */
  import { auth, googleProvider } from "./firebase";
  import { authState } from "rxfire/auth";
  import { map } from "rxjs/operators";
  import Hotness from "./components/Hotness.svelte";
  import InputNumber from "./components/InputNumber.svelte";

  /*   interface GoogleUser {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
  } */

  let user;
  let top = 10;

  $: console.log(top);

  const unsubscribe = authState(auth)
    .pipe(map((user) => user?.providerData[0]))
    .subscribe((u) => {
      user = u;
    });
  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<section>
  {#if user}
    <Profile {user} />
    <button
      class="mx-2 mt-4 inline-flex items-center justify-center px-4 py-2
      text-base leading-5 rounded-md border font-medium shadow-sm transition
      ease-in-out duration-150 focus:outline-none focus:shadow-outline
      bg-green-600 border-green-600 text-gray-100 hover:bg-green-500
      hover:border-green-500 hover:text-gray-100"
      on:click={() => auth.signOut()}>
      Logout
    </button>
    <hr />
    <!-- <Todos uid={user.uid} /> -->
    <!-- <InputNumber bind:value={top} /> -->
    Show
    <input type="number" bind:value={top} min="1" max="50" />
    <Hotness {top} />
  {:else}
    <button
      class="mt-4 inline-flex items-center justify-center px-4 py-2 text-base
      leading-5 rounded-md border font-medium shadow-sm transition ease-in-out
      duration-150 focus:outline-none focus:shadow-outline bg-green-600
      border-green-600 text-gray-100 hover:bg-green-500 hover:border-green-500
      hover:text-gray-100"
      on:click={login}>
      Login amb Google
    </button>
  {/if}
</section>

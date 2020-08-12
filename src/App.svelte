<script lang="ts">
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import * as firebase from "firebase/app";
  // import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";

  import { FirebaseApp } from "sveltefire";
  import { firebaseConfig } from "./firebase";

  export const provider = new firebase.auth.GoogleAuthProvider();
  firebase.initializeApp(firebaseConfig);
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>

<!-- <section>

  <header class="flex justify-between bg-gray-900">

    {#if user}
      <div>
        <Profile {user} />
      </div>
    {/if}

    <div>
      {#if user}
        <button
          class="mx-2 my-2 inline-flex items-center justify-center px-2 py-1
          text-base leading-5 rounded-md border font-medium shadow-sm transition
          ease-in-out duration-150 focus:outline-none focus:shadow-outline
          bg-teal-600 border-teal-600 text-gray-100 hover:bg-teal-500
          hover:border-teal-500 hover:text-gray-100"
          on:click={() => auth.signOut()}>
          Logout
        </button>
      {:else}
        <button
          class="mx-2 my-2 inline-flex items-center justify-center px-2 py-1
          text-base leading-5 rounded-md border font-medium shadow-sm transition
          ease-in-out duration-150 focus:outline-none focus:shadow-outline
          bg-green-600 border-green-600 text-gray-100 hover:bg-green-500
          hover:border-green-500 hover:text-gray-100"
          on:click={login}>
          Login amb Google
        </button>
      {/if}

    </div>
  </header>

  
  {#if user}
    <div class="flex mx-2 text-md">
      <div class="mr-4 py-2">Show</div>
      <input
        type="number"
        bind:value={top}
        min="1"
        max="50"
        class="block appearance-none w-15 border border-gray-700
        hover:border-gray-500 px-4 py-2 pr-8 rounded shadow outline-none
        focus:shadow-outline" />
      <div class="ml-2 py-2">results</div>
    </div>
    <Hotness {top} />
  {/if}
</section> -->

<!-- <InputNumber bind:value={top} /> -->

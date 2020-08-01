<script>
  import { url, isActive } from "@sveltech/routify";
  import { auth, googleProvider } from "../firebase";
  import { user } from "../stores/user";
  import Profile from "./Profile.svelte";
  import logo from "../statics/legamoleftframegrande.jpg";
  const links = [
    ["/index", "Home"],
    ["/hotness", "Hotness"],
    ["/test", "Test"],
    ["/about", "About"],
  ];

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<nav class="flex justify-between bg-white px-4 shadow-md ">

  <!-- {user ? 'justify-between' : 'justify-between'} -->
  {#if $user}
    <div>
      <Profile user={$user} />
    </div>
    <div class="flex justify-center">
      {#each links as [path, name]}
        <a
          class:text-teal-500={$isActive(path)}
          class:border-teal-500={$isActive(path)}
          class="no-underline text-gray-500 border-b-2 uppercase tracking-wide
          font-bold text-xs py-3 mr-8"
          href={$url(path)}>
          {name}
        </a>
      {/each}
    </div>
    <div>
      <button
        class="mx-2 my-2 inline-flex items-center justify-center px-2 py-1
        text-base leading-5 rounded-md border font-medium shadow-sm transition
        ease-in-out duration-150 focus:outline-none focus:shadow-outline
        bg-teal-600 border-teal-600 text-gray-100 hover:bg-teal-500
        hover:border-teal-500 hover:text-gray-100"
        on:click={() => auth.signOut()}>
        Logout
      </button>
    </div>
  {:else}
    <div>
      <img
        src={logo}
        alt="stas tarat"
        title="stas tarat"
        class="px-2 py-2 rounded-full w-12 h-12" />
    </div>
    <div>
      <button
        class="mx-2 my-2 inline-flex items-center justify-center px-2 py-1
        text-base leading-5 rounded-md border font-medium shadow-sm transition
        ease-in-out duration-150 focus:outline-none focus:shadow-outline
        bg-green-600 border-green-600 text-gray-100 hover:bg-green-500
        hover:border-green-500 hover:text-gray-100"
        on:click={login}>
        Login amb Google
      </button>
    </div>
  {/if}

</nav>
<!-- {JSON.stringify($user)} -->

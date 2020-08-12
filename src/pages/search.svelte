<script>
  import { goto } from "@sveltech/routify";

  let game;

  function handleButton() {
    $goto("/" + game + "/picture");
  }
</script>

<div
  class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
  Buscar
</div>

<input bind:value={game} />
<button on:click={handleButton}>Buscar</button>

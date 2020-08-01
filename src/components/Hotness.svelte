<script lang="ts">
  import { onMount } from "svelte";

  interface BggGame {
    gameId: number;
    name: string;
    rank: number;
    thumbnail: string;
    yearPublished: number;
  }
  export let top: number = 10;
  $: title = `Hotness BGG TOP ${top}`;
  let hotness: BggGame[] = [];

  onMount(async () => {
    const res = await fetch("http://bgg-json.azurewebsites.net/hot");
    hotness = await res.json();
  });

  function goToBgg(game: BggGame): void {
    const url = `https://boardgamegeek.com/boardgame/${game.gameId}`;
    window.open(url);
  }
</script>

<!-- <pre>{JSON.stringify($hotness)}</pre> -->

<div
  class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
  {title}
</div>

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

<div class="flex flex-wrap mx-2">

  {#each hotness.slice(0, top) as game}
    <div
      class="flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl
      rounded-lg w-50">
      <div class="flex flex-col justify-between w-60 overflow-hidden">
        <div
          class="ml-4 uppercase text-gray-600 dark:text-gray-400 mb-2
          hover:underline cursor-pointer "
          on:click={goToBgg(game)}>
          <span class="font-bold">{game.rank}.</span>
          {game.name.substring(0, 10)} ({game.yearPublished})
        </div>
        <img
          class="h-15 w-15 rounded-full"
          src={game.thumbnail}
          alt={game.name}
          title="{game.rank}.- {game.name}"
          style="height: 158px; width: 158px"
          target="_blank" />

      </div>

    </div>
  {/each}

</div>

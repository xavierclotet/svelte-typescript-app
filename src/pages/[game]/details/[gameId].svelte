<script>
  import { params, goto } from "@sveltech/routify";
  import { onMount } from "svelte";
  let gameId = $params.gameId;
  let game = null;
  onMount(async () => {
    const res = await fetch(
      "http://bgg-json.azurewebsites.net/thing/" + gameId
    );
    game = await res.json();
  });
  function goToBgg(gameId) {
    const url = "https://boardgamegeek.com/boardgame/" + gameId;
    window.open(url);
  }
</script>

{#if game !== null}
  <div
    class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
    {game.name} ({game.averageRating})
  </div>

  <div
    class="flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl">
    <div class="flex flex-col justify-between overflow-hidden">
      <div
        class="ml-4 uppercase text-gray-600 dark:text-gray-400 mb-2
        hover:underline cursor-pointer ">
        <span class="font-bold">{game.rank}.</span>
        {game.name} ({game.yearPublished})
      </div>
      <img
        on:click={goToBgg(gameId)}
        class="h-15 w-15 rounded-full "
        src={game.thumbnail}
        alt={game.name}
        title="{game.rank}.- {game.name}"
        style="height: 158px; width: 158px"
        target="_blank" />

      <!-- <div>{game.description}</div> -->
      <div>
        <ul>
          {#each game.artists as artist}
            <li>{artist}</li>
          {/each}
        </ul>
      </div>

      <p>{game.description}</p>
      {#if game.expansions}
        <p>Expansions: {game.expansions?.length}</p>
        <ul>
          {#each game.expansions as expansion}
            <li>
              <div
                class="ml-4 uppercase text-gray-600 dark:text-gray-400 mb-2
                hover:underline cursor-pointer "
                on:click={goToBgg(expansion.gameId)}>
                {expansion.name}
              </div>

            </li>
          {/each}
        </ul>
      {/if}
    </div>

  </div>
{:else}Carregant detalls de {gameId}{/if}

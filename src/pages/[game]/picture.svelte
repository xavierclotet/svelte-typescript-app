<script>
  import { params } from "@sveltech/routify";
  import { onMount } from "svelte";
  let game = $params.game;
  let promise = Promise.resolve([]);
  const url = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${game}`; // &exact=1
  const urlGame = `http://bgg-json.azurewebsites.net/thing/`;
  async function fetchGame() {
    let response = await fetch(url);

    if (response.ok) {
      const data = await response.text();
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");
      let idGame = xmlDoc
        .getElementsByTagName("items")[0]
        .getElementsByTagName("item")[0]
        .getAttribute("id");
      response = await fetch(urlGame + idGame);
      return response.json();
    } else {
      throw new Error("Error fetching game");
    }
  }

  function goToBgg(id) {
    const url = `https://boardgamegeek.com/boardgame/${id}`;
    window.open(url);
  }

  function handleClick() {
    // Now set it to the real fetch promise
    promise = fetchGame();
  }

  onMount(async () => {
    handleClick();
  });
</script>

<div
  class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
  {game}
</div>

{#await promise}
  <p>Carregant {game}...</p>
{:then game}
  <div
    class="flex px-4 py-4 justify-between bg-white dark:bg-gray-600 shadow-xl
    rounded-lg w-50">
    <img
      class="h-15 w-15 rounded-full"
      src={game.image}
      alt={game.name}
      title="{game.rank}.- {game.name}"
      style="height: 158px; width: 158px"
      target="_blank" />
  </div>

  <div
    class="ml-4 uppercase text-gray-600 dark:text-gray-400 mb-2 hover:underline
    cursor-pointer "
    on:click={goToBgg(game.gameId)}>
    {game.rank}. {game.name} ({game.yearPublished})
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

  <!-- <pre>{JSON.stringify(game)}</pre> -->

{:catch error}
  {error}
{/await}

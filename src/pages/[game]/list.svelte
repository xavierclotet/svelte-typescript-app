<script>
  import { params, goto } from "@sveltech/routify";
  import { onMount } from "svelte";

  let game = $params.game;
  let gamesParsed = [];
  let promise = Promise.resolve([]);
  const url = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${game}`; // &exact=1
  const urlGame = `http://bgg-json.azurewebsites.net/thing/`;
  async function fetchGame() {
    let response = await fetch(url);

    if (response.ok) {
      const data = await response.text();
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");

      gamesParsed = parseXmlGames(xmlDoc);
      /*  response = await fetch(urlGame + idGame);
      return response.json(); */
    } else {
      throw new Error("Error fetching game");
    }
  }
  function parseXmlGames(xmlDoc) {
    let xmlGames = xmlDoc
      .getElementsByTagName("items")[0]
      .getElementsByTagName("item");

    let games = [];
    for (let index = 0; index < xmlGames.length; index++) {
      const idGame = xmlGames[index] ? xmlGames[index].getAttribute("id") : "";
      const nameGame = xmlGames[index].getElementsByTagName("name")[0]
        ? xmlGames[index].getElementsByTagName("name")[0].getAttribute("value")
        : "";
      const yearGame = xmlGames[index].getElementsByTagName("yearpublished")[0]
        ? xmlGames[index]
            .getElementsByTagName("yearpublished")[0]
            .getAttribute("value")
        : "";
      if (nameGame) {
        games.push({
          id: idGame,
          name: nameGame,
          yearpublished: yearGame,
        });
      }
    }
    return games;
  }

  function goToDetails(gameId) {
    $goto("/" + game + "/details/" + gameId);
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
  {game} trobat en {gamesParsed.length} jocs
</div>

<ul class="mx-4">
  {#each gamesParsed as game}
    <li on:click={goToDetails(game.id)} class="cursor-pointer">
      {game.name} ({game.yearpublished})
    </li>
  {/each}
</ul>

<!-- {#await promise}
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


{:catch error}
  {error}
{/await}
 -->

<script>
  import { params } from "@sveltech/routify";
  import { onMount } from "svelte";
  let game = $params.game;
  let promise = Promise.resolve([]);
  const url = `https://www.boardgamegeek.com/xmlapi2/search?type=boardgame&query=${game}&exact=1`;

  async function fetchGame() {
    const response = await fetch(url);

    if (response.ok) {
      const data = response.text();
      return data;
      /*   console.log("fetchGame -> data", data);
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");
      return xmlDoc.getElementsByTagName("items")[0]; */
    } else {
      throw new Error("Error fetching game");
    }
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
  {game}
  <!-- <a href="https://boardgamegeek.com/{response.items[0].href}">
    response.items[0].name ({response[0].yearpublished})
  </a>

  <img
    src="https://boardgamegeek.com/image/{response.items[0].rep_imageid}/gloomhaven"
    alt="" /> -->
{:catch error}
  {error}
{/await}

<script>
  import Todos from "../components/Todos.svelte";
  import { User } from "sveltefire";
</script>

<div
  class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
  Todos
</div>
<User let:user>
  <div class="px-2 py-2">
    <Todos uid={user.uid} />
  </div>
  <div slot="signed-out">
    <p class="mx-2">Fes login amb la teva compta Google per poder entrar.</p>
  </div>
</User>

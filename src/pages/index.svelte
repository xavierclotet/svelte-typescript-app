<script>
  import { user } from "../stores/user";
</script>

<div
  class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
  Benvingut a bordu!
</div>

{#if $user}
  <p class="mx-2">Ei {$user.displayName} que bueno q viniste!</p>
{:else}
  <p class="mx-2">Fes login amb la teva compta Google per poder entrar.</p>
{/if}

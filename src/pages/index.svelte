<script>
  import { User } from "sveltefire";
  import { metatags } from "@sveltech/routify";

  metatags.title = "Stas tarat";
  metatags.description = "Stas tarat app";
</script>

<div
  class="text-sm bg-teal-700 text-white mb-6 rounded px-2 py-2 mx-2 uppercase">
  Benvingut a bordu!
</div>

<User let:user let:auth>
  <p class="mx-2">Ei {user.displayName} que bueno q viniste!</p>
  <div slot="signed-out">
    <p class="mx-2">Fes login amb la teva compta Google per poder entrar.</p>
  </div>
</User>

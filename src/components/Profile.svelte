<script lang="ts">
  interface GoogleUser {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
  }
  // import { GoogleUser } from "./models";
  export let user: GoogleUser;
</script>

<img
  src={user.photoURL}
  width="75"
  alt={user.displayName}
  title={user.displayName}
  class="px-2 py-2 rounded-full w-12 h-12" />

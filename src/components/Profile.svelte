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

<h3>Hola {user.displayName}!</h3>

<img src={user.photoURL} width="100" alt="user avatar" />
<!-- <p>Your userID is { uid }</p> -->

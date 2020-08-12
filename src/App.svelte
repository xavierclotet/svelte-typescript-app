<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  // import * as firebase from "firebase/app";
  import firebase from "firebase/app";
  import "firebase/auth";
  import "firebase/firestore";

  import { FirebaseApp } from "sveltefire";
  import { firebaseConfig } from "./firebase";

  firebase.initializeApp(firebaseConfig);
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>

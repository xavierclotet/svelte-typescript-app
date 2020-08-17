<script>
  import { Collection } from "sveltefire";
  import { getContext } from "svelte";
  import TodoItem from "./TodoItem.svelte";
  import "firebase/firestore";
  import { Textfield, Button, Icon } from "svelte-mui";
  // User ID passed from parent
  export let uid;
  const app = getContext("firebase").getFirebase();
  const db = app.firestore();
  // Form Text
  let text = "";
  let placeholder = "Afegir tasca..";
  let query = (ref) => ref.where("uid", "==", uid).orderBy("created");

  function removeItem(event) {
    const { id } = event.detail;
    db.collection("todos").doc(id).delete();
  }

  function updateStatus(event) {
    const { id, newStatus } = event.detail;
    db.collection("todos").doc(id).update({ complete: newStatus });
  }

  function add() {
    if (text) {
      db.collection("todos").add({
        uid,
        text,
        complete: false,
        created: Date.now(),
      });
      text = "";
    }
  }

  const onKeyDown = (event) => {
    let key = event.key;
    if (key === "Enter") {
      add();
    }
  };
</script>

<style>
  input {
    display: block;
  }
</style>

<Collection path={'todos'} {query} let:data>

  <ul>
    {#each data as todo}
      <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
    {/each}
  </ul>

  <div class="flex">
    <div class="w-40">
      <Textfield
        autocomplete="off"
        label={placeholder}
        required
        on:keydown={onKeyDown}
        bind:value={text} />
    </div>
    <div class="mt-4">
      <Button color="primary" title="Add Task" on:click={add}>
        Send
        <!-- right icon -->
        <Icon
          path="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
          style="margin: 0 -4px 0 8px;" />
      </Button>
    </div>
    <!--  <input
      class="flex-initial shadow appearance-none border rounded py-2 px-3
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="task"
      bind:value={text}
      on:keydown={onKeyDown}
      {placeholder}
      type="text" /> -->

    <!--  <button
      class="flex-initial mx-2 my-2 inline-flex items-center justify-center px-2
      py-1 text-base leading-5 rounded-md border font-medium shadow-sm
      transition ease-in-out duration-150 focus:outline-none
      focus:shadow-outline bg-green-600 border-green-600 text-gray-100
      hover:bg-green-500 hover:border-green-500 hover:text-gray-100"
      on:click={add}>
      Add Task
    </button> -->
  </div>

</Collection>

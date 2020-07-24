<script lang="ts">
  export let value = 10;
  let inputEl;

  const minus = () => {
    value = value--;
  };

  const plus = () => {
    value = value++;
  };
</script>

<!-- component -->
<div class="flex flex-row border h-10 w-24 rounded-lg border-gray-400 relative">
  <button
    on:click={minus}
    class="font-semibold border-r bg-red-700 hover:bg-red-600 text-white
    border-gray-400 h-full w-20 flex rounded-l focus:outline-none cursor-pointer">
    <span class="m-auto">-</span>
  </button>
  <input
    bind:this={inputEl}
    {value}
    type="hidden"
    class="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none
    text-center"
    readonly
    name="custom-input-number" />
  <div
    class="bg-white w-24 text-xs md:text-base flex items-center justify-center
    cursor-default">
    <span>{value}</span>
  </div>

  <button
    on:click={plus}
    class="font-semibold border-l bg-blue-700 hover:bg-blue-600 text-white
    border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer">
    <span class="m-auto">+</span>
  </button>
  <div
    class="absolute flex flex-col p-2 w-32 md:w-full mt-6 md:mt-8 mt-10 flex
    items-start justify-center">
    <svg width="10" height="10" class="fill-current ml-5 md:mx-auto">
      <polygon points="0 10, 10 10, 5 0" />
    </svg>
    <span
      class="text-xs block w-48 flex flex-wrap justify-center bg-black p-3
      h-auto rounded-lg text-white">
      Input validation message
    </span>
  </div>
</div>

<template>
  <div
    class="container | p-3 my-3 mx-auto | bg-white rounded-xl shadow-2xl | flex"
  >
    <!--Left side-->
    <section class="w-1/4 p-3 mr-3| bg-gray-100">
      <p>Search Notes</p>
      <NoteList />
    </section>
  </div>

  <!--Right side-->
  <section class="p-3 | flex-grow">
    <ActiveNote />
  </section>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import ActiveNote from "@/components/ActiveNote.vue";
export default {
  name: "App",
  components: {
    NoteList,
    ActiveNote,
  },
};
</script>

<style>
.dev {
  border: 1px solid red;
}
</style>

<template>
  <DeleteNote v-if="$store.state.deleting" />
  <div
    class="container | p-3 my-3 mx-auto | bg-white rounded-xl shadow-2xl | flex"
  >
    <!--Left side-->
    <section class="w-1/4 p-3 mr-3| bg-gray-100">
      <SearchNote />
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
import DeleteNote from "@/components/DeleteNote.vue";
import SearchNote from "./components/SearchNote.vue";
export default {
  name: "App",
  components: {
    NoteList,
    ActiveNote,
    DeleteNote,
    SearchNote,
  },
};
</script>

<style>
.dev {
  border: 1px solid red;
}
</style>

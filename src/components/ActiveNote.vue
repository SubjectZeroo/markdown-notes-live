<template>
  <div v-if="activeNote" class="h-full | flex flex-col">
    <div class="flex-1 | flex">
      <section class="flex-1">
        <textarea
          :value="activeNote.body"
          @input="updateNote"
          class="w-full h-full | bg-gray-200"
        ></textarea>
      </section>
      <ActiveNoteHtml
        :body="activeNote.body"
        class="p-3 | bg-gray-900 text-white | flex-1"
      />
    </div>
    <section class="mt-3 | flex justify-end">
      <a @click="closeNote" href="#" class="bg-gray-200 py-1 px-3 rounded-md">
        Close Note</a
      >
    </section>
  </div>
  <div v-else class="h-full| flex justify-center items-center">
    Please select a note to start editing
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ActiveNoteHtml from "./ActiveNoteHtml.vue";

export default {
  name: "ActiveNote",
  setup() {
    const store = useStore();
    const activeNote = computed(() =>
      store.state.activeNote
        ? store.getters.getNoteById(store.state.activeNote)
        : null
    );
    const updateNote = ($event) =>
      store.commit("updateNote", {
        id: activeNote.value.id,
        body: $event.target.value,
      });
    const closeNote = () => store.commit("setActiveNote");
    return {
      activeNote,
      updateNote,
      closeNote,
    };
  },
  components: { ActiveNoteHtml },
};
</script>

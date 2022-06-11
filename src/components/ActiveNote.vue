<template>
  <div v-if="activeNote" class="h-full | flex flex-col">
    <div class="flex-1 | flex">
      <section class="flex-1">
        <ActiveNoteMD
          v-model:body="activeNote.body"
          @blur-note="blurNote"
          class="w-full h-full | bg-gray-200"
        />
      </section>
      <ActiveNoteHtml
        :body="activeNote.body"
        class="p-3 | bg-gray-900 text-white | flex-1"
      />
    </div>
    <section class="mt-3 | flex justify-between items-center">
      <div class="text-sm">
        Created on {{ noteDate }}, contains {{ noteLenght }} words
      </div>
      <div>
        <a
          @click="deleteNote"
          href="#"
          class="py-1 px-3 mr-3 | text-red-700 rounded-md"
        >
          Delete Note</a
        >
        <a
          @click="closeNote"
          href="#"
          class="py-1 px-3 | bg-gray-200 rounded-md"
        >
          Close Note</a
        >
      </div>
    </section>
  </div>
  <div v-else class="h-full| flex justify-center items-center">
    Please select a note to start editing or &nbsp;
    <a @click="createNote" class="underline font-bold">create a note</a>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ActiveNoteHtml from "@/components/ActiveNoteHtml.vue";
import ActiveNoteMD from "@/components/activeNoteMD.vue";

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
    const createNote = () => store.dispatch("createNote");
    // const deleteNote = () => store.commit("deleteNote");
    const deleteNote = () => store.commit("setDeleting", true);
    const blurNote = (value) => !value.length && deleteNote();
    return {
      activeNote,
      updateNote,
      closeNote,
      createNote,
      deleteNote,
      blurNote,
      noteDate: computed(() => new Date(activeNote.value.id).toLocaleString()),
      noteLenght: computed(() => activeNote.value.body.split(/\W+/).length),
    };
  },
  components: { ActiveNoteHtml, ActiveNoteMD },
};
</script>

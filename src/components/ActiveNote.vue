<template>
  <transition name="fade" mode="out-in">
    <div v-if="activeNote" class="h-full | flex flex-col">
      <div class="flex-1 | md:flex">
        <section class="flex-1">
          <ActiveNoteMD
            v-model:body="activeNote.body"
            @blur-note="blurNote"
            @update:body="updateNote"
            class="min-h-1/4 w-full h-full | bg-gray-200"
          />
        </section>
        <ActiveNoteHtml
          :body="activeNote.body"
          class="min-h-1/4 p-3 | bg-gray-900 text-white | flex-1"
        />
      </div>
      <section
        class="mt-3 | flex flex-col md:flex-row justify-between items-center"
      >
        <div class="text-sm mb-3">
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
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import debounce from "lodash/debounce";
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
    const updateNote = debounce(
      (value) =>
        store.dispatch("updateNote", {
          id: activeNote.value.id,
          body: value,
        }),
      500
    );
    const closeNote = () => store.commit("setActiveNote");
    const createNote = () => store.dispatch("createNote");
    // const deleteNote = () => store.commit("deleteNote");
    const deleteNote = () => store.commit("setDeleting", true);
    const blurNote = (value) => !value.length && store.dispatch("deleteNote");
    return {
      activeNote,
      updateNote,
      closeNote,
      createNote,
      deleteNote,
      blurNote,
      noteDate: computed(
        () =>
          activeNote.value &&
          new Date(activeNote.value.createdAt).toLocaleString()
      ),
      noteLenght: computed(
        () => activeNote.value && activeNote.value.body.split(/\W+/).length
      ),
    };
  },
  components: { ActiveNoteHtml, ActiveNoteMD },
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0l;
}
</style>
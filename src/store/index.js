import { createStore } from "vuex";
import { auth, firebase, db } from "../firebase"

export default createStore({
  state: {
    notes: [],
    activeNote: null,
    deleting: false,
    searchTerm: "",
    user: null
  },
  getters: {
    getNoteById: (state) => (noteId) =>
      state.notes.find((note) => note.id === noteId),
    getNoteTitle : state => noteId =>{
      const removeMd = require("remove-markdown");
      const id = noteId ? noteId : state.activeNote;
      const body = state.notes.find(note => note.id === id).body
      return removeMd(body.substring(0, 20));
    },
    getNotesBySearchTerm: state => {
      let filter = new RegExp(state.searchTerm, "i");
      return state.notes.filter(note => note.body.match(filter));
    }
  },
  mutations: {
    // createNote(state, note) {
    //   state.notes.unshift(note);
    // },
    setNotes(state, notes) {
      state.notes = notes;
    },
    setActiveNote(state, noteId = null) {
      state.activeNote = noteId;
    },
    // updateNote(state, {id, body}) {
    //   state.notes.find(note => note.id === id).body = body;
    // },
    // deleteNote(state) {
    //   const index = state.notes.findIndex(note => note.id === state.activeNote);
    //   state.notes.splice(index, 1);
    //   state.activeNote = null;
    //   state.deleting = false;
    // },
    setDeleting(state, deleting) {
      state.deleting = deleting
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async createNote({ commit, state }) {
      const ref = db.collection("users")
      .doc(state.user.uid)
      .collection("notes")

      const {id} = ref.doc();
      const note = {body:"", id, createdAt: Date.now(), uid: state.user.uid };

      try {
        await ref.doc(id).set(note);
        commit("setActiveNote", note.id)
      } catch (error) {
        throw new Error (error.message);
      }
      // commit("createNote", note);
     
    },
    async updateNotes({ state }, {id, body}) {
      try {
       await db
       .collection("users")
       .doc(state.user.uid)
       .collection("notes")
       .doc(id)
       .update({ body })
      } catch (error) {
        throw new Error (error.message);
      }
    },
    async deleteNote({state, commit}) {
      try {
        db.collection("users")
          .doc(state.user.uid)
          .collection("notes")
          .doc(state.activeNote)
          .delete();

          commit("setDeleting", false);
      } catch (error) {
        throw new Error(error.message);
      }
     
    },
    async getNotes({state, commit}) {
      db.collection("users").doc(state.user.uid)
        .collection("notes")
        .oderBy("createAt", "desc")
        .onSnapshot(doSnapshot);

        function doSnapshot(querySnapshot) {
          let notes = [];
          querySnapshot.foreach(doc => {
            let {body, uid, createAt} = doc.data()
            notes.push({
              body, 
              uid, 
              id: doc.id, 
              createAt
            });
          });
          commit("setNotes", notes);
        }
    },
    async userLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      try {

        await auth.signInWithPopup(provider);

      } catch (error) {
        throw new Error(error.message);
      }
    },
    async userLogout() {
      try {
        await auth.signOut();
        
      } catch (error) {
        throw new Error(error.message);
      }
    },
    checkAuth( {commit} )  {
      auth.onAuthStateChanged(user => {
        commit ("setUser", user);
        if (user) {
          this.dispatch("getNotes");
        }
      });
    }
  },
  modules: {},
});

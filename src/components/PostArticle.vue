<template>
  <b-row>
    <b-col cols=6 class="postarticle">
      <div class="editor">
        <form enctype="multipart/form-data" @submit.prevent="submit()">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
              <div class="menubar">

                  <button type="button" class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                      <font-awesome-icon icon="bold" />
                  </button>

                  <button type="button"  class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                      <font-awesome-icon icon="italic" />
                  </button>

                  <button type="button"  class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                      <font-awesome-icon icon="strikethrough" />
                  </button>

                  <button type="button"  class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                      <font-awesome-icon icon="underline" />
                  </button>

                  <button type="button"  class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 3 }) }" @click="commands.heading({level: 3})">
                      <b>Titre</b>
                </button>

                <!-- <button class="menubar__button"  @click="commands.link">
                    <font-awesome-icon icon="link" />
                </button> -->
                <!-- <button class="menubar__button" @click="loadImage(commands.image)">
                    <font-awesome-icon icon="image" />
                </button> -->

                  <button type="button"  class="menubar__button" @click="commands.undo">
                      <font-awesome-icon icon="undo" />
                  </button>

                  <button type="button"  class="menubar__button" @click="commands.redo">
                      <font-awesome-icon icon="redo" />
                  </button>
                  
              </div>
            </editor-menu-bar>
          
          <!-- <input type="text" v-model="editor.extensions.options.placeholder.emptyNodeText"> -->
          <editor-content class="editor__content" :editor="editor" /> 
          <p class="fileUp">
            <label for="image">Téléchargez un fichier</label>
            <img v-if="url" :src="url" class="upload-image" />
            <input type="file" accept="image/jpeg" name="image" @change="onFileSelected"/>
          </p>
          <p><button type="submit">Publier un article</button></p>
        
        </form>
      </div>
    </b-col>
  </b-row>
  
</template>

<script>

import moment from 'moment'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Heading,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Placeholder,
} from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Heading({levels: [1,2,3]}),
          new Link(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Saisir votre article ici...',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        content: ``,
        previewImage:null,
        config: null
      }),
      selectedFile: null,
      url: null
    }
  },
 
  methods:{
      submit() {
        const fd = new FormData()
        fd.append('image', this.selectedFile, this.selectedFile.name)
        this.$emit("submit", {
          content: this.editor.getHTML(),
          image: this.selectedFile.name,
          video: "yyy",
          author_users_id: localStorage.getItem("userId"),
          date: moment().format()
        })
      },
      onFileSelected(e) {
        //preview 
        this.selectedFile = e.target.files[0]
        const image = e.target.files[0]
        this.url = URL.createObjectURL(image)
      },
  },
  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style lang="scss">
  .postarticle {
    margin: auto;
  }
  .editor {
    background-color: #ffd7d7;
    border: rgb(34, 34, 34) 1px solid;
    margin: 3em auto;
    padding: 1em;
  }
  .editor p.is-editor-empty:first-child::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
}
  .editor__content {
    font-family: 'Trebuchet MS', sans-serif, Arial, "Noto Sans", sans-serif;
    font-size: 1rem;
    border: rgb(80, 79, 79) 1px solid;
    background-color: white;
    height: 10em;
    overflow: auto;
    text-align: left;
    margin: 1em;
  }
  p {
    margin-bottom: 0.2em !important;
  }
  .fileUp {
    text-align: left;
    margin-left: 1em;
  }
  .menubar__button {
    margin: 0.3em;
  }
</style>
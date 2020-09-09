<template>
  <b-row>
    <b-col cols=12 lg=6 class="postarticle">
      <div class="editor">
        <h1>Publier un article</h1>
        <form ref="postarticle" enctype="multipart/form-data" @submit.prevent="submit()">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
              <div class="menubar">

                  <button type="button" aria-label="bold" class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                      <font-awesome-icon icon="bold" />
                  </button>

                  <button type="button" aria-label="italic" class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                      <font-awesome-icon icon="italic" />
                  </button>

                  <button type="button" aria-label="strike" class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                      <font-awesome-icon icon="strikethrough" />
                  </button>

                  <button type="button" aria-label="underline" class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                      <font-awesome-icon icon="underline" />
                  </button>

                  <button type="button" aria-label="title" class="menubar__button" :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({level: 3})">
                      <b>Titre</b>
                  </button>

                  <button type="button" aria-label="undo" class="menubar__button" @click="commands.undo">
                      <font-awesome-icon icon="undo" />
                  </button>

                  <button type="button" aria-label="redo" class="menubar__button" @click="commands.redo">
                      <font-awesome-icon icon="redo" />
                  </button>
                  
              </div>
            </editor-menu-bar>
          
          <!-- <input type="text" v-model="editor.extensions.options.placeholder.emptyNodeText"> -->
          <editor-content class="editor__content" :editor="editor" /> 
          <p class="fileUp">
            <label for="image">Téléchargez un fichier</label>
            <img v-if="url" :src="url" class="upload-image"/>
            <input type="file" id="image" accept="image/jpeg, image/png, image/gif" name="image" @change="onFileSelected"/>
          </p>
          <p><button @click="submit">Valider</button></p>
        
        </form>
      </div>
    </b-col>
  </b-row>
  
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import {mapState} from "vuex"
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  History,
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
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Saisir votre article ici...',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],
        content: ``,
        previewImage:null
      }),
      selectedFile: ``,
      url: null
    }
  },
 
  methods:{
      // Reinitialisation du formulaire d'ajout d'un article
      resetForm() {
        this.editor.clearContent()
        this.url = null
        this.selectedFile = null
      },
      // Création d'un article
      submit() {
        const formData = new FormData()
        if (this.selectedFile) {
          formData.append("image", this.selectedFile, this.selectedFile.name)
          formData.append("legend", this.selectedFile.legend)
        }
        this.createArticle(formData)
      },
      createArticle(formData){
        console.log("création article")
        axios.post("http://localhost:3000/api/articles", {  
            article:{
              content: this.editor.getHTML(),
              image: "",
              author_users_id: this.users.userId,
              date: moment().format(),
            }
          }, 
          ).then(response => {
              this.articles_id = response.data.id
              this.saveImage(formData)
              this.$store.dispatch('loadPosts')
              this.resetForm()
          }).catch(() => {
              this.errorMessage = "NOK !!!"
          })
      },
      // Sauvegarde de la photo de l'article
      saveImage(formData) {
        if (formData) {
            console.log("deuxieme axios")
            axios.put("http://localhost:3000/api/articles/" + this.articles_id, formData,
              ).then(response => {
                  this.user = response
                    console.log("image ajoutée")
                    this.$store.dispatch('loadPosts')
              }).catch(() => {
                  this.errorMessage = "NOK !!!"
              })
        }
      },
      onFileSelected(e) {
        //preview 
        this.selectedFile = e.target.files[0]
        this.url = URL.createObjectURL(this.selectedFile)
      }
  },
  beforeDestroy() {
    console.log("destroy")
    this.editor.destroy()
  },
  computed: {
    ...mapState(['users'])
  }
}
</script>

<style lang="scss">
  .postarticle {
    margin: auto;
  }
  h1 {
    font-size: 2rem !important;
    font-family: 'Courier New', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .editor {
    background-color:rgb(128, 1, 1);
    border: rgb(34, 34, 34) 1px solid;
    border-radius: 2em;
    box-shadow: 0 0 20px 1px rgb(119, 118, 118);
    margin: 3em auto;
    padding: 1em;
  }
  .editor h1 {
    color: white;
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
    border-radius: 1em;
    padding: 1em;
    background-color: white;
    height: 10em;
    overflow: auto;
    text-align: left;
    margin: 1em;
  }
  button[type=submit] {
    border-radius: 0.5em;
  }
  p {
    margin-bottom: 0.2em !important;
  }
  .fileUp {
    text-align: left;
    margin-left: 1em;
    color: white;
  }
  .menubar__button {
    margin: 0.3em;
    border-radius: 0.5em;
  }
  .upload-image{
    max-height: 100px;
    display:block;
    margin-top:10px;
  }
</style>
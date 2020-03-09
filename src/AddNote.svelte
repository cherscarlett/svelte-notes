<script>
  import Fa from 'svelte-fa';
  import * as Icons from '@fortawesome/free-solid-svg-icons';

  import {notes, editingNote} from './stores.js';

  function newNote() {
    notes.update(n => [...n, {text: ''}])
  }

  function handleWindowKeyDown(event) {
    if (event.keyCode != 78 || $editingNote) return;
    event.preventDefault();
    newNote();
  }

</script>
<svelte:window on:keydown="{handleWindowKeyDown}" />

<form class:hasNotes="{Boolean($notes.length)}" on:submit|preventDefault="{newNote}" tabindex="0">
  <button aria-label="Add Note" type="submit">
    <Fa style="{Boolean($notes.length) ? "width: 100%; height: 100%;" : "width: 50%; height: 50%;"}" color="#7575FF" icon="{Icons.faPlus}" />
  </button>
</form>


<style>
  form {
    width: 200px;
    height: 200px;
  }
  button {
    width: 100%;
    height: 100%;
    background-color:white;
    border: 1px solid lightgray;
    opacity: .8;
    transition: opacity 300ms linear;
  }
  button:hover {
    opacity: 1;
  }
  form.hasNotes {
    position: absolute;
    height: 50px;
    width: 50px;
    z-index: 1;
    top: .5em;
    left: .5em;
  }
</style>
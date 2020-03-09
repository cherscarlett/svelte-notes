<script>
  import {setContext} from 'svelte';
  import Fa from 'svelte-fa';
  import * as Icons from '@fortawesome/free-solid-svg-icons';
  import ColorContrastChecker from './color-contrast-checker';
  import whatInput from 'what-input';

  import {notes, currentColor, editingNote} from './stores.js';

  export let note;
  export let id;

  let hoveringNote = false, draggableNote = false, noteEl;

  note.color = note.color || $currentColor;

  editingNote.set(!Boolean(notes.text));

  function setForeground() {
    const ccc = new ColorContrastChecker();
    if (ccc.isLevelAAA(note.color, '#000000')) {
      note.foreground = "black";
      return;
    }
    note.foreground = "white";
    return;
  }

  setForeground();

  function editNoteText(event) {
    event.stopPropagation();
    editingNote.set(true);
  }
  function deleteNote() {
    notes.update(n => {
      n.splice(id, 1);
      return n;
    })
  }
  function updateNote() {
    editingNote.set(false);
    notes.update(n => {
      n[id] = {...n[id], text: note.text, color: note.color, left: note.left, top: note.top}
      return n;
    });
  }
  function dragStart(event) {
    noteEl = this;
    const style = window.getComputedStyle(noteEl);
    event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
  }
  function dragOver(event) { 
    event.preventDefault(); 
    return false; 
  }
  function dropNote(event) { 
    event.preventDefault();
    if (noteEl) {
      const offset = event.dataTransfer.getData("text/plain").split(',');
      const left = event.clientX + parseInt(offset[0],10);
      const top = event.clientY + parseInt(offset[1],10);
      if (left >= 25 && left <= window.innerWidth - 225) note.left = left + 'px';
      if (top >= 75 && top <= window.innerHeight - 225) note.top = top + 'px';
      updateNote();
    }
    return false;
  }

  function handleSubmit(event) {
    if (event.keyCode == 13 && event.shiftKey) return;
    if(event.keyCode != 13) return;
    updateNote();
  }

  function updateCurrentColor() {
    setForeground();
    currentColor.set(note.color);
    updateNote();
  }

  function handleKeydown(event) {
    if ($editingNote) return;
    switch(event.keyCode) {
      case 46:
        deleteNote();
        break;
      case 69:
        if (!event.metaKey) return;
        editingNote.set(true);
        break;
      default:
        return;
    }
  }
  function handleWindowKeyDown(event) {
    if (event.keyCode == 27) {
      if (note.text) {
        updateNote();
      } else {
        deleteNote();
      }
      return;
    }
  }
</script> 

<svelte:window on:keydown="{handleWindowKeyDown}" on:click="{$editingNote ? () => {$editingNote = false} : null}" />
<svelte:body on:dragover="{dragOver}" on:drop="{dropNote}" />

<note on:dblclick="{() => {$editingNote = true}}" on:keydown="{handleKeydown}" style="--backgroundColor: {note.color}; --color: {note.foreground}; --left: {note.left}; --top: {note.top}; z-index: {hoveringNote ? '10' : null}" on:dragend="{() => {noteEl = null}}" on:dragstart="{dragStart}" on:blur="{() => {hoveringNote = false}}" on:focus="{() => {hoveringNote = true}}" on:mouseleave="{() => {hoveringNote = false}}" on:mouseenter="{() => {hoveringNote = true}}" tabindex="0" draggable="true">
  <button class:visible={hoveringNote} aria-label="delete note" on:click="{deleteNote}" tabindex="0">
    <Fa style="fill: {note.foreground}" icon="{Icons.faTimes}" />
  </button>
  <label class:visible={hoveringNote}>
    <input type="color" bind:value="{note.color}" on:change="{updateCurrentColor}" />
    <Fa style="fill: {note.foreground}" icon="{Icons.faPalette}" />
  </label>
  {#if note.text && !$editingNote}
    <span on:click="{editNoteText}">{note.text}</span>
  {:else}
    <form data-note on:click="{(event) => {event.stopPropagation()}}" on:submit|preventDefault="{updateNote}">
      <textarea on:focus="{() => hoveringNote = true}" on:keydown="{handleSubmit}" placeholder="enter note..." bind:value="{note.text}" />
    </form>
  {/if}
</note>

<style>
  note {
    height: 200px;
    width: 200px;
    color: var(--color);
    background-color: var(--backgroundColor);
    display: block;
    position: absolute;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
    text-align: left;
    padding: 1em;
    font-family: 'Rock Salt', cursive;
    transition: color 150ms linear;
    left: var(--left);
    top: var(--top);
  }

  button {
    color: var(--color);
    transition: all 150ms linear;
    position: absolute;
    top: -.5em;
    right: .5em;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, .6));
    opacity: 0;
  }

  input[type='color'] {
    display: none;
    transition: fill 150ms linear;
  }

  label {
    position: absolute;
    bottom: 0;
    right: .5em;
    opacity: 0;
    transition: all 150ms linear;
  }

  .visible {
    opacity: 1;
  }

  textarea {
    background: transparent;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    color: var(--color);
    transition: all 150ms linear;
    padding: 0;
  }

  textarea::placeholder {
    color: var(--color);
    opacity: .8;
    transition: all 150ms linear;
  }

  form[data-note] {
    height: 100%;
  }

</style>

<script>
  import Fa from 'svelte-fa';
  import * as Icons from '@fortawesome/free-solid-svg-icons';
  import {editingNote} from './stores.js';

  let helpVisible = false;

  function handleWindowKeyDown(event) {
    if (event.keyCode != 72 || $editingNote) return;
    helpVisible = !helpVisible;
  }
</script>

<svelte:window on:keydown="{handleWindowKeyDown}" />

<info>
  <button on:click="{() => helpVisible = !helpVisible}">
    <Fa style="width: 100%; height: 100%;" color="#7575FF" icon="{Icons.faQuestionCircle}" />
  </button>
</info>

{#if helpVisible}
    <content>
      <button aria-label="close help" on:click="{() => helpVisible = false}" tabindex="0">
        <Fa style="fill: black" icon="{Icons.faTimes}" />
      </button>
      <dl>
        <dt>Help</dt>
        <dd>h</dd>
        <dt>New Note</dt>
        <dd>n</dd>
        <dt>Cancel Add Note</dt>
        <dd>Escape</dd>
        <dt>Delete Note</dt>
        <dd>Delete</dd>
        <dt>Save Note</dt>
        <dd>Enter</dd>
        <dt>New Line in Note</dt>
        <dd>Shift + Enter</dd>
        <dt>Edit Note</dt>
        <dd>Double Left-Click</dd>
      </dl>
      <ul>
        <li>Note foreground colors change to satisfy WCAG AAA contrast requirements</li>
      </ul>
    </content>
  {/if}

<style>
  info {
    position: absolute;
    height: 50px;
    width: 50px;
    z-index: 1;
    top: .5em;
    left: .5em;
    transform: translate(calc(50px + .5em), 0);
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
  content {
    text-align: left;
    position: absolute;
    top: .5em;
    left: .5em;
    width: 300px;
    background: rgb(243, 243, 243);
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
    padding: 1em;
    transform: translate(0, calc(50px + .5em));
  }
  dl {
    display: flex;
    flex-wrap: wrap;
  }
  dd, dt {
    width: 50%;
    margin: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
</style>
  import { writable } from 'svelte/store';

  export const notes = writable(JSON.parse(localStorage.getItem('notes') || []));

  notes.subscribe(notes => {localStorage.setItem('notes', JSON.stringify(notes))});

  export const currentColor = writable('#9acd32');

  export const editingNote = writable(false);

<script>
	export let title;
	import AddNote from './AddNote.svelte';
	import Note from './Note.svelte';
	import Help from './Help.svelte';
  import {notes} from './stores.js';
</script>

<main>
	<h1>{title}</h1>
	<container>
		<AddNote />
		<Help />
		{#each $notes as note, i}
			<Note note={note} id={i} />
		{/each}
	</container>
</main>

<style>

@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css?family=Rock+Salt&display=swap');

main {
	text-align: center;
	display: flex;
	flex-direction: column;
	height: 100%;
}
container {
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: center;
}
h1 {
 font-family: 'Abril Fatface', serif;
 text-transform: uppercase;
 font-size: 3rem;
 border-bottom:1px solid lightgray;
 box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
 margin: 0;
 background-color: whitesmoke;
 z-index: 1;
 position: relative;
}
h1:before {
	content: '';
	right: 50%;
	margin-top: 9px;
	margin-right: -225px;
	height: 45px;
	width: 45px;
	background: pink;
	position: absolute;
	transform: rotate(-10deg) translate(-50%);
	z-index: -1;
	box-shadow: 0 2px 10px rgba(0, 0, 0, .2);
}
h1:after {
	content: '';
	z-index: -1;
	right: 50%;
	margin-right: -225px;
	margin-top: 9px;
	height: 45px;
	width: 45px;
	position: absolute;
	transform: rotate(-10deg) translate(-50%);    
	background-image: linear-gradient(-19deg, #000000 0%, transparent 64%, rgba(255, 255, 255, 0.2));
	opacity: 0.3;
}

</style>
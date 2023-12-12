<script lang="ts">
import { get } from 'svelte/store';

import Weather from './Weather/Weather.svelte';
import Login from './Login/Login.svelte';
import Todo from './Todo/Todo.svelte';

import { mode } from '../../utils/Store';

$: mode;

</script>

<div>
    {#if get(mode).name === "login"}
            <Login />
    {:else if get(mode).name === "todo"}
            <Todo />
    {:else}
            <h1>Not implemented yet</h1>
    {/if}
</div>


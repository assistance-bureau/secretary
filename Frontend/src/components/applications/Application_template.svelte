<script lang="ts">
    import Weather from './Weather/Weather.svelte';
    import Login from './Login/Login.svelte';
    import Todo from './Todo/Todo.svelte';

    import { mode } from '../../utils/Store';

    $: currentApp = $mode.name; //스토어 참조, 업데이트
</script>

<div>
    {#if currentApp === "login"}
        <Login />
    {:else if currentApp === "Todo"}
        <Todo />
    {:else}
        <h1>Not implemented yet</h1>
        <Weather />
    {/if}
</div>

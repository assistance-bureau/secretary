<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { writable, derived } from 'svelte/store';
    import { onMount } from 'svelte';
    import { sendRequest } from '../../../utils/API';

    type TodoItem = {
        id: number;
        content: string;
        completed: boolean;
    };

    const todos = writable<TodoItem[]>([]);
    const tmpUserId = 'tmp-user-id';
    const tmpToken = 'tmp-user-token';

    async function fetchTodos() {
        const response = await sendRequest('34.82.225.41', 80, 'GET', '/items/' + tmpUserId, { userid: tmpUserId, token: tmpToken });
        todos.set(response.todos || []);
        console.log(response.todos)
    }

    onMount(() => {
        fetchTodos();
    });

    const complete_rate = derived(todos, $todos => {
        const total = $todos.length;
        const completed = $todos.filter(todo => todo.completed).length;
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    });

    async function addTodo() {
        const newText = prompt('새 할 일을 입력하세요:');
        if (newText) {
            await sendRequest('34.82.225.41', 80, 'POST', '/todo/', { userid: tmpUserId, token: tmpToken, content: newText });
            fetchTodos();
        }
    }

    async function toggleTodo(id: number, completed: boolean) {
    await sendRequest('34.82.225.41', 80, 'PUT', `/todo/${id}/complete`, {
        userid: tmpUserId,
        token: tmpToken,
        completed: !completed // completed 상태를 토글
    });
    fetchTodos(); // 상태 변경 후 Todo 목록 갱신
}


    async function editTodo(todoId: number) {
        const newText = prompt('할 일을 수정하세요:');
        if (newText) {
            await sendRequest('34.82.225.41', 80, 'PUT', `/item/todo/${todoId}`, { userid: tmpUserId, token: tmpToken, content: newText });
            fetchTodos();
        }
    }

    async function deleteTodo(todoId: number) {
        await sendRequest('34.82.225.41', 80, 'DELETE', `/item/todo/${todoId}`, { userid: tmpUserId, token: tmpToken });
        fetchTodos();
    }
</script>

<div class="flex justify-between">
    <div class="mr-16">
        <ProgressRadial value={$complete_rate}>{$complete_rate}%</ProgressRadial>
    </div>
    <div>
        <div class="space-y-2">
            {#each $todos as todo, index}
                <label class="flex items-center space-x-2">
                    <input 
                        class="form-checkbox h-4 w-4 bg-white border border-gray-400 rounded" 
                        type="checkbox" 
                        bind:checked={todo.completed}
                        on:change={() => toggleTodo(index, todo.completed)}
                    />
                    <p>{todo.content}</p>
                    <button on:click={() => editTodo(todo.id)}>✏️</button> <!-- 수정 아이콘 -->
                    <button on:click={() => deleteTodo(todo.id)}>❌</button> <!-- 삭제 아이콘 -->
                </label>
            {/each}
        </div>
        <button type="button" class="btn btn-sm variant-filled mt-4" on:click={addTodo}>추가</button>
    </div>
</div>

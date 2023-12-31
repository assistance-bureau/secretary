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

    // localStorage에 userid와 token 설정
    localStorage.setItem('userid', tmpUserId);
    localStorage.setItem('token', tmpToken);

    // Todos 초기 데이터 로드
    async function fetchTodos(forceReload = false) {
        try {
            const response = await sendRequest('34.82.225.41', 80, 'GET', '/todos/', null);
            if (response.todos) {
                todos.set(response.todos);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            if (forceReload) {
                alert('오류가 발생했습니다. 페이지를 새로고침합니다.');
                location.reload();
            }
        }
    }

    onMount(() => {
        fetchTodos();
    });

    // 완료율 계산
    const complete_rate = derived(todos, $todos => {
        const total = $todos.length;
        const completed = $todos.filter(todo => todo.completed).length;
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    });

    // Todo 항목 추가
    async function addTodo() {
        const newText = prompt('새 할 일을 입력하세요:');
        if (newText) {
            await sendRequest('34.82.225.41', 80, 'POST', '/todo/', { content: newText });
            fetchTodos();
        }
    }

    async function toggleTodo(id: number, completed: boolean) {
    try {
        // content 필드를 보내지 않고, completed 상태만 전달합니다.
        await sendRequest('34.82.225.41', 80, 'PUT', `/todo/${id}`, { completed: !completed });
        fetchTodos();
    } catch (error) {
        console.error('Error updating todo:', error);
        fetchTodos(true);
    }
}

    // Todo 항목 수정
    async function editTodo(todoId: number) {
        const newText = prompt('할 일을 수정하세요:');
        if (newText) {
            try {
                await sendRequest('34.82.225.41', 80, 'PUT', `/todo/edit/${todoId}`, { content: newText });
                fetchTodos();
            } catch (error) {
                console.error('Error editing todo:', error);
                fetchTodos(true);
            }
        }
    }

    // Todo 항목 삭제
    async function deleteTodo(todoId: number) {
        try {
            await sendRequest('34.82.225.41', 80, 'DELETE', `/todo/${todoId}`, {});
            todos.update(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
        } catch (error) {
            console.error('Error deleting todo:', error);
            fetchTodos(true);
        }
    }
</script>

<div class="flex justify-between">
    <div class="mr-16">
        <ProgressRadial value={$complete_rate}>{$complete_rate}%</ProgressRadial>
    </div>
    <div>
        <div class="space-y-2">
            {#each $todos as todo}
                <label class="flex items-center space-x-2">
                    <input 
                        class="form-checkbox h-4 w-4 bg-white border border-gray-400 rounded" 
                        type="checkbox" 
                        bind:checked={todo.completed}
                        on:change={() => toggleTodo(todo.id, todo.completed)}
                    />
                    <p>{todo.content}</p>
                    <button on:click={() => editTodo(todo.id)}>✏️</button>
                    <button on:click={() => deleteTodo(todo.id)}>❌</button>
                </label>
            {/each}
        </div>
        <button type="button" class="btn btn-sm variant-filled mt-4" on:click={addTodo}>추가</button>
        <button type="button" class="btn btn-sm variant-filled mt-4" on:click={() => fetchTodos(true)}>데이터 다시 로드</button>
    </div>
</div>

<script lang="ts">
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    import { writable, derived } from 'svelte/store';

    type TodoItem = {
        text: string;
        completed: boolean;
    };

    const todos = writable<TodoItem[]>([
        { text: 'Option 1', completed: false },
        { text: 'Option 2', completed: false },
        { text: 'Option 3', completed: false },
        // ... 기타 초기 항목들 ...
    ]);

    const complete_rate = derived(todos, $todos => {
        const total = $todos.length;
        const completed = $todos.filter(todo => todo.completed).length;
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    });

    function addTodo() {
        let newText = prompt('새 할 일을 입력하세요 (최대 20자):');
        while (newText != null && newText.length > 20) {
            newText = prompt('20자를 초과하지 않는 내용을 입력하세요:');
        }

        if (newText) {
            todos.update(currentTodos => [...currentTodos, { text: newText, completed: false }]);
        }
    }

    function toggleTodo(index: number, completed: boolean) {
        todos.update(currentTodos => {
            let newTodos = [...currentTodos];
            newTodos[index].completed = completed;
            return newTodos;
        });
    }
</script>

<div class="flex justify-between">
    <div class="mr-16">
        <ProgressRadial value={$complete_rate}>{$complete_rate}%</ProgressRadial>
    </div>
    <div>
        <div class="space-y-2">
            {#each $todos.slice(0, 5) as todo, index}
                <label class="flex items-center space-x-2">
                    <input 
                        class="form-checkbox h-4 w-4 bg-white border border-gray-400 rounded" 
                        type="checkbox" 
                        bind:checked={todo.completed}
                        on:change={() => toggleTodo(index, todo.completed)}
                    />
                    <p>{todo.text}</p>
                </label>
            {/each}
        </div>
        <button type="button" class="btn btn-sm variant-filled mt-4" on:click={addTodo}>추가</button>
    </div>
</div>

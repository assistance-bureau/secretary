<script lang="ts">
    import { Avatar } from '@skeletonlabs/skeleton';
    import { mode, pbStore } from '../../utils/Store';
    import type { RecordModel } from 'pocketbase';

    function handleClick() {
        const currentMode = $mode;
        if (currentMode.mod === 0) {
            mode.set({ mod: 1, name: 'login' });
        } else {
            mode.set({ mod: 0, name: 'dashboard' });
        }
    }

    // pbStore에서 바로 구독하기
    $: ({ pb, isValid } = $pbStore);
    $: user = isValid ? (pb.authStore.model as RecordModel) : null;
    $: img = isValid && user ? pb.files.getUrl(user, user.avatar) : null;
    
</script>

<button on:click={handleClick} aria-label="Toggle Mode">
    {#if isValid === true}
        <!-- 로그인한 사용자의 아바타 표시 -->
        <Avatar 
            src={img}
            border="border-4 border-surface-300-600-token hover:!border-primary-500"
            cursor="cursor-pointer"
        />
    {:else}
        <!-- 로그인하지 않은 사용자의 경우 다른 이미지 또는 아바타 표시 -->
        <Avatar initials="Guest" background="bg-primary-500" />
    {/if}
</button>

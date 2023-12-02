<script lang="ts">
    import { Avatar } from '@skeletonlabs/skeleton';
    import { get } from 'svelte/store';
    import { mode } from '../../utils/Store';
    import pocketbase from 'pocketbase';
    import type { RecordModel } from 'pocketbase'

    function handleClick() {
        if (get(mode).mod === 0) {
            mode.set({ mod: 1, name: 'login' })
        } else {
            mode.set({ mod: 0, name: 'dashboard' })
        }
    }

    const pb = new pocketbase('http://localhost:8090');

    let isValid: boolean = pb.authStore.isValid;
    let img: any = null;
    let user = pb.authStore.model as RecordModel; // user: AuthModel

    img = pb.files.getUrl(user, user.avatar)

    console.log(isValid)
    console.log(img)

</script>

<button on:click={handleClick} aria-label="Toggle Mode">
    <!-- 스토어 값 직접 조회를 위해선 $필요 -->
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
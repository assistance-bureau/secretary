<script lang="ts">
    import { mode, pbStore } from '../../../utils/Store';
    import Profile from './Profile.svelte';
	

    let userId: string = '';
    let password: string = '';

    // 스토어 구독
    $: ({ pb, isValid } = $pbStore);
    // import { get } from 'svelte/store';
    // console.log(get(pbStore).pb.authStore.model);
    // 대체 왜 타입스크립트는 못읽고 스벨트는 읽는거지? 아래 프로필 출력 참조

    const handleLogin = async () => {
      try {
        const authData = await pb.collection('users').authWithPassword(userId, password);
        // 로그인 성공 시 스토어 업데이트
        pbStore.update(store => {
            return { ...store, isValid: true };
        });
        mode.set({ mod: 0, name: 'user' });
      } catch (error) {
        console.error('로그인 실패:', error);
        // 오류 처리
      }
    };

    const handleLogout = async () => {
      try {
        await pb.authStore.clear();
        // 로그아웃 성공 시 스토어 업데이트
        pbStore.update(store => {
            return { ...store, isValid: false };
        });
        mode.set({ mod: 0, name: 'guest' });
      } catch (error) {
        console.error('로그아웃 실패:', error);
      }
    };

  </script>
  
<div class="flex flex-col justify-center items-center min-h-screen">
    {#if isValid}
        <Profile />
        <button type="button" class="btn variant-filled" on:click={handleLogout}>로그아웃</button>
        {:else}
        <div class="flex flex-col items-center">
            <input
              class="input"
              type="text"
              placeholder="아이디"
              bind:value={userId}
            />
            <input
              class="input mt-2"
              type="password"
              placeholder="비밀번호"
              bind:value={password}
            />
            <button type="button" class="btn variant-filled mt-4" on:click={handleLogin}>로그인</button>
        </div>
    {/if}
  </div>
  
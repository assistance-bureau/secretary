<script lang="ts">
    import { mode } from '../../../utils/Store';
    import Profile from './Profile.svelte';
	

    let userId: string = '';
    let password: string = '';

    const handleLogin = async () => {

    };

    const handleLogout = async () => {

    };

    let isValid = false;
  </script>
  
 <!-- min-h-screen은 위험하다 -->
<div class="flex justify-center items-center">
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
  
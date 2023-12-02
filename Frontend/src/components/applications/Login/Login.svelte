<script lang="ts">
    import { onMount } from 'svelte';
    import PocketBase from 'pocketbase';

  
    let userId: string = '';
    let password: string = '';
  
    const pb = new PocketBase('http://localhost:8090');

    const handleLogin = async () => {
      try {
        const authData = await pb.collection('users').authWithPassword(userId, password);
        console.log('로그인 성공:', authData);
        // 로그인 성공 후 추가 작업
      } catch (error) {
        console.error('로그인 실패:', error);
        // 오류 처리
      }
    };
  
    onMount(() => {
      // 페이지가 로드될 때 필요한 작업
    });
  </script>
  
  <style>
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
  
    .login-input {
      margin-bottom: 1rem;
      width: 300px;
    }
  </style>
  
  <div class="login-container">
    <input
      class="input login-input"
      type="text"
      placeholder="아이디"
      bind:value={userId}
    />
    <input
      class="input login-input"
      type="password"
      placeholder="비밀번호"
      bind:value={password}
    />
    <button type="button" class="btn variant-filled" on:click={handleLogin}>로그인</button>
  </div>
  
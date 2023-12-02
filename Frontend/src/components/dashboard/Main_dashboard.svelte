<script>
    import { dndzone } from 'svelte-dnd-action';
    import { writable } from 'svelte/store';

    // dashboards
    import Weather from './Weather/Weather.svelte';

    const gridItems = writable([
        { id: 1, name: '날씨', type: 'Weather', status: 'Active' },
        { id: 2, name: 'Component 2', type: 'Type B', status: 'Inactive' },
        { id: 3, name: 'Component 3', type: 'Type B', status: 'Inactive' },
        { id: 4, name: 'Component 4', type: 'Type B', status: 'Active' },
        { id: 5, name: 'Component 5', type: 'Type C', status: 'Active' },
        { id: 6, name: 'Component 6', type: 'Type C', status: 'Active' },
        { id: 7, name: 'Component 7', type: 'Type C', status: 'Active' },
        { id: 8, name: 'Component 8', type: 'Type C', status: 'Active' },
        { id: 9, name: 'Component 9', type: 'Type C', status: 'Active' },
        { id: 10, name: 'Component 10', type: 'Type D', status: 'Inactive' },
        { id: 11, name: 'Component 11', type: 'Type D', status: 'Inactive'},
        { id: 12, name: 'Component 12', type: 'Type D', status: 'Inactive'}
    ]);

    $: items = $gridItems;

    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }

    import { playSound } from '../../routes/Sounds';

    function handleHover() {
        playSound('hover');
    }

</script>

<div class="grid-container" use:dndzone={{ items, dropTargetStyle: { outline: 'none' } }} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
    {#each items as item (item.id)}
    <div class="relative {item.status === 'Inactive' ? 'grid-item hidden-item' : 'grid-item'}" style="width: 410px;"> <!-- 너비를 600px로 설정 -->

        <!-- 상단바 -->
        <div class="cursor-default">
        <div class="flex justify-between items-center w-full border-b hover-area">
            <h1 class="text-lg font-semibold text-white" on:mouseenter={handleHover}>{item.name}</h1>
            <div class="opacity-0 transition-opacity buttons">
              <button>
                <i class="fas fa-cog text-lg text-white"></i> <!-- 세팅 아이콘 -->
              </button>
              <button class="px-2">
                <i class="fas fa-times text-lg text-white"></i> <!-- 닫기 아이콘 -->
              </button>
            </div>
          </div>
        <div class={item.status === 'Inactive' ? 'grid-item hidden-item' : 'grid-item'}>
                <div class="flex justify-center items-center h-full w-full cursor-default">
                    {#if item.type === 'Weather'}
                        <Weather />
                    {:else if item.type === 'Type B'}
                        <h1>Component 2</h1>
                    {:else if item.type === 'Type C'}
                        <h1>Component 3</h1>
                    {/if}
                </div>
        </div>
    </div>
    </div>
    {/each}
</div>

<style>
.grid-container {
  display: grid;
  grid-gap: 20px; /* 그리드 아이템 사이의 간격 */
  padding: 10px; /* 컨테이너 패딩 */
  justify-content: center; /* 컨테이너 중앙 정렬 */
}

.grid-item {
  /* border: 0.5px solid white; */
  padding: 10px;
  text-align: center;
  width: 400px; /* 고정 너비 */
  height: 261px; /* 고정 높이 */
}

/* 마우스 오버 시 버튼 표시 */
.hover-area:hover .buttons {
    opacity: 1;
}

/* 기본 상태에서 버튼 숨김 */
.buttons {
    opacity: 0;
    transition: opacity 0.5s ease;
}

/* 화면 크기에 따라 그리드 레이아웃 변경하지 않고 각 아이템의 크기만 조정 */
@media (max-width: 9999px) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* 너비가 600px 이상인 아이템을 채울 수 있는 만큼 자동으로 배치 */
  }
}

.hidden-item {
  display: none;
}

</style>
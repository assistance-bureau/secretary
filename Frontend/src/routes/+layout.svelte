<script context="module" lang="ts">
    //profile / userinfo

</script>

<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

    // app rail, tabs
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

    let currentTile: number = 0;

    //================mode setting per tile =========================
    import { mode } from '../utils/Store';

    $: if (currentTile === 0) {
        mode.set({ mod: 0, name: "DashBoard" });
    }
    else if (currentTile === 1) {
        mode.set({ mod: 0, name: "Todo" });
    }
    else if (currentTile === 2) {
        mode.set({ mod: 0, name: "Weather" });
    }




    // explorer drawer
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
    import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerComponent from '../components/drawer/Drawer_component.svelte';
    initializeStores();

    import { onMount } from 'svelte';

    // 창 크기 변경 감지
    let windowWidth: number;

    onMount(() => {
      windowWidth = window.innerWidth - 16;
      window.addEventListener('resize', () => {
        windowWidth = window.innerWidth - 16;
      });
    });

    $: drawerWidth = `w-[${windowWidth}px]`;

    const drawerStore = getDrawerStore();
    const drawerSettings: DrawerSettings = {
        id: 'explorer',
        // Provide your property overrides:
        bgDrawer: 'bg-primary-500/60 text-white backdrop-blur', // 진한 남색으로 설정
        // bgBackdrop: 'bg-black/90', // 반투명한 검은색 배경으로 설정
        width: drawerWidth, // 전체 화면 너비에서 16px 빼기
        // padding: 'p-4',
        rounded: 'rounded-xl',
        opacityTransition: true,
        duration: 500,
    };

    //clicks
    //sounds
    import { playSound } from '../utils/Sounds';


    function handleClickExplorer() {
        playSound('click');
        drawerStore.open(drawerSettings);
    }

    // clock
    import ClockComponent from '../components/drawer/Clock_component.svelte';

    // avatar + login popups
    import AvatarComponent from '../components/drawer/Avatar_component.svelte';
    import { Modal, getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

</script>
    <Drawer position="right">
        <DrawerComponent />
    </Drawer>

    <Modal />

    <!-- App Shell -->
    <AppShell>
        <!-- 헤더 -->
        <svelte:fragment slot="header">
            <div class="flex flex-row justify-between">
                <div class="font-bold">
                    <!-- 서비스 이름 -->
                    {$mode.name}
                </div> 
                <div class="mr-4"> <!-- Tailwind CSS 클래스를 사용 -->
                    <ClockComponent/>
                </div>
            </div>
            
        </svelte:fragment>
        <svelte:fragment slot="sidebarLeft">
            <AppRail>

                <!-- Explorer drawer 시작화면 버튼 -->
                <svelte:fragment slot="lead">
                    <AppRailAnchor href="/" on:click={handleClickExplorer}>
                        <i class="fa-regular fa-compass text-4xl" style="color: white;"></i>
                        <span>explorer</span>
                    </AppRailAnchor>
                </svelte:fragment>

                <!-- 애플리케이션 리스트 -->
            <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
                <svelte:fragment slot="lead">(icon)</svelte:fragment>
                <span>Tile 1</span>
            </AppRailTile>
            <AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
                <svelte:fragment slot="lead">(icon)</svelte:fragment>
                <span>{currentTile}</span>
            </AppRailTile>
            <!-- --- -->

            <!-- 유저 Profile -->
            <svelte:fragment slot="trail">
                <AppRailAnchor title="Account">
                    <div class="flex justify-center items-center mb-2 scale-90">
                        <AvatarComponent/>
                    </div>
                </AppRailAnchor>
            </svelte:fragment>


        </AppRail>
    </svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
</AppShell>

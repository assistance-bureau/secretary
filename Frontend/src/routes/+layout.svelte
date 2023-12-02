<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    // app rail, tabs
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';

    let currentPage: number = 0;
    let currentTile: number = 0;

    // explorer drawer
    import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
    import type { DrawerSettings, DrawerStore } from '@skeletonlabs/skeleton';
    import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerComponent from '../components/drawer/Drawer_component.svelte';
    initializeStores();

    const drawerStore = getDrawerStore();
    const drawerSettings: DrawerSettings = {
        id: 'explorer',
        // Provide your property overrides:
        bgDrawer: 'bg-cyan-800/60 text-white backdrop-blur', // 진한 남색으로 설정
        // bgBackdrop: 'bg-black/90', // 반투명한 검은색 배경으로 설정
        width: 'w-[1300px]', // 전체 화면 너비에서 16px 빼기
        // padding: 'p-4',
        rounded: 'rounded-xl',
    };

    //clicks
    //sounds
    import { playSound } from './Sounds';


    function handleClickExplorer() {
        playSound('click');
        drawerStore.open(drawerSettings);
    }

    // clock
    import ClockComponent from '../components/drawer/Clock_component.svelte';

    // avatar
    import AvatarComponent from '../components/drawer/Avatar_component.svelte';


</script>

<Drawer position="right">
	<h1>Let's explore!</h1>
    <DrawerComponent />
</Drawer>

<!-- App Shell -->
<AppShell>
    <!-- 헤더 -->
    <svelte:fragment slot="header">
        <div class="flex flex-row justify-between">
            <div class="font-bold">
                <!-- 서비스 이름 -->
                Assistant Bureau
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
                <span>Tile 2</span>
            </AppRailTile>
            <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
                <svelte:fragment slot="lead">(icon)</svelte:fragment>
                <span>Tile 3</span>
            </AppRailTile>
            <!-- --- -->

            <!-- 유저 Profile -->
            <svelte:fragment slot="trail">
                <AppRailAnchor title="Account">
                    <div class="flex justify-center items-center mb-2 scale-0">
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

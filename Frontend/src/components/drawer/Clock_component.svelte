<script lang="ts">
    import { onMount } from 'svelte';
    import { dateTimeStore } from '../../utils/Store';

    let currentDateTime : string;

    function getFormattedDate() {
        const now = new Date();
        const days = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
        const day = days[now.getDay()];
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours > 12 ? hours - 12 : hours;

        return `${now.getMonth() + 1}월 ${now.getDate()}일 ${day} ${ampm} ${formattedHours}:${minutes}:${seconds}`;
    }

    function updateClock() {
        currentDateTime = getFormattedDate();
        dateTimeStore.set(getFormattedDate());
        window.requestAnimationFrame(updateClock);
    }

    onMount(() => {
        updateClock();
    });
</script>

<div>
    {currentDateTime}
</div>

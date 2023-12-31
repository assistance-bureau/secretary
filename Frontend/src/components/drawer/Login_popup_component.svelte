<script lang="ts">
    import { mode } from '../../utils/Store';

    // Store에서 바로 구독하기 나중에 수정
    let isValid = false;

</script>


{#if isValid === false}
    <button type="button" class="btn-icon variant-filled">(icon)</button>
    <button type="button" class="btn-icon variant-filled">(icon)</button>
{:else}
    <p>userinfo and logout buttons</p>
{/if}

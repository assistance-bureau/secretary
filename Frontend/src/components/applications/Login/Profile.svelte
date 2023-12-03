<script lang="ts">
    import { pbStore } from '../../../utils/Store';

    $: ({ pb } = $pbStore);

</script>

<div class="flex-col">
    <h1>{pb.authStore.model.email}</h1>
    <h1>이제 여기서 데이터 뽑아와서 나열하면 됨</h1>
</div>


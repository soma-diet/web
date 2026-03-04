<script lang="ts">
    interface Props {
        type: TrackableType;
        name: string;
        subtext: string;
        kcal: number;
    }

    let { name, subtext, kcal }: Props = $props();
</script>

<img src="" alt="">
<div class="col">
    <h5 class="item-name">
        {name}
    </h5>
    <span>{subtext}</span>
</div>
<span>{kcal} kcal</span>

<style>
    span {
        color: var(--span-color, var(--subtle-color));
        font-size: 80%;
    }

    div {
        gap: 0.25em;
    }

    .item-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        margin: 0;
    }
</style>

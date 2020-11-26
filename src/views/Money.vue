<template>
    <Layout class-prefix="layout">
        {{mark}}
        <NumberPad @update:value="onupdateSum"/>
        <Types :value.sync="mark.type"/>
        <Notes @update:value="onupdateNotes"/>
        <Tags :data-source.sync='tags' @update:value="onupdateTags"/>
    </Layout>
</template>


<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator';


    type Mark = {
        tags: string[];
        notes: string;
        type: string;
        sum: number;
    }


    @Component({
        components: {Tags, Notes, Types, NumberPad}
    })
    export default class Money extends Vue {
        tags = ['衣', '食', '住', '行'];
        mark: Mark = {
            tags: [],
            notes: '',
            type: '-',
            sum: 0,
        };


        onupdateTags(value: string[]) {
            this.mark.tags = value;
        }

        onupdateNotes(value: string) {
            this.mark.notes = value;
        }

        onupdateSum(value: string) {
            this.mark.sum = parseFloat(value);
        }
    }
</script>
<style>
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>


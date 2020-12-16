<template>
    <Layout class-prefix="layout">
        {{markList}}
        <NumberPad :value.sync="mark.sum" @submit="savemark"/>
        <Types :value.sync="mark.type"/>
        <Notes @update:value="onupdateNotes" field-name="备注" placeholder="在这里备注"/>
        <Tags :data-source.sync='tags' @update:value="onupdateTags"/>
    </Layout>
</template>


<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component, Watch} from 'vue-property-decorator';
    import {markListModel} from '@/models/markListModel';
    import {tagListModel} from '@/models/tagListModel';


    const version = window.localStorage.getItem('version') || '';
    const markList= markListModel.fetch();
    const tagList= tagListModel.fetch();
    // const markList: Mark[] = JSON.parse(window.localStorage.getItem('markList') || '[]');
    if (version < '0.0.2') {
        if (version === '0.0.1') {
            //数据库升级，数据迁移
            markList.forEach(mark => {
                mark.createdAt = new Date(2020, 1, 1);
            });
            //保存数据
            window.localStorage.setItem('markList', JSON.stringify(markList));
        }
    }
    window.localStorage.setItem('version', '0.0.2');


    @Component({
        components: {Tags, Notes, Types, NumberPad}
    })
    export default class Money extends Vue {
        tags = tagList
        mark: Mark = {
            tags: [],
            notes: '',
            type: '-',
            sum: 0,
        };
        markList: Mark[] = JSON.parse(window.localStorage.getItem('markList') || '[]');


        onupdateTags(value: string[]) {
            this.mark.tags = value;
            console.log('现在的标签是' + this.mark.tags);
        }

        onupdateNotes(value: string) {
            this.mark.notes = value;
            console.log('这里的标签为' + this.mark.notes);
        }

        onupdateSum(value: string) {
            this.mark.sum = parseFloat(value);
        }

        savemark() {
            const mark2: Mark = markListModel.clone(this.mark);
            mark2.createdAt = new Date();
            this.markList.push(mark2);
            console.log(mark2.sum);
            console.log(this.markList);
        }

        @Watch('markList')
        onMarkListChange() {
            markListModel.save(this.markList);
        }
    }
</script>
<style>
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>


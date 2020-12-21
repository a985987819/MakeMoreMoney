<template>
    <Layout class-prefix="layout">
        {{markList}}
        <NumberPad :value.sync="mark.sum" @submit="savemark"/>
        <Types :value.sync="mark.type"/>
        <div class="notes">
            <FormItem @update:value="onupdateNotes" field-name="备注" placeholder="在这里备注"/>
        </div>
        <Tags :data-source.sync='tags' @update:value="onupdateTags"/>
    </Layout>
</template>


<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Types from '@/components/Money/Types.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component, Watch} from 'vue-property-decorator';
    import {markListModel} from '@/models/markListModel';
    import {tagListModel} from '@/models/tagListModel';


    const version = window.localStorage.getItem('version') || '';
    const markList = markListModel.fetch();
    const tagList = tagListModel.fetch();
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
        components: {FormItem, Tags, Types, NumberPad}
    })
    export default class Money extends Vue {
        tags = tagList;
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
        }

        onupdateSum(value: string) {
            this.mark.sum = parseFloat(value);
        }

        savemark() {
            markListModel.create(this.mark)
        }

        @Watch('markList')
        onMarkListChange() {
            markListModel.save();
        }
    }
</script>
<style>
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }
</style>


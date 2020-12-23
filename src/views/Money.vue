<template>
    <Layout class-prefix="layout">
        <NumberPad :value.sync="mark.sum" @submit="savemark"/>
        <Tabs :data-source="marktypeList"
        :value.sync="mark.type"/>
        <div class="notes">
            <FormItem @update:value="onupdateNotes" field-name="备注" placeholder="在这里备注"/>
        </div>
        <Tags/>
    </Layout>
</template>


<script lang="ts">
    import Vue from 'vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import FormItem from '@/components/Money/FormItem.vue';
    import Tags from '@/components/Money/Tags.vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import marktypeList from '@/constants/marktypeList';


    // const version = store.localStorage.getItem('version') || '';
    // const markList = markListModel.fetch();
    // const markList: Mark[] = JSON.parse(store.localStorage.getItem('markList') || '[]');
    // if (version < '0.0.2') {
    //     if (version === '0.0.1') {
    //         //数据库升级，数据迁移
    //         markList.forEach(mark => {
    //             mark.createdAt = new Date(2020, 1, 1);
    //         });
    //         //保存数据
    //         store.localStorage.setItem('markList', JSON.stringify(markList));
    //     }
    // }
    // store.localStorage.setItem('version', '0.0.2');


    @Component({
        components: {Tabs, FormItem, Tags, NumberPad},
    })
    export default class Money extends Vue {
        get markList() {
            return this.$store.state.markList;
        }

        marktypeList= marktypeList;

        mark: Mark = {
            tags: [],
            notes: '',
            type: '-',
            sum: 0,
        };

        created() {
            this.$store.commit('fetchMarks');
        }

        onupdateNotes(value: string) {
            this.mark.notes = value;
        }

        onupdateSum(value: string) {
            this.mark.sum = parseFloat(value);
        }

        savemark() {
            this.$store.commit('createMark', this.mark);
        }
    }
</script>
<style>
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }

    .notes {
        padding: 12px 0;
    }
</style>


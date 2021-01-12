/* eslint-disable */

<template>
    <Layout class-prefix="layout">
        <NumberPad v-if="!isLoading"
                   :value.sync="mark.sum"
                   :date1.sync="mark.createdAt"
                   @submit="savemark"
                   ref="child1"/>
        <div class="notes">
            <FormItem
                    field-name="备注"
                    :value.sync="mark.notes"
                    placeholder="在这里备注"
            />
        </div>
        <Tags @update:value="mark.tags = $event"/>
        <Tabs :data-source="marktypeList"
              :value.sync="mark.type"/>
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


    @Component({
        components: {Tabs, FormItem, Tags, NumberPad},
    })
    export default class Money extends Vue {
        get markList() {
            return this.$store.state.markList;
        }

        isLoading = false;
        now = Date();
        marktypeList = marktypeList;

        mark: Mark = {
            tags: [],
            notes: '',
            type: '-',
            sum: 0,
            createdAt: ''
        };


        savemark() {
            if (!this.mark.tags || this.mark.tags.length === 0) {
                window.alert('请选择至少一个标签');
                console.log(this.mark.sum);
                return;
            } else if (this.mark.sum === 0) {
                window.alert('记录金额不能为0');
                return;
            } else if (!this.mark.createdAt || this.mark.createdAt === '') {
                this.mark.createdAt = this.now;
                this.$store.commit('createMark', this.mark);
                this.mark.notes = '';
                // console.log('----------------下面是子组件');
                // console.log(this.$refs.child1);
                // console.log('下面是子组件的clear方法----------------');
                let a = this.$refs.child1 as any;
                a.clear();
                /* eslint-disable */
                window.alert('添加成功');
                return;
            } else {
                this.$store.commit('createMark', this.mark);
                this.mark.notes = '';
                window.alert('添加成功');
                let a = this.$refs.child1 as any;
                a.clear();
                return;
            }
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

/* eslint-disable no-new */
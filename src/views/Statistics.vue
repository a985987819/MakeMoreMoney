<template>
    <Layout>
        <tabs class-prefix="type" :data-source="marktypeList" :value.sync="type"/>
        <ol v-if="groupedList.length>0">
            <li v-for="(group,index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}}
                    <span class="total">共￥{{group.total}}</span>
                    </h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id"
                        class="mark">
                        <span>{{tagString(item.tags)}}</span>

                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.sum}}</span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="no-Result">
            <img src="../assets/pitiful.png" alt="" class="pitiful">
            <div>当前记录空空如也</div>
            <div>快去记账吧</div>
        </div>
    </Layout>
</template>

<style scoped lang="scss">
    .pitiful{
        min-height: 200px;
        width: 200px;
        margin-top: 100px;
    }
    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }

    .title {
        @extend %item
    }

    .mark {
        font-size: 14px;
        background: white;
        @extend %item
    }

    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999999;
        padding: 0;
    }

    ::v-deep .type-tabs-item {

        background: white;

        &.selected {
            background: #fdda42;

            &::after {
                display: none;
            }
        }
    }
    ::v-deep .interval-tabs-item {
        height: 40px;
        font-size: 16px;
    }
    .total{
        font-weight: normal;
        color: #999999;
        font-size: 16px;
    }
.no-Result{
    padding: 16px;
    text-align: center;
}
</style>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import marktypeList from '@/constants/marktypeList';
    import clone from '@/lib/clone';
    import dayjs from 'dayjs';


    const oneDay = 86400 * 1000;
    @Component({
        components: {Tabs},
    })
    export default class Statistics extends Vue {
        beforeCreate() {
            this.$store.commit('fetchMarks');
        }


        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(t=>t.name).join('，');
        }

        get markList() {
            return (this.$store.state as RootState).markList;
        }

        get groupedList() {

            type Result = { title: string; total?: number; items: Mark[] }[]

            const {markList} = this;
            const newList = clone(markList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());

            if (newList.length === 0) {
                return [];
            }
            const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            result.map(
                group => {
                    group.total = group.items.reduce((sum,item)=>sum+item.sum,0);
                }
            );
            return result;
        }

        beautify(string: string) {
            const day = dayjs(string);
            const now = dayjs();
            if (day.isSame(new Date(), 'day')) {
                return '今天';
            } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
                return '昨天';
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (day.isSame(now, 'year')) {
                return day.format('MM月DD日');
            } else {
                return day.format('YYYY年MM月DD日');
            }
        }

        type = '-';
        marktypeList = marktypeList;
    }
</script>

<template>
    <Layout>
        <tabs class-prefix="type" :data-source="marktypeList" :value.sync="type"/>
        <tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <ol>
            <li v-for="(group,index) in result" :key="index">
                <h3 class="title">{{group.title}}</h3>
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
    </Layout>
</template>


<style scoped lang="scss">
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
    }

    ::v-deep .type-tabs-item {
        background: white;

        &.selected {
            background: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }

    ::v-deep .interval-tabs-item {
        height: 40px;
        font-size: 16px;
    }

</style>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Tabs from '@/components/Tabs.vue';
    import intervalList from '@/constants/intervalList';
    import marktypeList from '@/constants/marktypeList';


    @Component({
        components: {Tabs},
    })
    export default class Statistics extends Vue {
        beforeCreate() {
            this.$store.commit('fetchMarks');
        }


        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.join(',');
        }

        get markList() {
            return (this.$store.state as RootState).markList;
        }

        get result() {
            type HashTableValue = { title: string; items: Mark[] }

            const {markList} = this;
            const hashTable: { [key: string]: HashTableValue } = {};
            for (let i = 0; i < markList.length; i++) {
                const [date, time] = markList[i].createdAt!.split('T');
                console.log(date);
                hashTable[date] = hashTable[date] || {title: date, items: []};
                hashTable[date].items.push(markList[i]);
            }
            console.log(hashTable);
            return hashTable;
        }

        type = '-';
        interval = 'day';
        intervalList = intervalList;
        marktypeList = marktypeList;
    }
</script>

<template>
    <Layout>
        <tabs class-prefix="type" :data-source="marktypeList" :value.sync="type"/>
        <tabs class-prefix="interval" :data-source="intervalList" :value.sync="interval"/>
        <div>
            type:{{type}}
            <br>
            interval:{{interval}}
        </div>
    </Layout>
</template>


<style scoped lang="scss">
    ::v-deep .type-tabs-item {
        background: white;

        &.selected {
            background: #c4c4c4;
            &::after {
                display: none;
            }
        }
    }
    ::v-deep .interval-tabs-item{
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
        type = '-';
        interval = 'day';
        intervalList = intervalList
        marktypeList = marktypeList
    }
</script>

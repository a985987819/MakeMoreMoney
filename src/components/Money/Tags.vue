<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in tags" :key="tag.id"
                :class="{selected: selectedTags.indexOf(tag)>=0}"
                @click="toggle(tag)">
                {{tag.name}}
            </li>
        </ul>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';


    @Component({
    })
    export default class Tags extends Vue {

        get tags(){
            return this.$store.state.tagList;
        }
        // tagList = store.fetchTags();
        selectedTags: string[] = [];

        beforeCreate() {
            this.$store.commit('fetchTags');
            this.$forceUpdate()
        }

        toggle(tag: string) {
            const index = this.selectedTags.indexOf(tag);
            if (this.selectedTags.length>=1){
                this.selectedTags=[]
                this.selectedTags.push(tag);
            }else {
                if (index >= 0) {
                    this.selectedTags.splice(index, 1);
                } else {
                    this.selectedTags.push(tag);
                }
            }
            this.$emit('update:value', this.selectedTags);
        }

        create() {
            const name = window.prompt('请输入标签名:');
            if (!name) {
                return window.alert('标签名不能为空');
            }
            this.$store.commit('createTag', name);
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        background: white;
        font-size: 14px;
        padding: 16px;
        flex-grow: 1;
        display: flex;
        flex-direction: column-reverse;

        > .current {
            display: flex;
            flex-wrap: wrap;

            > li {
                background: #f5f5f5;
                $h: 24px;
                height: $h;
                line-height: $h;
                border-radius: $h/2;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;

                &.selected {
                    background: #fdda42;
                    color: #ffffff;
                }
            }

        }

        > .new {
            padding-top: 16px;

            button {
                background: transparent;
                border: none;
                color: #999999;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }
    }

</style>
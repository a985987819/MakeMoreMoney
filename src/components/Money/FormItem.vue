<template>
    <div>
        <label class="formItem">
            <Icon name="note" class="noteicon"/>
            <span class="name">{{this.fieldName}}</span>
            <input type="text"
                   :value="value"
                   @input="onValueChange($event.target.value)"
                   :placeholder="placeholder">
            <Icon name="calendar" class="calendar"/>
        </label>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop, Watch} from 'vue-property-decorator';

    @Component
    export default class FormItem extends Vue {
        @Prop({default: ''}) readonly value!: string;

        @Prop({required: true}) fieldName!: string;
        @Prop() placeholder?: string;

        onValueChange(value: string) {
            this.$emit('update:value', value);
        }
    }
</script>

<style lang="scss" scoped>
    .noteicon {
        margin-right: 10px;
    }

    .calendar {
        margin-right: 20px;
    }

    .formItem {
        font-size: 14px;
        padding-left: 16px;
        display: flex;
        align-items: center;

        .name {
            padding-right: 16px;
        }

        input {
            height: 40px;
            flex-grow: 1;
            background: transparent;
            border: none;
            padding-right: 16px;
        }
    }
</style>
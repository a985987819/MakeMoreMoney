<template>
    <div class="numberPad">
        <div class="output">
            <DatePicker class="datepicker"
                        placeholder="请选择日期"
                        type="date"
                        v-model="choosedate"
                        value-format="yyyy-MM-dd">
            </DatePicker>
            <div class="null"></div>
            <div class="num">{{output}}</div>
        </div>
        <div class="buttons">
            <button @click="inputContent">1</button>
            <button @click="inputContent">2</button>
            <button @click="inputContent">3</button>
            <button @click="remove">
                <Icon name="dele"></Icon>
            </button>
            <button @click="inputContent">4</button>
            <button @click="inputContent">5</button>
            <button @click="inputContent">6</button>
            <button @click="clear">清空</button>
            <button @click="inputContent">7</button>
            <button @click="inputContent">8</button>
            <button @click="inputContent">9</button>
            <button @click="ok" class="ok">OK</button>
            <button @click="inputContent" class="zero">0</button>
            <button @click="inputContent">.</button>
        </div>
    </div>
</template>


<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    @Component
    //作用：把TS视为组件，会自动把它分类为data和methods
    export default class NumberPad extends Vue {
        choosedate = '';
        output = '0';

        @Prop(Number) readonly value!: number;
        @Prop(String) readonly date1 !: string;


        inputContent(event: MouseEvent) {
            const button = (event.target as HTMLButtonElement);
            const input = button.textContent as string;
            if (this.output.length === 16) {
                return;
            }
            if (this.output === '0') {
                if ('0123456789'.indexOf(input) >= 0) {
                    this.output = input;
                } else {
                    this.output += input;
                }
                return;
            }
            if (this.output.indexOf('.') >= 0 && input === '.') {
                return;
            }
            this.output += input;
        }

        remove() {
            if (this.output.length === 1) {
                this.output = '0';
            } else {
                this.output = this.output.slice(0, -1);
            }
        }

        clear() {
            this.output = '0';
            // console.log('clear被调用了');
        }

        ok() {
            const number = parseFloat(this.output);
            const date = this.choosedate;
            this.$emit('update:value', number);
            this.$emit('update:date1', date);
            this.$emit('submit', number, date);
            this.$forceUpdate();
            // this.output = '0';
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/assets/style/helper.scss";

    .numberPad {
        .null {
        }

        .datepicker {
            width: 45%;
        }

        .num {
            width: 100%-45%;
            margin-right: 0;
        }

        .output {
            @extend %clearFix;
            @extend %innerShadow;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            /*justify-content: center;*/
            align-items: center;
            font-size: 36px;
            font-family: Consolas, monospace;
            padding: 9px 4px;
            text-align: right;
            height: 72px;
            border: none;
        }

        .buttons {
            @extend %clearFix;

            > button {
                width: 25%;
                height: 64px;
                float: left;
                background: transparent;
                border: 0.2px solid #e3e3e3;
                /*box-shadow: 0 0 0 0.5px;*/

                &.ok {
                    height: 64*2px;
                    float: right;
                    background: #fdda42;
                }

                &.zero {
                    width: 25*2%;
                }

                $bg: #f2f4f3;

                &:nth-child(1) {
                    border-top: none;
                    background: $bg;
                }

                &:nth-child(2), &:nth-child(3), &:nth-child(4) {
                    border-top: none;
                    background: $bg;
                }

                /*&:nth-child(2), &:nth-child(5) {*/
                /*    border-top: none;*/
                /*<!--    background: $bg;-->*/
                //background: darken($bg, 3%);
                /*}*/

                &:nth-child(3), &:nth-child(6), &:nth-child(9) {
                    border-top: none;
                    background: $bg;
                    //background: darken($bg, 3*2%);
                }

                &:nth-child(4), &:nth-child(7), &:nth-child(10) {
                    border-top: none;
                    background: $bg;
                    //background: darken($bg, 3*3%);
                }

                &:nth-child(8), &:nth-child(11), &:nth-child(13) {
                    border-top: none;
                    background: $bg;
                    //background: darken($bg, 3*4%);
                }

                &:nth-child(14) {
                    border-top: none;
                    background: $bg;
                    //background: darken($bg, 3*5%);
                }

            }
        }
    }
</style>
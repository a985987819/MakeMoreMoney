<template>
    <div>
        <div class="text1">4 4</div>
        <div class="text2">0</div>

        <div>
            <p>你想要访问的路径不存在</p>
        </div>
        <div class="en">
            Not found

        </div>
        <div class="circle">

        </div>

    </div>
</template>

<script lang="ts">
    export default {
        name: 'Notfound'
    };
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;

    }

    .text {
        float: bottom;
    }

    .text1 {
        margin-top: 100px;
        font-size: 150px;
        display: flex;
        justify-content: center;
        font-family: Consolas;
    }

    .text2 {
        font-size: 280px;
        display: flex;
        justify-content: center;
        font-family: Consolas;
        z-index: 99999;
    }

    p {
        display: flex;
        justify-content: center;
        font-size: 25px;
        color: #333333;
    }

    .en {
        font-weight: bold;
        float: top;
        color: white;
        transform: translate(720px, -815px) rotate(-37.9deg);
    }

    .circle {
        width: 220px;
        height: 220px;
        background: #e2dfe6;
        border: 12px solid black;
        border-radius: 50%;
        float: top;
        transform: translate(830px, -375px);
    }
</style>
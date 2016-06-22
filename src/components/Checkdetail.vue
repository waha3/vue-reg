<style lang="stylus">
    .checkdetail{
        width: 100%;
        height: auto;
        > div {
            width: 100%;
            height: 3rem;
            line-height: 3rem;
            > div {
                float: left;
                text-indent: 1em;
                font-size: 14px;
                margin-right: 1em;
            }
        }
    }
</style>

<template>
    <div class="checkdetail">
        <div v-for="(index, list) in checkdetail | changeName">
            <div>{{ index }}</div>
            <div>{{ list }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'checkinfo',
        data(){
            return {
                checkdetail: this.$root.checkdetail
            }
        }
    }
</script>

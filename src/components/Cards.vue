<template>
    <div>
        <div class='reglist-cards'>
            <div class="top">
                <span>{{name}}</span>
            </div>
            <div class="mid">
                <span>{{sex}}</span>
                <span>{{certificate}}</span>
            </div>
            <div class="bottom">
                <span class="cardsEdit" v-link={path: '/register'}>编辑</span>
                <span class="cardsDel" @click="cardsDel($index)">删除</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Cards',
    data() {
        return {}
    },
    methods: {
        cardsDel(index) {
            this.$parent.cardsData.splice(index, 1)
        }
    },
    props: {
        name: {
            type: String
        },
        sex: {
            type: String
        },
        certificate: {
            type: String
        }
    }
}
</script>
<style lang="stylus">
.reglist-cards {
    width: 90%;
    height: 5rem;
    margin: 1rem auto 1rem;
    border: 5px solid #f0f0f0;
    .top {
        height: 2rem;
    }
}
</style>

<style lang="stylus">

.order_success {
    width: 100%;
    height: auto;
    text-align: center;
    padding-top: 3rem;
    & > a {
        display: inline-block;
        margin-bottom: 2rem;
    }
    &>p {
        width: 100%;
        text-align: center;
        line-height: 2rem;
        font-size: 16px;
        color: #666;
    }
}

</style>

<template>

<div class="order_success">
    <a>
        <icon type="safe_warn icon_big"></icon>
    </a>
    <p>报名失败</p>
</div>

</template>

<script>

import Icon from 'vux/components/icon'
export default {
    name: 'ordersuccess',
    components: {
        Icon
    }
}

</script>

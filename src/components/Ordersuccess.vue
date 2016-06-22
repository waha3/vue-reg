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
        <icon type="safe_success icon_big"></icon>
    </a>
    <p>您已成功报名了</p>
    <p>{{ racename }}</p>
</div>

</template>

<script>

import Icon from 'vux/components/icon'
export default {
    name: 'ordersuccess',
	data(){
		return {
			racename: null
		}
	},
    components: {
        Icon
    },
	events: {
		'broadcastRaceName': function(data) {
			this.racename = data
		}
	}
}

</script>

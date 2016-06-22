<style lang="stylus">

.order {
    width: 100%;
    height: auto;
    .title {
        background: #f4f4f4;
        height: 4rem;
        line-height: 4rem;
        font-size: 16px;
        padding-left: 1rem;
    }
}

</style>

<template>

<div class="order">
    <group title="确认报名，请选择支付平台"></group>
    <group>
        <a :href="wechatLink" target="_blank" v-if="isWeixin" @click="model">
            <cell title="微信支付" :is-link="islink">
            	<spinner slot="value" type="ripple" v-show="spinner.show" :style="spinner.style"></spinner>
            </cell>
        </a>
        <a :href="alipayLink" target="_blank" v-else @click="model">
            <cell title="支付宝" :is-link="islink">
            	<spinner slot="value" type="ripple" v-show="spinner.show" :style="spinner.style"></spinner>
            </cell>
        </a>
    </group>
    <confirm :show.sync="confirm.show" :title="confirm.title" :confirm-text="confirm.confirmText" :cancel-text="confirm.cancelText">
    </confirm>
</div>

</template>

<script>

import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import Confirm from './Confirm/index.vue'
import Spinner from 'vux/components/spinner'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router()

export default {
    name: "order",
    components: {
        Group, Cell, Confirm, Spinner
    },
    data() {
        return {
            confirm: {
                show: false,
                title: '查看订单支付信息',
                confirmText: '确定',
                cancelText: '取消'
            },
            isWeixin: null,
            islink: true,
            orderId: this.$root.orderId,
			spinner: {
                show: false,
                style: {
                    'margin-left': '1rem'
                }
            }
        }
    },
    computed: {
        wechatLink: function() {
            return 'http://paynotice.ihuipao.cn/order/pay?payment=wechat&orderid=' + this.orderId + '&bankid=wechat'
        },
        alipayLink: function() {
            return 'http://paynotice.ihuipao.cn/order/pay?payment=alipay&orderid=' + this.orderId + '&bankid=alipay'
        }
    },
    ready() {
        let is_micro = window.navigator.userAgent.toLowerCase()
        is_micro.match(/MicroMessenger/i) == "micromessenger" ? this.isWeixin = true : this.isWeixin = false
    },
    methods: {
        model() {
            //清空根节点上的表单信息
            this.$root.singelPesonInfo = {}
            this.confirm.show = true
        }
    },
    events: {
        'on-confirm': function(data) {
            let self = this
			//显示动画
			this.spinner.show = true
            $.ajax({
                url: 'http://interface.ihuipao.cn/race/orderinfo',
                type: "POST",
                dataType: "json",
                data: {
                    raceid: raceid,
                    orderid: this.orderId
                },
                xhrFields: {
                    withCredentials: true,
                },
                success: function(data) {
                    if (data.code == 'fail') {
                        alert(data.message)
                    } else {
                        if ((data.data.status & 2) == 0) {
                            router.go({
                                path: '/orderfail'
                            })
                        } else {
                            router.go({
                                path: '/ordersuccess'
                            })
                        }
                    }

                },
                error: function() {
                    console.error('fail')
                }
            })
        },
        'on-cancel': function(data) {
            return
        }
    }
}

</script>

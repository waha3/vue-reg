<style lang="stylus">

.cell {
    border-bottom: 1px solid #f4f4f4;
}

p {
    color: #333;
}

</style>

<template>

<div class="reglist">
    <group>
        <a v-link="path">
            <cell title="添加新的报名资料" :is-link="boolen"></cell>
        </a>
    </group>
    <group title="从历史报名里一键报名">
        <div class="cell" v-for="list in racelist" @click="post(list.id, $index)">
            <cell :title="list.name" :value="list.gender | filterGender" :is-link="boolen" :inline-desc="list.certificate_id">
                <spinner slot="value" type="lines" v-show.sync="spinner.show[$index]" :style="spinner.style"></spinner>
            </cell>
        </div>
    </group>
    <confirm :show.sync="confirm.show" :title="confirm.title" :confirm-text="confirm.confirmText" :cancel-text="confirm.cancelText">
    </confirm>
</div>

</template>

<script>

import Group from 'vux/components/group/'
import Cell from 'vux/components/cell/'
import Confirm from './Confirm/index.vue'
import Spinner from 'vux/components/spinner'
import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
const router = new Router();
export default {
    name: "reglist",
    components: {
        Group, Cell, Confirm, Spinner
    },
    data() {
        return {
            racelist: [],
            boolen: true,
            confirm: {
                show: false,
                title: '请选择',
                confirmText: '立即支付',
                cancelText: '重新报名'
            },
            id: null,
            spinner: {
                show: [],
                style: {
                    'margin-left': '1rem'
                }
            }
        }
    },
    computed: {
        path: function() {
            let id = window.location.href.split('/').pop();
            return "/register/" + id;
        }
    },
    ready() {
        var self = this;
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/reghistory/raceid/' + raceid,
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success: function(data) {
                self.racelist = data.data
                for(let i = 0; i < data.data.length; i++){
                    self.spinner.show.push(false)
                }
            },
            error: function() {
                console.error("fail")
            }
        })
    },
    methods: {
        post(id, index) {
            for (let i = 0; i < this.racelist.length; i++) {
                if (id == this.racelist[i].id) {
                    for (let k in this.racelist[i]) {
                        this.$root.singelPesonInfo[k] = this.racelist[i][k]
                    }
                }
            }
            if (this.$root.hasCustomString) {
                router.go({
                    path: this.path
                })
            } else {
                let self = this, obj = {}, url = window.location.href;

                obj.raceid = raceid;
                obj.eventid = url.split('/').pop()                                   //项目的id
                obj.from = 'history'                                                 //历史报名
                obj['certificate_id[]'] = this.$root.singelPesonInfo.certificate_id  //certificate_id 为数组

                //动画开始
                this.spinner.show.$set(index, true)

                $.ajax({
                    url: 'http://interface.ihuipao.cn/race/register',
                    type: "POST",
                    dataType: "json",
                    data: obj,
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: function(data) {
                        if (data.code == "fail") {
                            if (!data.data.own_status) {
                                alert(data.message)
                            } else {
                                if (data.data.own_status == 'mine') {
                                    //本人操作
                                    switch (data.data.order_status) {
                                        case 'payed': //已支付
                                            //跳报名详情页
                                            self.$root.orderId = data.data.regs[0].orderid
                                            router.go({
                                                path: '/orderinfo'
                                            })
                                            break;
                                        default: //未支付或者没有订单
                                            self.confirm.show = true
                                            self.id = data.data.regs[0].id
                                            break;
                                    }
                                } else {
                                    //非本人操作
                                    switch (data.data.order_status) {
                                        case 'payed': //已支付
                                            //跳报名查询
                                            alert('报名查询')
                                            break;
                                        default: //未支付或者没有订单
                                            self.confirm.show = true
                                            self.confirm.confirmText = '取消'
                                            self.id = data.data.regs[0].id
                                            break;
                                    }
                                }
                            }
                        } else {
                            //历史报名里面没有用
                        }
                    },
                    error: function() {
                        console.error("fail")
                    }
                })
            }
        }
    },
    props: {
        path: {
            type: Object
        }
    },
    events: {
        'on-confirm': function(data) {
            if(data == '取消'){
                return
            }else {
                let obj = {},
                    self = this
                obj.id = this.id
                obj.raceid = raceid
                $.ajax({
                    url: 'http://interface.ihuipao.cn/race/checkoutnew',
                    type: "POST",
                    dataType: "json",
                    data: obj,
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: function(data) {
                        if (data.code == 'fail') {
                            alert(data.message)
                        } else {
                            //获取orderId
                            self.$root.orderId = data.data.orderid
                            router.go({
                                path: '/order'
                            })
                        }
                    },
                    error: function() {
                        console.error("fail")
                    }
                })
            }
        },
        'on-cancel': function(data) {
            let obj = {}, self = this
            obj.id = this.id
            obj.raceid = raceid
            $.ajax({
                url: 'http://interface.ihuipao.cn/race/deletenew',
                type: "POST",
                dataType: "json",
                data: obj,
                xhrFields: {
                    withCredentials: true,
                },
                success: function(data) {
                    if (data.code == 'fail') {
                        alert(data.message)
                    } else {
                        self.$root.ids = data.data.id
                        router.go({
                            path: '/checkinfo'
                        })
                    }
                },
                error: function() {
                    console.error("fail");
                }
            })
        }
    }

}

</script>

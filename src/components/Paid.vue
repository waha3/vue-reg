<style lang="stylus">

    .paid {
        .title {
            background: #f0f0f0;
            line-height: 4rem;
            font-size: 16px;
            text-indent: 1em;
            margin-bottom: -2rem;
            color: #333;
        }
    }

</style>

<template>

    <div class="paid">
        <div class="title">已支付的项目</div>
        <group>
            <div class="cell" v-for="list in hasPaidList" @click="post(list.id)">
                <cell
                    :title="list.name"
                    :value="list.gender | filterGender"
                    :is-link="islink"
                    :inline-desc="list.certificate_id">
                </cell>
            </div>
        </group>
        <div class="title">退款中的项目</div>
        <group>
            <div class="cell" v-for="list in refund">
                <cell
                    :title="list.name"
                    :value="list.gender | filterGender"
                    :is-link="islink"
                    :inline-desc="list.certificate_id">
                </cell>
            </div>
        </group>
        <actionsheet
            cancel-text="取消"
            :show-cancel="true"
            :show.sync="actionsheet.show"
            :menus="actionsheet.menus">
        </actionsheet>
    </div>

</template>

<script>

import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import Actionsheet from 'vux/components/actionsheet'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router()

export default {
    name: 'paid',
    components: {
        Group, Cell, Actionsheet
    },
    data() {
        return {
            hasPaidList: null,
            refund: null,
            islink: true,
            actionsheet: {
                show: false,
                showCancel: true,
                cancelText: '取消',
                menus: {
                    menu1: '查看详情',
                    menu2: '放弃报名'
                }
            },
            id: null
        }
    },
    created() {
        var self = this;
        //获取已支付的列表
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/reglist',
            type: 'POST',
            dataType: 'json',
            data: {
                raceid: raceid,
                filter: 3
            },
            xhrFields: {
                withCredentials: true,
            },
            success: function(data) {
                if (data.code == 'fail') {
                    alert(data.message)
                } else {
                    self.hasPaidList = data.data
                }
            },
            error: function() {
                console.error('fail')
            }
        })
        //正在退款的列表
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/reglist',
            type: 'POST',
            dataType: 'json',
            data: {
                raceid: raceid,
                filter: 4
            },
            xhrFields: {
                withCredentials: true,
            },
            success: function(data) {
                if (data.code == 'fail') {
                    alert(data.message)
                } else {
                    self.refund = data.data
                }
            },
            error: function() {
                console.error('fail')
            }
        })
    },
    methods: {
        post(id) {
            this.actionsheet.show = true
            this.id = id
            for(let i = 0; i< this.hasPaidList.length; i++){
                if(this.id == this.hasPaidList[i].id){
                    this.$root.checkdetail = this.hasPaidList[i]
                }
            }
        }
    },
    events: {
        'menu-click': function(data){
            let self = this
            if(data == 'cancel'){
                return
            }else if(data == 'menu1'){
                router.go({
                    path: '/checkdetail'
                })
            }else if(data == 'menu2'){
                let boolen = confirm('确认退款？')
                if(boolen){
                    $.ajax({
                        url: 'http://interface.ihuipao.cn/race/aband',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            id: self.id,
                            type: 'personal',
                            raceid: raceid
                        },
                        xhrFields: {
                            withCredentials: true,
                        },
                        success: function(data) {
                            if (data.code == 'fail') {
                                alert(data.message)
                            }else{
                                alert('订单退款成功')
                                $.ajax({
                                    url: 'http://interface.ihuipao.cn/race/reglist',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: {
                                        raceid: raceid,
                                        filter: 3
                                    },
                                    xhrFields: {
                                        withCredentials: true,
                                    },
                                    success: function(data) {
                                        if (data.code == 'fail') {
                                            alert(data.message)
                                        } else {
                                            self.hasPaidList = data.data
                                        }
                                    },
                                    error: function() {
                                        console.error('fail')
                                    }
                                })
                                
                                $.ajax({
                                    url: 'http://interface.ihuipao.cn/race/reglist',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: {
                                        raceid: raceid,
                                        filter: 4
                                    },
                                    xhrFields: {
                                        withCredentials: true,
                                    },
                                    success: function(data) {
                                        if (data.code == 'fail') {
                                            alert(data.message)
                                        } else {
                                            self.refund = data.data
                                        }
                                    },
                                    error: function() {
                                        console.error('fail')
                                    }
                                })
                            }
                        },
                        error: function() {
                            console.error('fail')
                        }
                    })
                }
            }
        }
    }
}

</script>

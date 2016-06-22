<style lang="stylus">

.checkinfo {
    width: 100%;
    height: auto;
    .content {
        width: 92%;
        height: auto;
        margin: auto;
        font-size: 14px;
        & > div {
            width: 100%;
            height: auto;
            line-height: 3rem;
            span {
                display: inline-block;
                width: auto;
                padding-left: 5px;
                vertical-align: top;
                &:nth-child(1) {
                    width: 30%;
                    height: auto;
                }
                &:nth-child(2) {
                    width: 60%;
                    height: auto;
                    img {
                        width: 50%;
                        height: auto;
                        margin: auto;
                    }
                }
            }
        }
    }
    .bottom {
        margin: 1rem auto;
        width: 96%;
    }
}

</style>

<template>

<div class="checkinfo">
    <group>
        <a v-link="editPath">
            <cell title="报名信息核对" value="编辑" :is-link="isLink"></cell>
        </a>
    </group>
    <div class="content">
        <div>
            <span>项目名称</span>
            <span>{{ eventName }}</span>
        </div>
        <div v-for="(index, list) in info | changeName">
            <div v-if="index == '健康证书' || index == '成绩证书' ">
                <span>{{ index }}</span>
                <span><img :src=" 'http://stor.ihuipao.cn/' + list " alt="" /></span>
            </div>
            <div v-else>
                <span>{{index}}</span>
                <span>{{list}}</span>
            </div>
        </div>
        <div>
            <span>地址</span>
            <span v-for="list in addressArray" track-by="$index">{{list.name}}</span>&nbsp;
        </div>
        <div v-for="(index, list) in filterInfo">
            <div v-if=" typeof list == 'string' ">
                <div v-if=" list.match('jpg') || list.match('png') || list.match('jpeg') || list.match('gif') ">
                    <span>{{index}}</span>
                    <span><img :src=" 'http://stor.ihuipao.cn/' + list " alt="" /></span>
                </div>
            </div>
            <div v-else>
                <span>{{index}}</span>
                <span>{{list}}</span>
            </div>
        </div>
    </div>
    <group>
        <cell :title="'报名费:' + info.fee + '￥' "></cell>
    </group>
    <div class="bottom">
        <button text="确认" type="primary" @click="checkout">
			<spinner type="crescent" v-show="spinner.show" :style="spinner.style"></spinner>
		</button>
    </div>
</div>

</template>

<script>

import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import Button from 'vux/components/x-button'
import Spinner from 'vux/components/spinner'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router()
export default {
    name: 'checkinfo',
    components: {
        Group, Cell, Button, Spinner
    },
    data() {
        return {
            info: this.$root.singelPesonInfo,
            ids: null,
            eventName: this.$root.eventName,
            addressArray: [],
            isLink: true,
			spinner: {
                show: false,
                style: {
                    'margin-left': '1rem'
                }
            }
        }
    },
    computed: {
        ids() {
                return this.$root.ids
            },
            country() {
                for (let i = 0; i < this.$root.country.length; i++) {
                    if (info.country == this.$root.country) {
                        return this.$root.country.name
                    }
                }
            },
            filterInfo() {
                let _id, obj = {}
                for (let i in this.info) {
                    let value = this.info[i]
                    if (typeof value == 'string') {
                        if (i.match('filed_')) {
                            _id = i.replace(/filed_/, '')
                            for (let k = 0; k < this.$root.customString.length; k++) {
                                if (_id = this.$root.customString[k].id) {
                                    obj[this.$root.customString[k].name] = this.info['filed_' + _id]
                                }
                            }
                        }
                    }
                }
                return obj
            },
            editPath() {
                return '/register/' + this.$root.eventId
            }
    },
    ready() {
        let self = this
        let data = []
        data.push(this.info.country)
        data.push(this.info.province)
        data.push(this.info.city)
        $.ajax({
            url: 'http://interface.ihuipao.cn/index/areas',
            type: 'POST',
            dataType: 'json',
            data: {
                raceid: raceid,
                keynames: data
            },
            xhrFields: {
                withCredentials: true,
            },
            success: function(data) {
                self.addressArray = data.data
            },
            error: function() {
                console.error('fail')
            }
        })
    },
    methods: {
        checkout() {
            let self = this
            let data = {
                raceid: raceid,
                'ids[]': self.ids
            }
			//显示加载动画
			this.spinner.show = true
            $.ajax({
                url: 'http://interface.ihuipao.cn/race/checkout',
                type: 'POST',
                dataType: 'json',
                data: data,
                xhrFields: {
                    withCredentials: true,
                },
                success: function(data) {
                    if (data.code == 'fail') {
                        alert(data.message)
                        return false
                    }
                    self.$root.orderId = data.data.orderid
                    router.go({
                        path: '/order'
                    })
                },
                error: function() {}
            })
        }
    }
}

</script>

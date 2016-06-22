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
            [0]    &:nth-child(1) {
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
            <cell title="报名详情" :is-link="isLink" value="返回"></cell>
        </a>
    </group>
    <div class="content">
        <div>
            <span>项目名称</span>
            <span>{{ eventName }}</span>
        </div>
        <div v-for="(index, list) in info | changeOrderInfo">
            <span>{{ index }}</span>
            <span>{{ list }}</span>
        </div>
        <div>
            <span>地址</span>
            <span v-for="list in addressArray" track-by="$index">{{ list.name }}</span>
        </div>

    </div>
</div>

</template>

<script>

import Group from 'vux/components/group'
import Cell from 'vux/components/cell'
import Button from 'vux/components/x-button'

export default {
    name: 'orderinfo',
    components: {
        Group, Cell, Button
    },
    data() {
        return {
            info: {},
            eventName: this.$root.eventName,
            addressArray: [],
            isLink: true
        }
    },
    computed: {
        editPath() {
            if(this.$root.hasCustomString) {
                return  '/register/' + this.$root.eventId
            }else {
                return '/reglist/' + this.$root.eventId
            }
        }
    },
    ready() {
        let self = this
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/orderinfo',
            type: 'POST',
            dataType: 'json',
            data: {
                raceid: raceid,
                orderid: this.$root.orderId
            },
            xhrFields: {
                withCredentials: true,
            },
            success: function(data) {
                self.info = data.data.orderinfo[0]
                let arr = []
                arr.push(data.data.orderinfo[0].country)
                arr.push(data.data.orderinfo[0].province)
                arr.push(data.data.orderinfo[0].city)
                $.ajax({
                    url: 'http://interface.ihuipao.cn/index/areas',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        raceid: raceid,
                        keynames: arr
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
            error: function() {
                console.error('fail')
            }
        })
    }
}

</script>

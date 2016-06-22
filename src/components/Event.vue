<template>
    <div>
        <group :title="title">
            <div
                v-for="list in event"
                @click="changePage($index,list.id, list.name)"
                style="border-bottom: 1px solid #f0f0f0;">
                 <cell :title="list.name" :is-link="boolen"></cell>
            </div>
        </group>
    </div>
</template>

<script>
import Group from 'vux/components/group/'
import Cell from 'vux/components/cell/'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)
const router = new Router();

export default {
    name: "event",
    components: { Group, Cell },
    data() {
        return {
            title: '请选择项目',
            event:[],
            boolen: true
        }
    },
    ready(){
        //活动项目的数据
        var self = this;
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/event/raceid/'+ raceid,
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success:function(data){
                self.event = data.data
            },
            error:function(){
                console.error("fail")
            }
        })
    },
    methods:{
        changePage(index,id, name){
            this.$root.raceInfo = this.event[index].field
            this.$root.customString = this.event[index].other
            this.$root.singelPesonInfo.fee = this.event[index].fee
            this.$root.eventName = name
            this.$root.eventId = id
            if(this.event[index].other.length){
                this.$root.hasCustomString = true
            }else{
                this.$root.hasCustomString = false
            }
            router.go({
                path: '/protocol/'+ id
            })
        }
    }
}
</script>

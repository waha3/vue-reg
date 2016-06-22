<template>
    <div>
        <div>
            <sidebar>
               <accordion slot="accordion" :nav="nav"></accordion>
            </sidebar>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Accordion from './Accordion.vue'

export default {
    name: "app",
    components:{ Event , Accordion , Sidebar },
    data(){
        return {
            nav: [],
            name: null,
            isopenList: [],
            singelPesonInfo: {},
            raceInfo: {},
            customString: [],
            ids:null,
            orderId: null,
            checkdetail: [],
            eventName: '',
            country: '',
            hasCustomString: null,
            eventId: null
        }
    },
    watch: {
      'ids': function(data) {
          this.$broadcast('ids',data)
      }
    },
    ready(){
        let self = this;
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/nav/raceid/' + raceid,
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success:function(data){
                self.nav = data.data;
                for(let i = 0; i< self.nav.length; i++){
                     self.isopenList.push(false)
                }
            },
            error:function(){
                console.error('fail')
            }
        })
        $.ajax({
            url: 'http://interface.ihuipao.cn/index/userinfo',
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success:function(data){
                if(data.code == 10001){
                    window.location.href = 'http://ihuipao.cn/user/login?_r=' + url
                }
            },
            error:function(){
                console.error('fail')
            }
        })
    }
}
</script>

<style>
    @import '~vux/vux.css';
    .weui_mask,
    .weui_mask_transition,
    .weui_mask_transparent{
        z-index: 2;
    }
</style>

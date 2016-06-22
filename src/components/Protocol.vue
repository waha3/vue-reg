<template>
	<div class="protocol">
		<div class="content">{{{content}}}</div>
		<div>
			<vbutton type="primary" :text="text" @click="register"></vbutton>
		</div>
	</div>
</template>
<script>
	import vbutton from 'vux/components/x-button'
	import Vue from 'vue'
	import Router from 'vue-router'
	Vue.use(Router)
	const router = new Router()

	export default {
		name:'protocol',
		components:{ vbutton },
		data(){
			return {
				text:'我已经阅读同意《免责声明》',
				content:[]
			}
		},
		created(){
			/**
	        *免责声明
	        */
	        var self = this;
	        $.ajax({
	            url: 'http://interface.ihuipao.cn/race/protocol/raceid/' + raceid,
	            type: "GET",
	            dataType: "json",
	            xhrFields: {
	                withCredentials: true,
	            },
	            success:function(data){
	                self.content = data.data.content
	            },
	            error:function(){
	                console.error("fail")
	            }
	        })
		},
		methods:{
			register(){
				let url = window.location.href;
				let id = url.split('/').pop();
				let link = '/reglist/' + id;
				router.go({
					path: link
				})
			}
		}
	}
</script>

<style lang="stylus">
	.protocol{
		width: 96%;
		height: auto;
		margin: 1rem auto;
		.content{
			width: 100%;
			height: auto;
			p{
				color:#666;
				font-size: 14px;
				margin-bottom: 10px;
			}
		}
	}
</style>

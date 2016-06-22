<template>
	<group>
		<my-selector
		   title="国家"
		   @click="dispatchFormData"
		   :options="form.country"
		   placeholder="请选择"
		   :value.sync="formData.country"
		   :selected.sync="formData.country">
	   </my-selector>
		<my-selector
           title="省份"
		   @click="dispatchFormData"
           :options="form.province"
           placeholder="请选择"
           :value.sync="formData.province"
			:selected.sync="formData.province">
       </my-selector>
		<my-selector title="城市"
           :options="form.city"
		    @click="dispatchFormData"
           placeholder="请选择"
           :value.sync="formData.city"
			:selected.sync="formData.city">
       </my-selector>
     </group>
</template>

<script>
	import Group from 'vux/components/group'
	import MySelector from 'vux/components/selector'
	export default {
		components:{ Group, MySelector },
		data(){
			return {
				form:{
					country:[],
					province:[],
					city:[]
				},
				formData: {}
			}
		},
		ready(){
            let self = this;
            $.ajax({
                url: 'http://interface.ihuipao.cn/index/area',
                type: "POST",
                dataType: "json",
                xhrFields: {
                    withCredentials: true,
                },
				data: {
					parent: 'country'
				},
                success:function(data){
                    for(let i = 0;i<data.data.length;i++){
                        self.form.country.push({
                            value: data.data[i].name,
                            key: data.data[i].keyname
                        })
                    }
                },
                error:function(){
                    console.error("fail")
                }
            })
		},
        watch:{
            'formData.country' :function(val){
				this.form.city.splice(0, this.form.city.length)
				this.formData.city = ''
				this.formData.province = ''
                let self = this;
				this.$root.singelPesonInfo.country = this.formData
                $.ajax({
                    url: 'http://interface.ihuipao.cn/index/area',
                    type: "GET",
                    dataType: "json",
                    data:{
                        parent:self.formData.country
                    },
                    xhrFields: {
                        withCredentials: true,
                    },
                    success:function(data){
                        let address = [];
                            address = address.slice(0,0);
                        for(let i = 0;i < data.data.length;i++){
                            address.push({
                                value: data.data[i].name,
                                key: data.data[i].keyname
                            })
                        }
                        self.form.province = address;
                    },
                    error:function(){
                        console.error("fail")
                    }
                })
            },
            'formData.province': function(val){
                let self = this;
				this.$root.singelPesonInfo.province = this.formData
                $.ajax({
                    url: 'http://interface.ihuipao.cn/index/area',
                    type: "GET",
                    dataType: "json",
                    data:{
                        parent:self.formData.province
                    },
                    xhrFields: {
                        withCredentials: true,
                    },
                    success:function(data){
                        let address = [];
                            address = address.slice(0,0);
                        for(let i = 0;i<data.data.length;i++){
                            address.push({
                                value: data.data[i].name,
                                key: data.data[i].keyname
                            })
                        }
                        self.form.city = address;
                    },
                    error:function(){
                        console.error("fail")
                    }
                })
            },
			'formData.city': function(){
				this.$root.singelPesonInfo.city = this.formData.city
			}
        },
        methods:{
            dispatchFormData(){
				if(this.formData.country != ''){
					this.$dispatch('getterData', this.formData)
				}
            }
        }
	}
</script>

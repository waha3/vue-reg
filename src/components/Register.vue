<style lang="stylus">

.register {
    width: 100%;
    margin: 1rem auto;
    .btn {
        width: 96%;
        margin: 1rem auto;
    }
}

</style>

<template>

<div class="register">
    <group v-show="formShow.name">
        <my-input title="姓名" :value.sync="formData.name"></my-input>
    </group>
    <group v-show="formShow.firstname">
        <my-input title="英文名" placeholder="名/given name" :value.sync="formData.firstname"></my-input>
        <my-input placeholder="姓/family name" :value.sync="formData.lastname"></my-input>
    </group>
    <group v-show="formShow.gender">
        <my-radio title="性别" :options="form.options" :value.sync="formData.gender">
        </my-radio>
    </group>
    <group v-show="formShow.certificate_id">
        <my-selector title="证件号码" :options="form.certficate" placeholder="请选择" :selected.sync="formData.certificate_type" :value.sync="formData.certificate_type">
        </my-selector>
        <my-input placeholder="证件号码" :value.sync="formData.certificate_id"></my-input>
    </group>
    <group v-show="formShow.birthdate">
        <date-time title="出生日期" :value.sync="formData.birthdate" :max-year="form.maxYear" :min-year="form.minYear">
        </date-time>
    </group>
    <group v-show="formShow.blood">
        <my-selector title="血型" :options="form.blood" placeholder="请选择" :selected.sync="formData.blood" :value.sync="formData.blood">
        </my-selector>
    </group>
    <group v-show="formShow.nationality">
        <my-selector title="国籍" :options="form.nationality" placeholder="请选择" :selected.sync="formData.nationality" :value.sync="formData.nationality">
        </my-selector>
    </group>
    <group v-show="formShow.country">
        <!-- <address></address> -->
        <my-selector title="国家" :options="form.country" placeholder="请选择" :value.sync="formData.country" :selected.sync="formData.country">
        </my-selector>
        <my-selector title="省份" :options="form.province" placeholder="请选择" :value.sync="formData.province" :selected.sync="formData.province">
        </my-selector>
        <my-selector title="城市" :options="form.city" placeholder="请选择" :value.sync="formData.city" :selected.sync="formData.city">
        </my-selector>
    </group>
    <group>
        <my-input placeholder="邮箱" :value.sync="formData.email"></my-input>
    </group>
    <group v-show="formShow.mobile">
        <my-selector title="联系电话" :options="form.mobile" :value.sync="formData.mobile_code" :selected.sync="formData.mobile_code">
        </my-selector>
        <my-input placeholder="联系电话" :value.sync="formData.mobile"></my-input>
    </group>
    <group v-show="formShow.emergency_contact_person">
        <my-input title="紧急联系人" :value.sync="formData.emergency_contact_person"></my-input>
    </group>
    <group v-show="formShow.emergency_mobile">
        <my-selector title="紧急联系电话" :options="form.mobile" :value.sync="formData.emergency_mobile_code" :selected.sync="formData.emergency_mobile_code">
        </my-selector>
        <my-input placeholder="紧急联系电话" :value.sync="formData.emergency_mobile"></my-input>
    </group>
    <group v-show="formShow.cloth_size">
        <my-selector title="服装尺码" placeholder="请选择" :value.sync="formData.cloth_size" :selected.sync="formData.cloth_size" :options="form.cloth_size"></my-selector>
    </group>
    <group title="成绩证书" v-show="formShow.pb_certificate">
        <upload placeholder="成绩证书" name="pb_certificate" :file-adress="formData.pb_certificate" accept="image/*" action="http://upload.qiniu.com/" multiple>
        </upload>
    </group>
    <group title="健康证明" v-show="formShow.health_certificate">
        <upload placeholder="健康证明" name="health_certificate" :file-adress="formData.health_certificate" action="http://upload.qiniu.com/" accept="image/*" multiple>
        </upload>
    </group>
    <!-- 自定义字段 -->
    <group v-show="input.length">
        <my-input v-for="list in input" :title="list.name" :placeholder="list.default_value" :value.sync="formData[ 'filed_'+list.id ]">
        </my-input>
    </group>

    <group v-show="time.length">
        <date-time v-for="list in time" :title="list.name" :max-year="form.maxYear" :min-year="form.minYear" placeholder="list.name" :value.sync="formData[ 'filed_'+list.id ]">
        </date-time>
    </group>

    <group v-show="textarea.length">
        <my-textarea v-for="list in textarea" placeholder="自定义字段" :value.sync="formData[ 'filed_'+list.id ]">
        </my-textarea>
    </group>

    <group v-show="radio.length">
        <my-radio v-for="list in radio" :options="list.val | changeRadioOptions" :value.sync="formData[ 'filed_'+list.id ]">
        </my-radio>
    </group>

    <group v-show="checkbox.length">
        <check-list v-for="list in checkbox" :title="list.name" :options="list.val | changeCheckboxOptions" :min="list.min_length" :max="list.max_length" :value.sync="formData[ 'filed_'+list.id ]">
        </check-list>
    </group>

    <group v-show="select.length">
        <my-selector :title="list.name" v-for="list in select" placeholder="请选择" :options="list.val | changeSelectOptions" :value.sync="formData[ 'filed_'+list.id ]">
        </my-selector>
    </group>

    <group v-show="file.length" v-for="list in file" :title="list.name">
        <upload action="http://upload.qiniu.com/" :name=" 'filed_'+list.id" :file-adress="formData[ 'filed_'+list.id ]" :placeholder="list.name" :accept="list.format | formatMIME" :file-address="formData[ 'filed_'+list.id ]">
        </upload>
    </group>

    <div class="btn">
        <button
            text="确认添加"
            type="primary"
            @click="post"
            :disabled="btnDisabled">
            <spinner type="ripple" v-show="spinner.show" :style="spinner.style"></spinner>
        </button>
    </div>
    <confirm :show.sync="confirm.show" :title="confirm.title" :confirm-text="confirm.confirmText" :cancel-text="confirm.cancelText">
    </confirm>
</div>

</template>

<script>

import MyInput from 'vux/components/x-input'
import Button from 'vux/components/x-button'
import Group from 'vux/components/group'
import MyRadio from './Radio/index.vue'
import MySelector from 'vux/components/selector'
import DateTime from 'vux/components/datetime'
import Address from './Address.vue'
import Upload from './Upload/index.vue'
import MyTextarea from 'vux/components/x-textarea'
import CheckList from './Checklist/index.vue'
import Confirm from './Confirm/index.vue'
import Spinner from 'vux/components/spinner'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router()

export default {
    name: 'register',
    components: {
        Spinner, MyInput, Button, Group, MySelector, MyRadio, Confirm, DateTime, Address, Upload, MyTextarea, CheckList
    },
    data() {
        return {
            path: '/checkinfo',
            form: {
                options: [{
                    text: '男',
                    value: 'male'
                }, {
                    text: '女',
                    value: 'female'
                }],
                certficate: [{
                    key: 'identity',
                    value: '二代身份证'
                }, {
                    key: 'passport',
                    value: '护照'
                }, {
                    key: 'other',
                    value: '其他'
                }],
                blood: [{
                    key: 'a',
                    value: 'A型'
                }, {
                    key: 'b',
                    value: 'B型'
                }, {
                    key: 'ab',
                    value: 'AB型'
                }, {
                    key: 'o',
                    value: 'O型'
                }],
                nationality: [],
                country: [],
                province: [],
                city: [],
                mobile: [],
                maxYear: 2100,
                minYear: 1900,
                cloth_size: [{
                    value: 'S',
                    key: 's'
                }, {
                    value: 'M',
                    key: 'm'
                }, {
                    value: 'L',
                    key: 'l'
                }, {
                    value: 'XL',
                    key: 'xl'
                }, {
                    value: 'XXL',
                    key: 'xxl'
                }]
            },
            formData: {},
            personInfo: this.$root.singelPesonInfo,
            formShow: this.$root.raceInfo,
            uploadFile: null,
            customString: this.$root.customString,
            input: [],
            time: [],
            textarea: [],
            radio: [],
            checkbox: [],
            select: [],
            file: [],
            btnDisabled: false,
            toastShow: false,
            toastContent: '编辑成功',
            confirm: {
                show: false,
                title: '请选择',
                confirmText: '立即支付',
                cancelText: '重新报名'
            },
            id: null,
            spinner: {
                show: false,
                style: {
                    'margin-left': '1rem'
                }
            }
        }
    },
    created() {
        for (let i in this.$root.singelPesonInfo) {
            if (i == 'country' || i == 'province' || i == 'city') {
            } else {
                this.formData[i] = this.$root.singelPesonInfo[i]
            }
        }
    },
    beforeCompile() {
        for (let i = 0, length = this.customString.length; i < length; i++) {
            switch (this.customString[i].typename) {
                case 'input':
                    this.input.push(this.customString[i])
                    break
                case 'time':
                    this.time.push(this.customString[i])
                    break
                case 'textarea':
                    this.textarea.push(this.customString[i])
                    break
                case 'radio':
                    this.radio.push(this.customString[i])
                    break
                case 'checkbox':
                    this.checkbox.push(this.customString[i])
                    break
                case 'select':
                    this.select.push(this.customString[i])
                    break
                case 'file':
                    this.file.push(this.customString[i])
                    break
            }
        }
    },
    ready() {
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
            success: function(data) {
                for (let i = 0; i < data.data.length; i++) {
                    self.form.nationality.push({
                        value: data.data[i].name,
                        key: data.data[i].keyname
                    })
                    self.form.country.push({
                        value: data.data[i].name,
                        key: data.data[i].keyname
                    })
                    if (data.data[i].mobile_code == 0) {
                        // return
                    } else {
                        self.form.mobile.push({
                            value: '+' + data.data[i].mobile_code,
                            key: data.data[i].mobile_code
                        })
                    }
                }
                //watch 地址变化
                self.formData.country = self.$root.singelPesonInfo.country
                self.formData.province = self.$root.singelPesonInfo.province
                self.formData.city = self.$root.singelPesonInfo.city
            },
            error: function() {
                console.error("fail")
            }
        })
    },
    watch: {
        'formData.country': function(val) {
            this.form.city.splice(0, this.form.city.length)
            this.formData.city = ''
            this.formData.province = ''
            let self = this;
            $.ajax({
                url: 'http://interface.ihuipao.cn/index/area',
                type: "GET",
                dataType: "json",
                data: {
                    parent: self.formData.country
                },
                xhrFields: {
                    withCredentials: true,
                },
                success: function(data) {
                    let address = [];
                    address = address.slice(0, 0);
                    for (let i = 0; i < data.data.length; i++) {
                        address.push({
                            value: data.data[i].name,
                            key: data.data[i].keyname
                        })
                    }
                    self.form.province = address;
                },
                error: function() {
                    console.error("fail")
                }
            })
        },
        'formData.province': function(val) {
            let self = this;
            $.ajax({
                url: 'http://interface.ihuipao.cn/index/area',
                type: "GET",
                dataType: "json",
                data: {
                    parent: self.formData.province
                },
                xhrFields: {
                    withCredentials: true,
                },
                success: function(data) {
                    let address = [];
                    address = address.slice(0, 0);
                    for (let i = 0; i < data.data.length; i++) {
                        address.push({
                            value: data.data[i].name,
                            key: data.data[i].keyname
                        })
                    }
                    self.form.city = address;
                },
                error: function() {
                    console.error("fail")
                }
            })
        }
    },
    methods: {
        post() {
            let self = this;
            let obj = {};
            let url = window.location.href;
            obj.raceid = raceid;
            //项目的id
            obj.eventid = url.split('/').pop();
            obj.from = 'new'
            Object.assign(obj, this.formData)
            //btn不可以点击
            this.btnDisabled = true
            if (!this.$root.ids) {  //ids不存在 不是编辑
                $.ajax({
                    url: 'http://interface.ihuipao.cn/race/register',
                    type: "POST",
                    dataType: "json",
                    data: obj,
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: function(data) {
                        //btn可以点击
                        self.btnDisabled = false
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
                            //正常操作走下一步
                            self.$root.singelPesonInfo = self.formData
                            //获取orderId
                            self.$root.ids = data.data.reg.id
                            //checkinfo页面
                            router.go({
                                path: '/checkinfo'
                            })
                        }
                    },
                    error: function() {
                        //btn可以点击
                        self.btnDisabled = false
                        console.error("fail")
                    }
                })
            } else {  //ids存在 是编辑
                obj.id = this.$root.ids
                $.ajax({
                    url: 'http://interface.ihuipao.cn/race/editreg',
                    type: "POST",
                    dataType: "json",
                    data: obj,
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: function(data) {
                        //btn可以点击
                        self.btnDisabled = false
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
                                }
                            }
                        } else {
                            //正常操作走下一步
                            self.$root.singelPesonInfo = self.formData
                            //调确认订单页面
                            router.go({
                                path: '/checkinfo'
                            })
                        }
                    },
                    error: function() {
                        //btn可以点击
                        self.btnDisabled = false
                        console.error("fail")
                    }
                })
            }

        }
    },
    events: {
        'dispatchData': function(file, name) {
            this.formData[name] = file
        },
        'on-confirm': function(data) {
            if(data == '取消') {
                return
            }else {
                let obj = {},
                    self = this
                obj.id = this.id
                obj.raceid = raceid
                //显示加载动画
                this.spinner.show = true
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
            let obj = {},
                self = this
            obj.id = this.id
            obj.raceid = raceid
            //显示加载动画
            this.spinner.show = true
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

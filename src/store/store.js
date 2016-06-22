import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = {
	name: '',             //赛事名称
	isopenList: [],       //侧边栏关闭开启的状态
	singelPesonInfo: {},  //报名成功的个人信息
	raceInfo: {},         //赛事项目的信息
	ids: null,			  //确认订单的订单ids
	orderId: null         //支付的订单号
}

const mutations = {
	ACCORDION(store) {
		// store.isopenList = 
	}

	CHANGE_IDS(store, ids) {
		store.ids = ids
	}
}

export default Vuex.new Store({
	store, mutations
})

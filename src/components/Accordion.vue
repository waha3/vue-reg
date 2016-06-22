<template>
	<div class="accordion">
		<ul class="root_ul" v-for="list in nav">
			<li @click="setIsOpen($index)" :class="{ isopen: isopenList[$index] }" transition="ease">
				<a :link="list.url">{{list.name}}</a>
				<ul v-for="sub_list in list.subs">
					<li><a :link="sub_list.url">{{sub_list.name}}</a></li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name:'accordion',
		data(){
			return {
				isopenList:this.$root.isopenList
			}
		},
		props:{
			nav:{
				type:Array
			}
		},
		methods:{
			setIsOpen(index){
				this.isopenList.$set(index, !this.isopenList[index] )
			}
		}
	}
</script>

<style lang="stylus">
	.accordion{
		width: 100%;
		height: auto;
		.root_ul{
			width: 100%;
			height: auto;
			& > li {
				width: 100%;
				height: auto;
				min-height: 3rem;
				line-height: 3rem;
				list-style-type: none;
				text-align: center;
				border-bottom: 1px solid #f0f0f0;
				font-size: 16px;
				color:#666;
				& > ul {
					width: 100%;
					height: 0px;
					transition: height 0.3s ease;
					& > li {
						width: 100%;
						height: 0px;
						transition: height 0.3s ease;
						line-height: 3rem;
						list-style-type: none;
						border-bottom: 1px solid #f0f0f0;
						background: #f4f4f4;
						a{
							display:none;
						}

					}
				}
			}
			.isopen{
				ul{
					height: auto;
					li{
						height:3rem;
						a{
							display:block;
						}
					}
				}

			}
			.active{
				background: blue;
			}
		}
	}
</style>

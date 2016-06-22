<style lang="stylus">

    #container {
        width: 100%;
        height: auto;
        min-height: 100%;
        position: relative;
        #sidebar {
            width: 80%;
            height: auto;
            min-height: 100%;
            position: fixed;
            z-index: 1000;
            transition: all 300ms ease;
            right: -80%;
            background: #fff;
        }
        #content {
            width: 100%;
            height: auto;
            background: #fff;
            min-height: 100%;
            position: absolute;
            transition: all 300ms ease;
            padding-bottom: 5rem;
            overflow: hidden;
            .mask {
                width: 100%;
                height: 100%;
                opacity: 0.5;
                background: #000;
                z-index: 10000;
                position: fixed;
            }
            &>div {
                background: #fff;
            }
            header {
                width: 100%;
                height: 4rem;
                line-height: 4rem;
                background: #fff;
                border-bottom: 1px solid #f0f0f0;
                box-shadow: 0px 2px 2px #f0f0f0;
                position: fixed;
                top: 0px;
                z-index: 2;
                &>div {
                    float: left;
                    height: 100%;
                }
                .left {
                    width: 15%;
                }
                .middle {
                    width: 70%;
                    text-align: center;
                    a {
                        width: 100%;
                        height: 100%;
                        display: block;
                        font-size: 1.4em;
                        font-weight: bold;
                        color: #666;
                    }
                }
                .right {
                    width: 15%;
                    .sidebarBtn {
                        width: 100%;
                        height: 100%;
                        background: url('http://r0.ihuipao.cn/racelist/img/bar.png') no-repeat 6px;
                    }
                }
            }
            footer {
                width: 100%;
                height: 4rem;
                line-height: 4rem;
                position: fixed;
                bottom: 0px;
                overflow: hidden;
                box-shadow: 0px -4px 6px #f0f0f0;
                z-index: 1;
                background: #fff;
                &>div {
                    width: 25%;
                    height: 100%;
                    float: left;
                    a {
                        font-size: 16px;
                        color: #666;
                        text-align: center;
                        // line-height: 4rem;
                        color: #666;
                        border-right: 1px solid #f4f4f4;
                        display: block;
                    }
                }
                .selected {
                    background: #333 !important;
                    color: #fff;
                }
            }
            .slot {
                margin-top: 5rem;
            }
        }
    }

    .fade-enter{
        opacity: 1;
        transform: translate3d(100%, 0, 0);
     }
      .fade-leave {
        opacity: 0;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
      .back-enter {
        opacity: 1;
        -webkit-transform: translate3d(-110%, 0, 0);
        transform: translate3d(-110%, 0, 0);
      }
      .back-leave{
        opacity: 0;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

</style>

<template>

<div id="container">
    <div id="sidebar" :style="styleObject1">
        <slot name="accordion"><slot>
    </div>
    <div id="content" :style="styleObject2">
        <div class="mask" v-show="show" @click="moveSideBar"></div>
        <header>
            <div class="left"></div>
            <div class="middle"><a v-link="{path:'/'}">{{ name }}</a></div>
            <div class="right">
                <div class="sidebarBtn" @click="moveSideBar"></div>
            </div>
        </header>
        <div class="slot">
            <router-view
                :transition="effect"
                transition-mode="out-in">
            </router-view>
        </div>
        <footer>
            <div><a>查询</a></div>
            <div><a>成绩</a></div>
            <div><a v-link="{path:'/paid', activeClass:'selected'}">已支付</a></div>
            <div><a style="background: #ff5151; color: #fff; border-right: none;" v-link="{path:'/event', activeClass:'selected'}">报名</a></div>
        </footer>
    </div>
</div>

</template>

<script>

export default {
    name: 'sidebar',
    data() {
        return {
            effect: 'fade',
            name: null,
            count: 0,
            show: false,
            styleObject1: {
                right: '-80%'
            },
            styleObject2: {
                right: 0
            }
        }
    },
    methods: {
        moveSideBar() {
            if (!this.count) {
                this.styleObject1.right = 0;
                this.styleObject2.right = '80%';
                this.count = 1;
                this.show = true;
            } else {
                this.styleObject1.right = '-80%';
                this.styleObject2.right = 0;
                this.count = 0;
                this.show = false;
            }
        }
    },
    ready() {
        let height = $(document).height();
        $('.mask').height(height);
    },
    events: {
        'raceName': function(data){
            this.name = data
        }
    }
}

</script>

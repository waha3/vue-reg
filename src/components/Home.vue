<style lang="stylus">

.home {
    width: 100%;
    height: auto;
    .banner {
        width: 100%;
        height: auto;
        img {
            width: 100%;
            height: auto;
            border: none;
        }
    }
    .content {
        width: 92%;
        margin: auto;
        h3 {
            line-height: 2em;
        }
        p {
            color: #666;
            line-height: 1.6em;
            font-size: 14px;
        }
        table {
            width: 100%;
            height: auto;
            color: #666;
            border: 1px solid #f0f0f0;
            tr {
                th {
                    height: 2rem;
                    border: 1px solid #f0f0f0;
                    text-align: center;
                    word-break: break-all;
                }
                td {
                    height: 2rem;
                    border: 1px solid #f0f0f0;
                    text-align: center;
                    word-break: break-all;
                }
            }
        }
    }
}

</style>

<template>

<div class="home">
    <div class="banner"><img :src="image"></div>
    <group>
        <cell title="比赛概要"></cell>
    </group>
    <div class="content">{{{content}}}</div>
</div>

</template>

<script>

import Group from 'vux/components/group/'
import Cell from 'vux/components/cell/'
import Swiper from 'vux/components/swiper/'
export default {
    name: 'home',
    components: {
        Group, Cell, Swiper
    },
    data() {
        return {
            image: '',
            content: ''
        }
    },
    created() {
        let self = this;
        $.ajax({
            url: 'http://interface.ihuipao.cn/race/index/raceid/' + raceid,
            type: "GET",
            dataType: "json",
            xhrFields: {
                withCredentials: true,
            },
            success: function(data) {
                self.image = data.data.race.image;
                self.content = data.data.rules.content;
                self.$dispatch('raceName', data.data.race.name)
                self.$broadcast('broadcastRaceName', data.data.race.name)
            },
            error: function() {
                console.error("fail")
            }
        })
    }
}

</script>

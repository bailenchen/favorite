<template>
  <div>
    <div class="shouc clearfix" ref="view_box">
      <div v-if="have" class="content" ref="content">
        <div class="shouc-item" v-for="(item, index) in collects" :key="index">
          <a
            @click.prevent="view($event, item)"
            :href="item.url"
            target="_blank"
            ref="shouc_item"
          >
            <div class="title-wrap">
              <div class="title">{{ item.title }}</div>
            </div>
            <div class="img-wrap">
              <img :src="item.img" alt="" />
              <div class="image-note" :title="item.description">
                {{ item.description }}
              </div>
            </div>
            <div class="bottom">
              <div class="tag-box"></div>
              <div class="info">
                <div class="time" title="2020-05-31 13:06:37">
                  收藏于：{{ (item.create_time * 1000) | timeago }}
                </div>
                <div class="item-view" :title="'阅读：' + item.views">
                  <i class="iconfont icon-liulan"></i>
                  {{ item.views }}
                </div>
              </div>
              <div class="url">
                <div class="host" :title="item.url">
                  <img :src="ico(item.url)" alt="" />
                  {{ item.url | host }}
                </div>
                <div class="card-menu">
                  <div class="sc-esjQYD card-menu-ico">
                    <i
                      @click="edit(item)"
                      class="iconfont icon-bianji-copy"
                      title="编辑"
                    ></i>
                  </div>
                  <div class="sc-esjQYD card-menu-ico">
                    <i class="iconfont icon-shanchu" title="删除"></i>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="none-content" v-else>
        <img
          src="https://withpinbox.com/static/media/search-empty.44e18769.png"
          alt=""
        />
        非常抱歉，没有找到相关内容
      </div>
      <div v-if="have" class="scroll" ref="bar_box">
        <div class="bar" ref="bar"></div>
      </div>
    </div>
    <page :total="total" @setPage="handlePageChange"></page>
  </div>
</template>

<script>
import utils from '@/plugins/utils.js'
import { mapState, mapActions } from 'vuex'
import page from '@/components/Page.vue'
export default {
  data() {
    return {
      total: 0,
      limit: 10
    }
  },
  computed: {
    ...mapState('collect', ['collects', 'have'])
  },
  created() {
    this.getCollectData()
  },
  methods: {
    ...mapActions('collect', [
      'getCollects',
      'set_editUrl',
      'set_currectItem',
      'isHave'
    ]),
    async getCollectData(start = 0) {
      let reg = /\/favorite\/(\S+)/
      let res = reg.exec(this.$route.path)
      let data = null
      if (res === null) {
        data = await this.$http({
          url: '/favorite/all',
          params: { start, limit: this.limit }
        })
      } else if (res[1] === 'search') {
        data = await this.$http({
          url: '/favorite/search',
          params: {
            keyword: encodeURI(this.$route.query.q),
            start,
            limit: this.limit
          }
        })
      } else {
        data = await this.$http({
          url: '/favorite',
          params: { fid: this.$route.params.id, start, limit: this.limit }
        })
      }

      if (data.data.code === 200) {
        this.isHave(true)
        this.total = data.data.total
        this.getCollects(data.data)
      } else {
        this.total = 0
        this.isHave(false)
      }
    },

    handlePageChange(page) {
      // 根据页码计算start
      let start = (page - 1) * this.limit
      this.getCollectData(start)
    },
    async view(e, item) {
      if (e.target.nodeName === 'I') return
      window.open(item.url)
      let num = item.views + 1
      let { data } = await this.$http.put('/favorite/views', {
        data: {
          id: item.id,
          views: num
        }
      })
      if (data.code === 200) item.views += 1
    },
    edit(item) {
      this.set_editUrl()
      this.set_currectItem(item)
    },

    ico(url) {
      var reg = /^(http:\/\/|https:\/\/)(\S+?)\//gi
      let res = reg.exec(url)
      return res[1] + res[2] + '/favicon.ico'
    }
  },
  components: {
    page
  },
  watch: {
    $route(to, from) {
      this.getCollectData()
    },
    collects: function(val, oldVal) {
      let _this = this
      this.$nextTick().then(function() {
        // 滚动
        utils.scroll({
          viewBox: _this.$refs.view_box,
          content: _this.$refs.content,
          barBox: _this.$refs.bar_box,
          bar: _this.$refs.bar
        })

        window.addEventListener('resize', e => {
          utils.scroll({
            viewBox: _this.$refs.view_box,
            content: _this.$refs.content,
            barBox: _this.$refs.bar_box,
            bar: _this.$refs.bar
          })
        })
      })
    }
  },

  filters: {
    timeago: utils.timeago,
    host: function(value) {
      let reg = /\/\/(\S+?)\//gi
      return reg.exec(value)[1]
    }
  }
}
</script>

<style lang="less" scoped>
a:visited {
  outline: none;
}
.shouc {
  max-width: 1420px;
  height: 700px;
  overflow-y: hidden;
  padding: 0 15px;
  margin: 0 auto;
  background: pink;
  background: #f5f5f5;
  position: relative;
}
.shouc-item {
  float: left;
  width: 264px;
  height: 330px;
  background: #fff;
  font-size: 26px;
  margin: 10px;
  border-radius: 16px;
}
.title-wrap {
  height: 42px;
  padding: 10px;
  font-size: 16px;
  color: #000;
}
.title {
  font-weight: bold;
  width: 100%;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  cursor: pointer;
  overflow: hidden;
  box-sizing: border-box;
}
.img-wrap {
  position: relative;
  width: 100%;
  height: 176px;
  cursor: pointer;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex: 1 1 0%;
  overflow: hidden;
}
.img-wrap img {
  width: 100%;
  object-fit: cover;
}

.image-note {
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  color: rgb(255, 255, 255);
  line-height: 1.8;
  font-size: 14px;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  z-index: 5;
  letter-spacing: 0.2px;
  background: rgba(0, 0, 0, 0.5);
  padding: 0px 16px;
  overflow: hidden;
}

.bottom {
  width: 100%;
  height: 90px;
  bottom: 0px;
}
.tag-box {
  height: 30px;
  display: flex;
  align-items: flex-end;
}

.tag-box .tag-item {
  color: rgb(61, 75, 249);
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 3px 4px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(235, 235, 235);
  border-image: initial;
  border-radius: 20px;
  overflow: hidden;
  margin: 0px 4px;
  flex: inherit;
}
.info {
  position: relative;
  height: 20px;
  font-size: 12px;
  color: rgb(0, 0, 0);
  line-height: 20px;
  margin-top: 2px;
  padding: 5px 16px 0px;
}

.item-view {
  position: absolute;
  bottom: 0px;
  height: 20px;
  right: 16px;
  text-align: right;
  text-indent: 20px;
  line-height: 20px;
  min-width: 36px;
  max-width: 60px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.url {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 0px 16px;
}
.host {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  flex: 1 1 0%;
  overflow: hidden;
  vertical-align: middle;
}
.host img {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 6px;
}

.card-menu {
  opacity: 1;
  display: flex;
}

.card-menu-ico {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  width: 22px;
  height: 100%;
  margin-left: 6px;
  cursor: pointer;
  fill: rgb(0, 0, 0);
}

/* 滚动 */
.scroll {
  display: none;
  height: 100%;
  width: 10px;
  position: absolute;
  right: 0;
}

.bar {
  width: 100%;
  height: 0;
  background: #ddd;
  border-radius: 10px;
  position: absolute;
  top: 0;
}
.content {
  position: absolute;
}

.none-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

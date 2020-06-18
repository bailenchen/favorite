<template>
  <div id="collect-bar" class="collect">
    <div class="top">
      <div class="my-collect"><i class="iconfont icon-xin"></i>我的</div>
      <div class="my-collect"><i class="iconfont icon-faxian"></i>发现</div>
      <div class="my-collect">
        <i class="iconfont icon-shuqian-copy"></i>标签
      </div>
    </div>
    <div class="center">
      <div class="my-collect">
        <i class="iconfont icon-wenjianjia2"></i>我的收藏夹
      </div>
      <div class="view-box" ref="collect_view_box">
        <ul class="content" ref="collect_content">
          <li v-for="(item1, index1) in floderTree" :key="index1">
            <div :class="curr === item1.id ? 'active' : ''" class="title">
              <i
                @click="unfold(item1)"
                v-if="item1.children"
                class="iconfont icon-z043"
              ></i>
              <router-link
                :to="{
                  path: '/favorite/' + item1.id,
                  query: { floder: item1.name }
                }"
              >
                {{ item1.name }}
              </router-link>
              <div class="menu">
                <i
                  :data-pid="item1.id"
                  @click="createInput"
                  class="iconfont icon-icon-test"
                ></i>
                <i @click="edit(item1)" class="iconfont icon-bianji-copy"></i>
              </div>
            </div>

            <ul v-show="item1.isShow">
              <li v-for="(item2, index2) in item1.children" :key="index2">
                <div :class="curr === item2.id ? 'active' : ''" class="title">
                  <i
                    @click="unfold(item2)"
                    v-if="item2.children"
                    class="iconfont icon-z043"
                  ></i>
                  <router-link
                    :to="{
                      path: '/favorite/' + item2.id,
                      query: { floder: item2.name }
                    }"
                  >
                    {{ item2.name }}
                  </router-link>
                  <div class="menu">
                    <i
                      @click="createInput"
                      :data-pid="item2.id"
                      class="iconfont icon-icon-test"
                    ></i>
                    <i
                      @click="edit(item2)"
                      class="iconfont icon-bianji-copy"
                    ></i>
                  </div>
                </div>
                <ul v-show="item2.isShow">
                  <li v-for="(item3, index3) in item2.children" :key="index3">
                    <div
                      :class="curr === item3.id ? 'active' : ''"
                      class="title"
                    >
                      <router-link
                        :to="{
                          path: '/favorite/' + item3.id,
                          query: { floder: item3.name }
                        }"
                      >
                        {{ item3.name }}
                      </router-link>
                      <div class="menu">
                        <i
                          @click="edit(item3)"
                          class="iconfont icon-bianji-copy"
                        ></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div class="bar-box" ref="collect_bar_box">
          <div class="bar" ref="collect_bar"></div>
        </div>
      </div>
      <div class="input-wrap add">
        <i class="iconfont icon-icon-test"></i>
        <input
          type="text"
          v-model="collectName"
          @keydown.enter="addFolder"
          placeholder="请输入收藏夹名字"
        />
      </div>
    </div>
    <div class="bottom">
      <div class="my-collect"><i class="iconfont icon-shanchu"></i>回收站</div>
    </div>
    <div ref="input" class="input-wrap">
      <input
        @keydown.enter="addFolder"
        v-model="collectName"
        type="text"
        placeholder="请输入收藏夹名字"
      />
    </div>
  </div>
</template>

<script>
import utils from '@/plugins/utils.js'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      curr: 0,
      floderTree: null,
      collectName: '',
      pid: 0
    }
  },
  created() {
    this.get_Folder()
    this.curr = Number(this.$route.params.id)
  },
  methods: {
    ...mapActions('collect', ['set_editFloder', 'curFloderItem']),
    unfold(item) {
      item.isShow = !item.isShow
      // 滚动
      utils.scroll({
        viewBox: this.$refs.collect_view_box,
        content: this.$refs.collect_content,
        barBox: this.$refs.collect_bar_box,
        bar: this.$refs.collect_bar
      })
    },
    edit(item) {
      console.log(item)
      this.set_editFloder()
      this.curFloderItem({ item, floderTree: this.floderTree })
    },
    createInput(e) {
      this.collectName = ''
      this.pid = e.target.getAttribute('data-pid')
      e.target.parentElement.parentElement.insertAdjacentElement(
        'afterend',
        this.$refs.input
      )
      this.$refs.input.style.display = 'block'
    },
    async addFolder() {
      console.log(this.collectName)
      console.log(this.pid)
      var { data } = await this.$http.post('/folder', {
        data: {
          name: this.collectName,
          pid: this.pid
        }
      })
      if (data.code === 200) {
        this.$router.go()
      }
    },

    async get_Folder() {
      var { data } = await this.$http.get('/folder')
      this.floderTree = this.sonsTree(data.result)
    },
    // 无限极分类
    sonsTree(arr) {
      var temp = []
      var lev = 1
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].pid === '' || arr[i].pid === 0) {
          arr[i].children = forFn(arr, arr[i].id, lev)
          arr[i].isShow = false
          temp.push(arr[i])
        }
      }

      function forFn(arr, id, lev) {
        var children = []
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.pid === id) {
            item.isShow = false

            item.children = forFn(arr, item.id, lev + 1)
            children.push(item)
          }
        }
        children = children.length === 0 ? null : children
        return children
      }
      return temp
    }
  },
  watch: {
    $route(to, from) {
      this.curr = Number(to.params.id)
    },
    floderTree: function(val, oldVal) {
      let _this = this
      this.$nextTick().then(function() {
        // 滚动
        utils.scroll({
          viewBox: _this.$refs.collect_view_box,
          content: _this.$refs.collect_content,
          barBox: _this.$refs.collect_bar_box,
          bar: _this.$refs.collect_bar
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background: #a2df4d;
}
.collect {
  position: relative;
  min-width: 280px;
  display: block;
  max-width: 380px;
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding-right: 0px;
  transition: width 0.3s ease 0s;
  overflow: hidden;
}
.my-collect {
  height: 50px;
  line-height: 50px;
  cursor: pointer;
  padding-left: 30px;
  font-size: 13px;
  text-indent: 30px;
  font-weight: bold;
  i {
    margin-right: 6px;
  }
}

ul {
  list-style: none;
  padding: 0;
}
li {
  padding-left: 14px;
}
.center {
  .my-collect {
    padding-left: 0;
  }
  .content {
    width: 270px;
    margin-top: 0;
    position: absolute;
    a {
      color: #333;
    }
  }
  .title {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #333;
    i {
      margin: 0 6px;
    }
  }
  .title:hover {
    background: #c1e490;
  }
  .title:hover .menu {
    display: block;
  }
  .menu {
    float: right;
    display: none;
  }
}

.input-wrap {
  padding-left: 20px;
  display: none;
}
.input-wrap input {
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid #a2df4d;
  background: transparent;
}
.add {
  display: block;
  input {
    margin-left: 10px;
  }
}

.view-box {
  height: 500px;
  overflow: hidden;
  position: relative;
}
.content {
  position: absolute;
}

.bar-box {
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
.title a {
  padding: 12px;
  padding-left: 0;
}
</style>

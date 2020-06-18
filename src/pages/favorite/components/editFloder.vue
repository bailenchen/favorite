<template>
  <div v-if="curFloderItem" class="edit-collect">
    <div class="title">编辑收藏夹</div>
    <div>
      <input
        class="f-name"
        placeholder="输入收藏夹名称"
        value=""
        v-model="curFloderItem.name"
      />
      <button class="del-collect">删除该收藏夹</button>
      <div class="cate-wrap">
        <ul class="level-1 clearfix">
          <input
            v-model="curFloderItem.pid"
            :value="0"
            type="radio"
            name="cate"
          />顶级分类
          <li v-for="(item1, index1) in floderTree" :key="index1">
            <div v-if="item1.id !== curFloderItem.id">
              <input
                v-model="curFloderItem.pid"
                :value="item1.id"
                :checked="item1.id == curFloderItem.id"
                type="radio"
                name="cate"
              />{{ item1.name }}
              <ul class="level-2 clearfix">
                <li v-for="(item2, index2) in item1.children" :key="index2">
                  <input
                    v-model="curFloderItem.pid"
                    :value="item2.id"
                    type="radio"
                    name="cate"
                  />{{ item2.name }}
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="btn" @click="confirm"><span>确定</span></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('collect', ['curFloderItem', 'floderTree'])
  },
  methods: {
    async confirm() {
      console.log(this.curFloderItem)
      var { data } = await this.$http.put('/folder', {
        data: this.curFloderItem
      })
      console.log(data)
      if (data.code === 200) {
        console.log(this)
        this.$router.go()
      }
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 0;
}
.f-name {
  width: 90%;
  height: 40px;
  border-top-width: initial;
  border-right-width: initial;
  border-left-width: initial;
  border-top-color: initial;
  border-right-color: initial;
  border-left-color: initial;
  color: rgb(0, 0, 0);
  outline: none;
  border-style: none none solid;
  border-image: initial;
  background: transparent;
  border-bottom: 1px solid skyblue;
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
.edit-collect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 1000px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 30px 0px;
  font-size: 18px;
  text-align: left;
  font-weight: 400;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  padding: 26px;
  border-radius: 10px;
}

.cate-wrap {
  height: 500px;
  overflow: auto;
  margin: 16px 0;
}
.cate-wrap .level-2,
.cate-wrap .level-3 {
  margin-left: 30px;
}
.cate-wrap li {
  margin-bottom: 12px;
}
.cate-wrap ul {
  margin: 16px;
}
.cate-wrap .level-3 li {
  float: left;
  margin: 6px;
}
.del-collect {
  height: 40px;
  width: 120px;
  text-align: center;
  line-height: 38px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  background: #f00;
  outline: none;
  border: none;
  transition: all 0.4s ease 0s;
}
.edit-collect .f-name {
  width: 50%;
}
.btn {
  height: 38px;
  width: 100px;
  text-align: center;
  line-height: 38px;
  color: rgb(0, 0, 0);
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(61, 75, 249);
  border-image: initial;
  transition: all 0.4s ease 0s;
}
</style>

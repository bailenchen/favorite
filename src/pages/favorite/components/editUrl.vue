<template>
  <div class="wrap" v-if="currectItem">
    <div class="title"><span>编辑收藏</span></div>
    <div>
      <div class="item"><span>标题</span></div>
      <input
        class="url-title"
        maxlength="255"
        placeholder="输入标题"
        value=""
        v-model="currectItem.title"
        style="border-bottom-color: transparent;"
      />
    </div>
    <div>
      <div class="sc-bMvGRv item"><span>描述</span></div>
      <textarea
        class="url-desc"
        maxlength="512"
        placeholder="输入描述"
        v-model="currectItem.description"
      ></textarea>
    </div>
    <div>
      <div class="item"><span>链接</span></div>
      <div class="input-wrap">
        <input
          maxlength="255"
          placeholder="请输入链接"
          value=""
          style="border-bottom-color: transparent;"
          v-model="currectItem.url"
        />
      </div>
    </div>
    <div>
      <div class="item"><span>缩略图</span></div>
      <div class="thumbnail-box">
        <div class="input-wrap">
          <input
            maxlength="255"
            placeholder="请输入图片地址"
            value=""
            style="border-bottom-color: transparent;"
            v-model="currectItem.img"
          />
        </div>

        <img :src="currectItem.img" />
      </div>
    </div>
    <div>
      <div class="sc-bMvGRv item"><span>标签</span></div>
      <div
        class="sc-bHwgHz tag-wrap"
        id="editCardShortcutKey"
        style="border-bottom-color: transparent;"
      >
        <input
          maxlength="16"
          id="tag_inp"
          placeholder="输入标签，最多可添加 5 个标签"
        />
      </div>
    </div>

    <div @click="confirm" class="btn"><span>确定</span></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('collect', ['currectItem'])
  },
  methods: {
    async confirm() {
      console.log('确定')
      console.log(this.currectItem)

      let { data } = await this.$http.put('/favorite', {
        data: {
          currectItem: this.currectItem
        }
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

.wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 30px 0px;
  max-width: 620px;
  width: 560px;
  padding: 26px;
  background: rgb(255, 255, 255);
  animation: 0.3s ease 0s 1 normal none running eGJdzr;
  border-radius: 10px;
}
.title {
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.item {
  font-size: 13px;
  text-align: left;
  font-weight: bold;
  color: rgb(0, 0, 0);
}

.url-title {
  font-size: 14px;
  text-align: left;
  height: 30px;
  width: 100%;
  border-top-width: initial;
  border-right-width: initial;
  border-left-width: initial;
  border-top-color: initial;
  border-right-color: initial;
  border-left-color: initial;
  margin-top: 8px;
  color: rgb(0, 0, 0);
  margin-bottom: 20px;
  border-style: none none solid;
  border-image: initial;
  outline: none;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: all 0.4s ease 0s;
}

.url-desc {
  box-sizing: border-box;
  height: 90px;
  resize: none;
  width: 100%;
  font-size: 14px;
  line-height: 2;
  color: rgb(0, 0, 0);
  margin-top: 8px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  overflow: hidden auto;
  outline: none;
  background: rgb(255, 255, 255);
}
.input-wrap {
  height: 40px;
  width: 100%;
  margin-top: 8px;
  color: rgb(61, 75, 249);
  display: flex;
  margin-bottom: 20px;
}

.input-wrap input {
  color: rgb(0, 0, 0);
  height: 100%;
  font-size: 14px;
  border-top-width: initial;
  border-right-width: initial;
  border-left-width: initial;
  border-top-color: initial;
  border-right-color: initial;
  border-left-color: initial;
  flex: 1 1 0%;
  border-style: none none solid;
  border-image: initial;
  outline: none;
  background: transparent;
  padding: 0px;
  border-bottom: 1px solid transparent;
  transition: all 0.4s ease 0s;
}
.wrap .thumbnail-box img {
  height: 40px;
  object-fit: cover;
  margin-bottom: 20px;
  margin-left: 20px;
}

.tag-wrap {
  position: relative;
  height: 40px;
  width: 100%;
  margin-top: 8px;
  color: rgb(0, 0, 0);
  display: flex;
  margin-bottom: 50px;
  -webkit-box-align: center;
  align-items: center;
  border-bottom: 1px solid transparent;
  transition: all 0.4s ease 0s;
}
.tag-wrap input {
  color: rgb(0, 0, 0);
  height: 100%;
  text-indent: 4px;
  font-size: 12px;
  flex: 1 1 0%;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
  background: transparent;
  padding: 0px;
}

.btn {
  position: absolute;
  bottom: 26px;
  right: 26px;
  width: 100px;
  height: 38px;
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

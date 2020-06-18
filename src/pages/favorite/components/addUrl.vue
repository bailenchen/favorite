<template>
  <div class="add-url">
    <div class="title">添加链接</div>
    <div class="input-wrap">
      <input
        placeholder="输入链接地址 例：https://withpinbox.com"
        value=""
        v-model="url"
      />
      <div @click="confirm" class="btn">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  methods: {
    async confirm() {
      let fid = Number(this.$route.params.id)
        ? Number(this.$route.params.id)
        : 0

      let { data } = await this.$http.post('/favorite', {
        data: {
          fid,
          url: this.url
        }
      })
      if (data.code === 200) {
        this.$router.go()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-url {
  position: absolute;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 560px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 30px 0px;
  font-size: 18px;
  text-align: left;
  font-weight: 400;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  padding: 26px;
  border-radius: 10px;
  animation: 0.3s ease 0s 1 normal none running eGJdzr;
}
.add-url .title {
  font-size: 18px;
  text-align: left;
  margin-bottom: 20px;
  font-weight: bold;
}
.add-url .input-wrap {
  width: 100%;
  height: 40px;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  margin-top: 20px;
}

input {
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
  border-bottom: 1px solid rgb(61, 75, 249);
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

<template>
  <div class="m-plane" :class="userclass" v-show="visible">
    <div
      class="item"
      v-for="(item, index) in items"
      :key="index"
      @click="aa(index)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mplane',
  props: {
    userclass: {
      type: String,
      default: ''
    },
    visible: {
      default: true
    },
    items: {
      default: function() {
        return [
          {
            icon: 'el-icon-user',
            text: '用户中心'
          },
          {
            icon: 'el-icon-switch-button',
            text: '退出登录'
          }
        ]
      }
    }
  },
  methods: {
    aa(index) {
      this.$emit('a1', index)
    }
  }
}
</script>

<style lang="less" scoped>
.m-plane {
  user-select: none;
  width: 120px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 30px 0px;
  position: absolute;
  top: 35px;
  right: 0;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
  .item {
    width: 80px;
    padding: 9px 20px;
    font-size: 13px;
    text-align: center;
    &:hover {
      background: #f5f5f5;
    }
    i {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
}
</style>

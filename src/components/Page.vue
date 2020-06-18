<template>
  <div class="wrap">
    <div class="page clearfix">
      <ul class="pagelist clearfix">
        <li @click="prevPage" class="pre" :class="{ disabled: curPage == 1 }">
          &lt;
        </li>

        <li
          v-for="(i, index) in showPageBtn"
          :key="index"
          class="jump"
          :class="{ active: i === curPage }"
        >
          <a v-if="i" @click="handleClick(i)">{{ i }}</a>
          <span v-else>···</span>
        </li>
        <li
          @click="nextPage"
          class="next"
          :class="{ disabled: curPage == pages }"
        >
          &gt;
        </li>

        <li>
          <input type="text" v-model="goNum" />
        </li>
        <li><button @click="go" class="jump gobtn">GO</button></li>
        <li>
          <span class="pageNum">第{{ curPage }}页/共{{ pages }}页</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: Number
  },
  data() {
    return {
      curPage: 1, // 当前页
      // total: 100, // 总数据
      limit: 10, // 每页显示10条
      goNum: '' // 跳到多少页
    }
  },

  computed: {
    pages() {
      return Math.ceil(this.total / this.limit)
    },
    showPageBtn() {
      const pageNum = this.pages
      const index = this.curPage
      if (pageNum <= 5) return [...new Array(pageNum)].map((v, i) => i + 1)

      if (index <= 2) return [1, 2, 3, 0, pageNum]
      if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
      if (index === 3) return [1, 2, 3, 4, 0, pageNum]
      if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
      return [1, 0, index - 1, index, index + 1, 0, pageNum]
    }
  },
  methods: {
    nextPage() {
      if (this.curPage === this.pages) return
      this.curPage += 1
      this.$emit('setPage', this.curPage)
    },
    prevPage() {
      if (this.curPage === 1) return
      this.curPage += 1
      this.$emit('setPage', this.curPage)
    },
    handleClick(i) {
      this.curPage = i
      this.$emit('setPage', this.curPage)
    },
    go() {
      if (this.curPage === this.goNum) return
      this.goNum = this.goNum > this.pages ? this.pages : this.goNum
      this.goNum = this.goNum < 1 ? 1 : this.goNum
      this.curPage = Number(this.goNum)
      this.goNum = ''
      this.$emit('setPage', this.curPage)
    }
  },
  watch: {
    $route(to, from) {
      this.curPage = 1
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
}
.page {
  min-width: 800px;
  margin-top: 20px;
  height: 32px;
  line-height: 32px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  ul {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  li {
    float: left;
    list-style: none;
    margin: 0 6px;
  }
}
.pre,
.next {
  width: 40px;
  height: 20px;
  line-height: 20px;
  padding: 4px 6px;
  text-align: center;
  font-size: 20px;
  border-radius: 6px;
  background: rgba(204, 204, 204, 0.3);
  cursor: pointer;
}
a {
  display: block;
  width: 40px;
  height: 20px;
  padding: 4px 6px;
  line-height: 20px;
  text-align: center;
  color: #333;
  border-radius: 6px;
  background: rgba(204, 204, 204, 0.3);
  cursor: pointer;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}
.active {
  a {
    background: #7bad37;
    color: #fff;
  }
}

input {
  width: 60px;
  height: 30px;
  font-size: 13px;
  border: 1px solid #ccc;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  text-align: center;
}
button {
  display: inline-block;
  width: 40px;
  height: 30px;
  padding: 6px 6px;
  text-align: center;
  outline: none;
  border: none;
  cursor: pointer;
  margin-right: 12px;
  border-radius: 6px;
}
.disabled {
  color: rgba(153, 153, 153, 1);
}
</style>

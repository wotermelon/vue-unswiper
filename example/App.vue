<template>
  <div id="app">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.id"
        @click="viewDetail(item, index)">
        {{ item.id }} | index: {{index}}
        <div class="img-wrap">
          <div class="img-preview" :style="{ backgroundImage: `url(${item.poster})`}"></div>
        </div>
      </li>
    </ul>

    <pop-layer ref="pop" :data="list" :current="current"></pop-layer>
  </div>
</template>

<script>
import axios from 'axios'
import PopLayer from './pop-layer'

export default {
  data () {
    return {
      list: [],
      offset: 0,
      current: 0
    }
  },
  created () {
    this.clientHeight = document.body.clientHeight
    this.getData()
  },
  mounted () {
    // window.onscroll = () => {
    //   if (this.loadingData) return

    //   if (window.scrollY + this.clientHeight >= document.getElementById('app').scrollHeight - 100) {
    //     this.getData()
    //   }
    // }
  },
  methods: {
    getData () {
      this.loadingData = true
      let limit = 12
      this.offset = this.offset + 1

      axios.get('http://api.watchnow.n0909.com/yoyo/whatsapp', {
        params:{
          limit,
          offset: this.offset * 50
        }
      }).then((res) => {
        this.list = this.list.concat(res.data.data)
        this.loadingData = false
      })
    },
    viewDetail (item, index) {
      window.history.pushState({}, '', '')
      this.$refs.pop.show(index)
    }
  },
  components: {
    PopLayer
  }
}
</script>

<style lang="less">
  html, body {
    font-size: 9.25925926vw;
    height: 100vh;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  // #app {
  //   width: 100%;
  //   height: 500px;
  // }

  ul {
    li {
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 6px;
        background: #ccc;
      }
    }
  }

  .img-wrap {
    .img-preview {
      width: 100%;
      height: 5.8rem;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

</style>

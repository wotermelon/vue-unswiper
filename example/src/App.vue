<template>
  <div id="app">
    <!-- <ul>
      <li v-for="item in list" :key="item.id">
        <div class="img-wrap" @click="viewDetail">
          <div class="img-preview" :style="{ backgroundImage: `url(${item.poster})`}"></div>
        </div>
      </li>
    </ul>

    <div class="pop-wrap" v-show="popShow">
      <unswiper :data="list">
        <template slot-scope="slotProps">
          <div class="slider-inner">
            <div class="img-cov" :style="{ backgroundImage: `url(${slotProps.data.poster})`}">
            </div>
          </div>
        </template>
      </unswiper>
    </div> -->
  </div>
</template>

<script>
import Unswiper from '../../src/index'
import axios from 'axios'

export default {
  data () {
    return {
      list: [],
      offset: 0,
      popShow: false
    }
  },
  created () {
    // this.clientHeight = document.body.clientHeight
    // this.getData()
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
    // getData () {
    //   this.loadingData = true
    //   let limit = 12
    //   this.offset = this.offset + 1

    //   axios.get('http://api.watchnow.n0909.com/yoyo/whatsapp', {
    //     params:{
    //       limit,
    //       offset: this.offset * 50
    //     }
    //   }).then((res) => {
    //     this.list = this.list.concat(res.data.data)
    //     this.loadingData = false
    //   })
    // },
    // viewDetail () {
    //   this.popShow = true
    // }
  },
  components: {
    Unswiper
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
  .slider-inner {
    width: 100%;
    height: 100%;
    display: flex;

    .img-cov {
      flex: 1;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

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
  .pop-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>

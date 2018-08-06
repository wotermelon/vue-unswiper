<template>
  <div class="pop-wrap" v-show="popShow">
    <unswiper ref="unswiper" :data="data">
      <template slot-scope="slotProps">
        <div class="slider-inner">
          <div class="text">{{ slotProps.data.id }}</div>
          <div class="img-cov" :style="{ backgroundImage: `url(${slotProps.data.poster})`}">
          </div>
        </div>
      </template>
    </unswiper>
  </div>
</template>

<script>
import Unswiper from '../src/index.js'

export default {
  props: ['data'],
  data () {
    return {
      popShow: false,
      current: 0
    }
  },
  mounted () {
  },
  methods: {
    show (index) {
      document.body.classList.add('fix-hidden')
      this.popShow = true
      this.current = index
      console.log('index', index, this.data[index].id)
      this.$refs.unswiper.init(index)
      // this.$refs.unswiper.slideTo(index, false)
      window.onpopstate = (e) => {
        this.popShow = false
        document.body.classList.remove('fix-hidden')
      }
    }
  },
  watch: {
    popShow (val) {
      if (val) return

      window.onpopstate = null
    }
  },
  components: {
    Unswiper
  }
}
</script>

<style lang="less">
  .fix-hidden {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  .pop-wrap {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    z-index: 4000;

    .unswiper-container {
      height: inherit !important;
      flex: 1;

      .slider {
        // height: 100%;
        display: flex;
        flex-direction: column;
      }
    }

    .slider-inner {
      position: relative;
      width: 100%;
      // height: 100%;
      flex: 1;
      display: flex;

      .img-cov {
        flex: 1;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }

      .text {
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
</style>


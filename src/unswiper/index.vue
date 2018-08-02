<template>
  <div class="unswiper-container">
    <div class="wrapper" :id="wrapperId"> 
      <div 
        v-for="item in unswiperList"
        :key="item"
        class="slider"
        :style="{ width: clientWidth + 'px' }">
        <slot :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Unswiper from './core'

export default {
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      clientWidth: '',
      wrapperId: '',
      unswiperList: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  created () {
    this.wrapperId = `unswiper-wrapper-${this._uid}`
  },
  mounted () {
    this.unswiper = new Unswiper({
      container: document.querySelector('#' + this.wrapperId)
    })
    this.clientWidth = this.unswiper.getWidth()
  }
}
</script>

<style lang="less" scoped>
  * {
    box-sizing: border-box;
  }

  .unswiper-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    padding: 0;
    margin: 0 auto;
    z-index: 1;
    display: flex;
    border: 1px solid #000;
  }

  .wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex: 1;
    transform: translate3d(0, 0, 0);
    transition-property: transform;
    transition-duration: 0;
  }

  .slider {
    background: #fff;
    flex-shrink: 0;
    border: 2px solid red;
  }
</style>

<style>
.no-transition {
  transition: none !important;
}
</style>

<template>
  <div class="unswiper-container" @touchmove="fn">
    <div class="wrapper" :id="wrapperId">
      <div
        v-for="item in unswiperList"
        :key="item.id"
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
      current: 0,
      listIndex: 0,
      unswiperList: []
    }
  },
  created () {
    this.wrapperId = `unswiper-wrapper-${this._uid}`
  },
  mounted () {
    this.unswiper = new Unswiper({
      container: document.querySelector('#' + this.wrapperId)
    })
    this.unswiper.on('slideEnd', () => {
      this.$emit('slideend')
      // this.
    })
    this.unswiper.on('slideNextEnd', () => {
      this.$emit('slidenextend')
      // console.log('slideNextEnd', this.listIndex)

      if (this.listIndex === 0) {
        this.unswiperList.push(this.data[2])

      } else if (this.listIndex < this.data.length - 2) {
        this.unswiper.slideTo(1, false)

        this.unswiperList.push(this.data[this.listIndex + 2])
        this.unswiperList.shift()
        // this.current  = 1
      } else if (this.listIndex === this.data.length - 2) {
        this.unswiper.slideTo(1, false)
        this.unswiperList.shift()
        // this.current = 1
      } else {
        alert(this.listIndex + '|' + this.data.length)
      }

      this.listIndex = this.listIndex + 1
    })

    this.unswiper.on('slidePrevEnd', () => {
      this.$emit('slideprevend')
      // console.log('slidePrevEnd')

      if (this.listIndex === this.data.length - 1) {
        this.unswiper.slideTo(1, false)
        this.unswiperList.unshift(this.data[this.data.length - 3])

      } else if (this.listIndex >= 2) {
        this.unswiper.slideTo(1, false)

        this.unswiperList.unshift(this.data[this.listIndex - 2])
        this.unswiperList.pop()
        // this.listIndex = this.listIndex - 1
        this.current  = 1
      } else if (this.listIndex === 1) {
        this.unswiperList.pop()
        // this.current = 0
      }

      this.listIndex = this.listIndex - 1
    })
    this.clientWidth = this.unswiper.getWidth()
  },
  methods: {
    fn (e) {
      e.preventDefault()
    },
    init (index) {
      console.log(index)
      this.listIndex = index

      if (index === 0) {
        this.unswiperList = [
          this.data[index],
          this.data[index + 1]
        ]
        this.current = 0
      } else if (index === this.data.length - 1) {
        this.unswiperList = [
          this.data[index - 1],
          this.data[index]
        ]
        this.current = 1
      } else {
        this.unswiperList = [
          this.data[index - 1],
          this.data[index],
          this.data[index + 1]
        ]
        this.current = 1
      }
      this.$nextTick(() => {
        this.unswiper.slideTo(this.current, false)
      })
    }
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
    z-index: 10;
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

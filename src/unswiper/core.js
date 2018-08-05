const DEFAULT_CONFIG = {
  container: null,
  duration: 300,
  threshold: 100
}

class Unswiper {
  constructor (options) {
    this.options = Object.assign({}, DEFAULT_CONFIG, options)

    this.containerEl = this.options.container

    this.width = document.body.clientWidth
    this.heigh = this.containerEl.offsetHeight

    this.pos = {
      startX: 0,
      moveX: 0,
    }

    this.offset = 0
    this.activeIndex = 0
    this.needSlide = false
    this.direction = '' // next, prev
    this.isAnimating = false

    this.slideEvents = {
      slideStart: [],
      slideEnd: [],
      slideNextEnd: [],
      slidePrevEnd: []
    }

    this.dm = {
      prev: 'slidePrevEnd',
      next: 'slideNextEnd'
    }
    let self = this
    this.onTouchStartBind = this.onTouchStart.bind(self)
    this.onTouchMoveBind = this.onTouchMove.bind(self)
    this.onTouchEndBind = this.onTouchEnd.bind(self)


    this.init()
    this.bindEvent()
  }
  /**
   * 初始化
   */
  init () {

  }
  /**
   * 绑定手势
   */
  bindEvent () {
    this.containerEl.addEventListener('touchstart', this.onTouchStartBind, false)

    this.containerEl.addEventListener('transitionend', () => {
      console.log('transitionend')
      // this.isAnimating = false
      setTimeout(() => {
        this.isAnimating = false
      }, 50);

      if (this.needSlide) {
        this.emit(this.dm[this.direction])
      }
    }, false)
  }
  onTouchStart (e) {
    if (!this.isAnimating) {
      this.containerEl.addEventListener('touchmove', this.onTouchMoveBind, false)
      this.containerEl.addEventListener('touchend', this.onTouchEndBind, false)

      this.pos.startX = e.touches[0].pageX
      this.pos.startY = e.touches[0].pageY

      this.containerEl.classList.add('no-transition')
    }
  }
  onTouchMove (e) {
    if (!this.isAnimating) {
      this.pos.moveX = e.touches[0].pageX

      let distance = (this.pos.moveX - this.pos.startX)

      this.setStyle(this.containerEl, 'transform', `translate3d(${+ (distance - this.offset)}px, 0, 0)`)
    }
  }
  onTouchEnd (e) {
    let distance = this.pos.moveX - this.pos.startX
    this.destroy()

    if (distance && !this.isAnimating) {
      // 向右滑动，上一张
      if (distance > this.options.threshold) {
        if (this.activeIndex > 0) {
          this.activeIndex = this.activeIndex - 1
          this.needSlide = true
        } else {
          this.needSlide = false
        }
        this.direction = 'prev'
      } else if (-distance > this.options.threshold) {
        // 向左滑动，下一张
        let num = this.containerEl.children.length

        if (this.activeIndex < num - 1) {
          this.activeIndex = this.activeIndex + 1
          this.needSlide = true

        } else {
          this.needSlide = false
        }

        this.direction = 'next'
      } else {
        this.needSlide = false
      }

      this.slideTo(this.activeIndex)
    }
  }
  slideTo (index, animate = true) {
    this.offset = index * this.width
    this.activeIndex = index

    if (animate) {
      this.isAnimating = true
      this.containerEl.classList.remove('no-transition')
      this.setStyle(this.containerEl, 'transition-duration', this.options.duration + 'ms')

    } else {
      this.containerEl.classList.add('no-transition')
    }

    this.setStyle(this.containerEl, 'transform', `translate3d(-${this.offset}px, 0, 0)`)
  }
  setStyle (el, key, style) {
    el.style[`-webkit-${key}`] = style
    el.style[key] = style
  }
  getWidth () {
    return this.width
  }
  destroy () {
    // this.containerEl.removeEventListener('touchstart')
    this.containerEl.removeEventListener('touchmove', this.onTouchMoveBind)
    this.containerEl.removeEventListener('touchend', this.onTouchEndBind)
  }
  on (eventName, cb) {
    if (!this.slideEvents[eventName]) {
      return
    }

    this.slideEvents[eventName].push(cb)
  }
  emit (eventName) {
    this.slideEvents[eventName].forEach(fn => fn())
  }
}

export default Unswiper

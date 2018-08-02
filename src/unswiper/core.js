const DEFAULT_CONFIG = {
  container: null,
  duration: 300,
  threshold: 150
}

class Unswiper {
  constructor (options) { 
    this.options = Object.assign({}, DEFAULT_CONFIG, options)

    this.containerEl = this.options.container
    console.log(this.containerEl)
    this.width = this.containerEl.offsetWidth
    this.heigh = this.containerEl.offsetHeight

    this.pos = {
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      endX: 0,
      endY: 0
    }

    this.offset = 0
    this.activeIndex = 0
    this.needSlide = false

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
    this.containerEl.addEventListener('touchstart', this.onTouchStart.bind(this), false)
    this.containerEl.addEventListener('touchmove', this.onTouchMove.bind(this), false)
    this.containerEl.addEventListener('touchend', this.onTouchEnd.bind(this), false)

    this.containerEl.addEventListener('transitionend', () => { 
      console.log('end')
    }, false)
  }
  onTouchStart (e) {
    console.log(e)
    this.pos.startX = e.changedTouches[0].pageX
    this.pos.startY = e.changedTouches[0].pageY
    
    this.containerEl.classList.add('no-transition')
  }
  onTouchMove (e) {
    this.pos.moveX = e.changedTouches[0].pageX
    this.pos.moveY = e.changedTouches[0].pageY

    let distance = (this.pos.moveX - this.pos.startX) / 2

    this.setStyle(this.containerEl, 'transform', `translate3d(${+ (distance - this.offset)}px, 0, 0)`)
    
    e.preventDefault()
  }
  onTouchEnd (e) {
    this.pos.endX = e.changedTouches[0].pageX
    this.pos.endy = e.changedTouches[0].pageY

    let distance = this.pos.endX - this.pos.startX

    // 向右滑动，上一张
    if (distance > this.options.threshold) { 
      this.activeIndex = this.activeIndex === 0 ? 0 : --this.activeIndex

      console.log('上', this.activeIndex)
      console.log(distance, this.options.threshold)
      this.needSlide = true
    } else if (-distance > this.options.threshold) {
      // 向左滑动，下一张
      let num = this.containerEl.children.length
      this.activeIndex = this.activeIndex < num - 1 ? ++this.activeIndex : this.activeIndex

      console.log('下', this.activeIndex)
      console.log(-distance, this.options.threshold)

      this.needSlide = true
    }

    this.slideTo(this.activeIndex)

    e.preventDefault()
  }
  slideTo (index, animate = true) {
    this.offset = index * this.width

    if (animate) {
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
    this.containerEl.removeEventListener('touchstart')
    this.containerEl.removeEventListener('touchmove')
    this.containerEl.removeEventListener('touchend')
  }
}

export default Unswiper

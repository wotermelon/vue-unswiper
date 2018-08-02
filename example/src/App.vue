<template>
  <div id="app">
    <unswiper>
      <template slot-scope="slotProps">
        <div class="slider-inner">
          {{ slotProps.data }}
        </div>
      </template>
    </unswiper>
  </div>
</template>

<script>
import Unswiper from '../../src/index'

export default {
  data () {
    return {}
  },
  components: {
    Unswiper
  }
}
</script>

<style>
  #app {
    width: 100%;
    height: 500px;
  }
  .slider-inner {
    font-size: 40px;
    text-align: center;
  }
</style>

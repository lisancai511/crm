import Vue from 'vue'

const bus = new Vue()

Object.defineProperty(Vue.prototype, '$bus', {
  get (): any {
    return bus
  },
  set (): void {
  }
})

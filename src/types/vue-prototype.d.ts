import Vue from 'vue'
import tVue from 'vue/types'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: tVue;
  }
}

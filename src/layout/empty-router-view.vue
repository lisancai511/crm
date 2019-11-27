<!--Created by LiuLei on 2019/10/31-->
<template>
  <!--  <component :is="$route.meta.keepAlive ? 'keep-alive' : 'router-view'">     &lt;!&ndash;使用keep-alive会将页面缓存&ndash;&gt;-->
  <!--    <router-view v-if="$route.meta.keepAlive"></router-view>-->
  <!--  </component>-->
  <!--  <router-view v-if="!$route.meta.keepAlive"></router-view>-->
  <div style="height: 100%">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'EmptyRouterView'
})
export default class EmptyRouterView extends Vue {
}
</script>

<style lang="scss" scoped>

</style>

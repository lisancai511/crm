<!--Created by LiuLei on 2019/9/3-->
<template>
    <div class="app-main">
        <!--<router-view/>-->
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
  name: 'AppMain'
})
export default class SideBar extends Vue {
}
</script>

<style lang="scss" scoped>
    .app-main {
        background-color: #EEF3F7;
        padding: 20px;
    }
</style>

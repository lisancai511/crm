<template>
    <div class="dd-layout">
        <nav-bar class="header"/>
        <side-bar/>
        <div class="dd-main__wrap">
            <div class="dd-main">
                <bread-crumb/>
                <app-main/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from './components/Navbar/index.vue'
import SideBar from './components/Sidebar/index.vue'
import BreadCrumb from './components/Breadcrumb.vue'
import AppMain from './components/AppMain.vue'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    BreadCrumb,
    SideBar,
    NavBar
  }
})
export default class Layout extends Vue {
}
</script>

<style lang="scss" scoped>
    .dd-layout {
        height: 100%;
        background-color: #EEF3F7;

        .header {
        }

        .dd-main {
            height: 100%;
            overflow: auto;

            &__wrap {
                position: absolute;
                width: 100%;
                top: $dd--nav-bar-height;
                bottom: 0;
                padding-left: $dd--side-bar-width;
            }
        }
    }
</style>

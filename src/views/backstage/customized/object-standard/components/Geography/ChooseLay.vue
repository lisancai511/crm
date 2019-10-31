<template>
  <div class="title">
     <h3 style="margin:10px 0 25px">
        请选择页面样式布局
     </h3>
     <div>
        <div @click="chooseLay(1)" class="lay" style="margin-left:0px">
          <img v-if="lay1" src="~@/assets/images/lay1.png" alt="">
          <img v-else src="~@/assets/images/lay1-active.png" alt="">
        </div>
        <div @click="chooseLay(2)" class="lay">
          <img v-if="lay2" src="~@/assets/images/lay2.png" alt="">
          <img v-else src="~@/assets/images/lay2-active.png" alt="">
        </div>
        <div @click="chooseLay(3)" class="lay">
          <img v-if="lay3" src="~@/assets/images/lay3.png" alt="">
          <img v-else src="~@/assets/images/lay3-active.png" alt="">
        </div>
     </div>
     <div>
       <el-button @click="nextStep" class="m-t-30" type="primary">下一步</el-button>
     </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'NewLay'
})
export default class NewLay extends Vue {
   @Prop({ required: true, type: Object }) readonly data!:any
   private lay1:any = 0
   private lay2:any = 1
   private lay3:any = 1
   created () {
     console.log(this.data)
   }
   chooseLay (num:any) {
     if (num === 1) {
       this.lay1 = 0
       this.lay2 = this.lay3 = 1
     } else if (num === 2) {
       this.lay2 = 0
       this.lay3 = this.lay1 = 1
     } else {
       this.lay2 = this.lay1 = 1
       this.lay3 = 0
     }
   }
   nextStep () {
     console.log(this.data)
   }
}
</script>
<style lang="scss" scoped>
  .lay {
     float: left;
     margin: 20px 40px;
     cursor: pointer;
  }
  .title {
    display: flex;
    flex-direction: column;
  }
</style>

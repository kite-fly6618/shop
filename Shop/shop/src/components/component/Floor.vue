<template>
  <div class="container">
    <div class="floor">
      <div class="floor-title">
        {{floorTitle}}
      </div>
      <!-- 不规则部分 -->
      <div class="floor-anomaly">
        <div class="floor-one">
          <img :src="floorData0.image" width="100%"/>
        </div>
        <div>
          <div  class="floor-two">
            <img :src="floorData1.image" width="100%"/>
          </div>
          <div>
            <img :src="floorData2.image" width="100%"/>
          </div>
        </div>
      </div>
      <!-- 规则部分 -->
      <div class="floor-rule">
        <div v-for="(item ,index) in floorData.slice(3)" :key="index">
          <img :src="item.image" width="100%"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['floorData', 'floorTitle'],
  data() {
    return {
      floorData0: {},
      floorData1: {},
      floorData2: {}
    }
  },
  created() {
    // console.log(111);
    // console.log(this.floorTitle);
  },
  watch:{
    floorData:function(val){
                // console.log(this.floorData)
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
            }
  }
}
</script>

<style>
  .floor-title{
    /* margin-top: 5px; */
    padding-top: 3px;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid rgb(78, 69, 69);
    background-color: #ddd;
  }
  .floor-anomaly {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid rgb(151, 134, 134);
  }
  .floor-anomaly div {
    box-sizing: border-box;
    
  }
  .floor-one{
    border-right: 1px solid rgb(151, 134, 134);
  }
  .floor-two{
    border-bottom: 1px solid rgb(151, 134, 134);
  }
  .floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
    background-color: #fff;
  }
  .floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:50vw;
    border-bottom:1px solid rgb(151, 134, 134);
  }
  .floor-rule div:nth-child(odd){
    border-right: 1px solid rgb(151, 134, 134);
  }
</style>
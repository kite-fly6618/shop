<template>
  <div class="container">
    <!-- search-bar area -->
    <div class="search-bar">
      <van-row>
        <van-col span="3" class="location">
          <img :src="locationImg" alt="" class="locationIcon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini" class="searchIcon">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.image" alt="" width="100%" height="180">
        </van-swipe-item>
      </van-swipe>     
    </div>
    <!-- type-bar -->
    <div class="type-bar">
      <div  v-for="(cate,index) in category" :key="index" class="cateItem">
        <img v-lazy="cate.image" class="cateImage" />
        <span class="cateImageDesc">{{cate.mallCategoryName}}</span> 
      </div>
    </div>
    <!--AD banner area-->
    <div class="ad-banner">
      <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <!--swiper-->
        <Swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%" />
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </Swiper>
      </div>
    </div>
    <!--floor one area-->
    <floor-area :floorData="floor1" :floorTitle="floorName.floor1"></floor-area>
    <floor-area :floorData="floor2" :floorTitle="floorName.floor2"></floor-area>
    <floor-area :floorData="floor3" :floorTitle="floorName.floor3"></floor-area>

    <!--Hot Area-->
    <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
            <van-list>
                <van-row gutter="20">
                    <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                        <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                    </van-col>
                </van-row>
            </van-list>
        </div>
    </div>
  </div>
</template>
 
<script>
import 'swiper/swiper-bundle.css'
import {Swiper , SwiperSlide} from 'vue-awesome-swiper'
import FloorArea from '@/components/component/Floor'
import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfo'
import url from '@/serviceAPI.config.js'
export default {
  components: {
    Swiper,
    SwiperSlide,
    FloorArea,
    goodsInfo
  },
  data() {
    return {
      msg: "ShoppingMall",
      locationImg: require('../../assets/image/location.png'),
      bannerPicArray:[],
      category: [],
      adBanner:'',
      recommendGoods:[],
      swiperOption: {
        slidesPerView: 3
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods:[] //热卖商品
    }
  },
  filters:{
    moneyFilter(money){
        return toMoney(money)
    }  
  },
  created(){
    this.$http({
        url: url.getShoppingMallInfo,
        method: 'get',
    })
    .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.category = response.data.data.category // 分类图标
          this.adBanner = response.data.data.advertesPicture // 广告图
          this.bannerPicArray = response.data.data.slides // 轮播图
          this.recommendGoods = response.data.data.recommend  //推荐商品
          this.floor1 = response.data.data.floor1              //楼层1数据
          this.floor2 = response.data.data.floor2  
          this.floor3 = response.data.data.floor3  
          this.floorName = response.data.data.floorName
          this.hotGoods = response.data.data.hotGoods           //热卖商品
        }
    })
    .catch((error) => {     
    })
  }
}
</script>

<style lang="less" scoped>
  .search-bar {
    height: 38px;
    background-color: #e5017d;
    line-height: 38px;
  }
  .search-input{
    width: 100%;
    height: 20px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid #fff;
    background-color: #e5017d;
    color: #fff;
  }
  .location {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
  }
  .locationIcon{
    width: 60%;
    color: white;
  }
  .searchIcon {
    margin-left: 18px;
    width: 38px;
  }
  .swiper-area {
    width: 100%;
  }
  .type-bar{
      background-color: #fff;
      margin:0  5px 5px;
      border-radius: 5px;
      font-size:14px;
      display: flex;
      flex-direction:row;
      flex-wrap:nowrap;
      justify-content: space-around;
  }
  .cateItem {
    display: flex;
    flex-direction: column;
  }
  .cateImage {
    width: 65px;
    height: 65px;
  }
  .type-bar div{
    padding: 5px;
    font-size: 12px;
    text-align: center;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: 4px;
  }
  .recommend-title{
    border-bottom:1px solid #eee;
    font-size:16px;
    padding:3px;
    color:#e5017d;
    margin-left: 5px;
  }
  .recommend-body{
       border-bottom: 1px solid #eee;
   }

  .recommend-item{
    width:100%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
    margin: 0 auto;
  }
  .hot-area{
    text-align: center;
    font-size:16px;
    height: 30px;
    line-height:30px;
    background-color: #ddd;
  }
.hot-goods{
    height: 2400px;
    overflow: hidden;
    background-color: #fff;

}

</style>
<template>
    <div>
        <div class="navbar-div">
             <van-nav-bar   title="类别列表" /> 
        </div>
        <div>
          <van-row>
              <van-col span="6">
                  <div id="leftNav">
                    <ul>
                        <li @click="clickcategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item,index) in category" :key="index">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>
                </div>
              </van-col>
              <van-col span="18">
                  <div class="tabCategorySub">
                        <van-tabs v-model="active"  @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                @load="onLoad"
                                >
                                <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goGoodsInfo(item.ID)">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" width="100%" alt="" :onerror="errorImg">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="price">￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
              </van-col>
          </van-row>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {toMoney} from '@/filter/moneyFilter.js'
import {Toast} from 'vant'
    export default {
      data() {
          return {
              category:[], // 大类类别
              categoryIndex:0,
              categorySub: [], // 小类类别
              active: 0,
              loading: false,
              finished: false, // 上拉加载是否有数据
              isRefresh: false, // 下拉刷新
              page: 1, // 商品列表的页数
              goodList: [], // 商品列表信息
              categorySubId: '', // 商品子类ID
              errorImg:'this.src="' + require('@/assets/image/errorimg.png') + '"'   ,//错误图片显示路径
          }
      },
      created() {
       this.getCategory()
      },
      filters:{
            moneyFilter(money){
                return toMoney(money)
            }  
        },
      mounted(){
          let winHeight = document.documentElement.clientHeight
          document.getElementById("leftNav").style.height= winHeight-46-50 +'px'
          document.getElementById('list-div').style.height=winHeight-90-50 +'px'
      },
      methods: {
        getCategory() {
          axios({
              url:url.getCategoryList,
              method:'get',
          })
          .then(response=>{
              console.log(response)
              if(response.data.code == 200 && response.data.message ){
                  this.category=response.data.message
                  this.getCategorySubListbyCategoryId(this.category[0].ID)
              }else{
                  Toast('服务器错误，数据取得失败')
              }

          })
          .catch(error=>{
              console.log(error)
          }) 
       },
       clickcategory(index,categoryId) {
           this.categoryIndex = index,
           this.page = 1
           this.finished = false
           this.goodList = []
           this.getCategorySubListbyCategoryId(categoryId);
       },
       // 根据大类id读取小类类别列表
       getCategorySubListbyCategoryId(categoryId) {
           axios({
               url: url.getCategorySubList,
               method: 'post',
               data: {categoryId: categoryId}
           })
           .then(response=> {
            //    console.log(response);
               if(response.data.code == 200 && response.data.message) {
                   this.categorySub = response.data.message
                   this.active = 0
                   this.categorySubId = this.categorySub[0].ID
                   this.onLoad()
               }
           })
           .catch(error=> {
               console.log(error);
           })
       },
       onLoad(){
            setTimeout(()=>{
                this.categorySubId = this.categorySubId?this.categorySubId:this.categorySub[0].ID
                this.getGoodList()
            },1000)
        },
       // 下拉刷新方法
       onRefresh() {
           setTimeout(() => {
               this.isRefresh = false
               this.finished = false
               this.goodList = []
               this.page = 1
               this.onLoad()
           },500)
       },
       getGoodList() {
            axios({
                url: url.getGoodsListByCategorySubID,
                method: 'post',
                data: {
                    categorySubId: this.categorySubId,
                    page: this.page
                }
            })
            .then(response => {
                console.log(response);
                if (response.data.code == 200 && response.data.message.length) {
                    this.page++
                    this.goodList = this.goodList.concat(response.data.message)
                } else {
                    this.finished = true //数据已经没有了
                }
                this.loading = false
            })
            .catch(error=> {
                console.log(error);
            }) 
       },
       onClickCategorySub(index,title) {
           this.categorySubId = this.categorySub[index].ID
           console.log('categorySubID：'+this.categorySubId);
           this.goodList = []
           this.finished = false
           this.page = 1
           this.onLoad()
       },
       // 跳转到商品详细页
       goGoodsInfo(id){
            this.$router.push({name:'Goods',params:{goodsId:id}})
        }
      }
    }
</script>

<style scoped>
#leftNav {
    background-color: rgb(206, 228, 226);
}
#leftNav ul li {
    line-height: 32px;
    border-bottom:1px solid #c8cfda;
    padding:3px;
    font-size:15px;
    text-align: center;
}
.categoryActive{
    background-color: rgb(243, 235, 235);
}


.list-item{
    display: flex;
    flex-direction: row;
    font-size:14px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
}
#list-div{
    overflow: scroll;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
.price {
    padding-top: 10px;
}
</style>
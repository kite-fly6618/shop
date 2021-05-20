<template>
    <div>
        <div>
            <van-nav-bar  title="个人中心" />
        </div>
        <div class="top">
           <img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9104d63815e45809c8d8b322e9aa758~tplv-k3u1fbpfcp-watermark.image" class="top-img" />
        </div>
        <div class="login">
            <div><van-button type="warning">我要登录</van-button></div>
            <div><van-button type="primary">我要注册</van-button></div>
        </div>
        <div>
            <van-cell-group>
                <van-cell title="会员卡" is-link />
                <van-cell title="地址管理" is-link  />
                <van-cell title="我的订单" is-link  />
                <van-cell title="待发货" is-link  />
                <van-cell title="已发货" is-link  />
                <van-cell title="会员权益" is-link />
                <van-cell title="联系我们" is-link  />
            </van-cell-group>

        </div>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .top-img{
        width:70px;
        height: 70px;
        border-radius: 50px;
    }
    .top{
        height:100px;
        text-align: center;
        padding-top:10px;
        background-color: #EEA2AD;
    }
    .login{
        display: flex;
        flex-direction: row;
        background-color: #fff;
        padding:10px;
    }
    .login div{
        flex:1;
        text-align: center;
    }
</style>
© 2021 GitHub, Inc.
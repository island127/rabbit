<script setup>
import { useBanner } from './composables/useBanner.js'
import { useCategory } from './composables/useCategory.js'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { onBeforeRouteUpdate } from 'vue-router'

// 获取数据
const { categoryData } = useCategory()
// 监听路由参数变化，实时更新数据
// 路由缓存问题产生的原因：路由只有参数变化，会复用组件案例
// watch(
//   () => route.params.id,
//   (newId) => {
//     getCategory()
//   },
//   { immediate: false } // 不需要立即执行，因为 onMounted 已经处理了初始加载
// )

// 目标：路由参数变化的时候 可以把分类数据接口重新发送
// onBeforeRouteUpdate((to) => {
//   console.log('路由变化了')
// 存在问题：使用最新的路由参数请求最新的分类数据
//   getCategory(to.params.id)
// })

// banner
const { bannerList } = useBanner()

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  left: 0;
  top: 0;

  img {
    width: 100%;
    height: 500px;
  }
}

.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
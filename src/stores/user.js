// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore('user', () => {
  const useCart = useCartStore()
  // 1.定义管理用户数据的state
  const userInfo = ref({})
  // 2.定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    // 合并购物车的操作
    mergeCartAPI(useCart.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    useCartStore.updateCartList()
  }
  // 退出时清除用户信息
  const clearUserInfo = () => {
    // 执行清楚购物车的action
    userInfo.value = {}
    useCart.clearCart()
  }
  // 3.以对象的格式 把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
},)
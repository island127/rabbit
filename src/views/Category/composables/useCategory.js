// 封装分类数据业务相关代码
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryAPI } from '@/apis/category.js'
// 获取数据
export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async () => {
    const res = await getCategoryAPI(route.params.id)
    categoryData.value = res.result
  }
  onMounted(() => {
    getCategory()
  })
  // 监听路由参数变化，实时更新数据
  // 路由缓存问题产生的原因：路由只有参数变化，会复用组件案例
  watch(
    () => route.params.id,
    (newId) => {
      getCategory()
    },
    { immediate: false } // 不需要立即执行，因为 onMounted 已经处理了初始加载
  )
  return {
    categoryData
  }
}
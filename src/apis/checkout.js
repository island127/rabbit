import httpInstance from "@/utils/http.js"

export const getCheckInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}
import { Loading } from 'element-ui'
let loading
let loadingCount = 0
const startLoading = () => {
  loading = Loading.service({
    target: '.main-container',
    lock: true,
    text: '加载中……'
  })
}
const endLoading = () => {
  loading.close()
}

export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount += 1
}

export const hideLoading = () => {
  if (loadingCount <= 0) {
    return
  }
  loadingCount -= 1
  if (loadingCount === 0) {
    endLoading()
  }
}


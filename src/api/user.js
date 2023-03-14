import request from '@/utils'
// import store from '@/store' // 这不是组件内store 和 router 并没有注册到VUE对象中，不能直接使用必须先import导入

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'v1_0/user/profile'
    // 发送请求头数据
    // headers: {
    // // 注意：该接口需要授权才能访问
    // //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格,直接用模版字符串在内部解析装token的变量
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

export const following = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

export const unfollowing = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/:${target}`
  })
}

export const Collect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

export const unCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/:${target}`
  })
}

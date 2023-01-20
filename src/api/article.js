import request from '@/utils/index.js'

export const getArticles = params => { // 获取文章列表
  return request({
    method: 'GET',
    url: 'v1_0/articles',
    params // 相当于params:params,我们传进来的参数直接就是一个对象（看接口文档可知该接口参数是几个查询参数，直接用一个对象装）
  })
}

export const getArticleById = articleId => { // 获取文章详情
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

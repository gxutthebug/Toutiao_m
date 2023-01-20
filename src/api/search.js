import request from '@/utils/index'

export const getsuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

export const getresult = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}

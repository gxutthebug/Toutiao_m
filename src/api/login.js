import request from '@/utils'

export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

export const getSmsCode = mobile => {
  console.log(`/app/v1_0/sms/codes/${mobile}`)
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

export const setItem = (key, value) => { // 本地存储就是以键值对的形式存储数据
  if (typeof value === 'object') {
    value = JSON.stringify(value) // 如果传入的值是obj类型，转换成JSON格式的字符串
  }
  window.localStorage.setItem(key, value)
}
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try { // 为什么要用try catch的形式来将JSON字符串转换成对象呢，为什么不能直接用if判断；因为判断JSON格式字符串不好判定，写正则判断太麻烦了
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const removeItem = name => {
  window.localStorage.removeItem(name)
}

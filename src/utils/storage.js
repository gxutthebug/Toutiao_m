export const setItem = (key, value) => { // 本地存储就是以键值对的形式存储数据
  if (typeof value === 'object') { // 注意数组的判定结果也会是'object'
    value = JSON.stringify(value) // 如果传入的值是obj类型，转换成JSON格式的字符串
  }
  window.localStorage.setItem(key, value)
  // 其实只是调用一下 window.localStorage.setItem（）这个方法，把键跟值分别传进去，只不过在传之前处理一下object格式的数据
}

export const getItem = name => { // 读取时是单个读取模式，传键进去 ，返回对应的值给你
  const data = window.localStorage.getItem(name)
  try { // 为什么要用try catch的形式来将JSON字符串转换成对象呢，为什么不能直接用if判断；因为判断JSON格式字符串不好判定，写正则判断太麻烦了
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const removeItem = name => { // 删除某一项数据
  window.localStorage.removeItem(name)
}

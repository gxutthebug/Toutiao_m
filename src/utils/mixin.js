// 定义一个或多个mixin对象导出,每个mixin对象都当成new vm或vc的配置项来写
function aa () {
  console.log('局部混入的钩子函数输出的1')
  console.log(this)
}

export const mixobj1 = {
  beforeCreate: aa
}

export const mixobj2 = {
  beforeCreate () {
    console.log('局部混入的钩子函数输出的2')
    console.log(this)
  }
}

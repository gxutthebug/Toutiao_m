/**
 * PostCSS 配置文件
 * PostCSS 之于 CSS 就相当于 Babel 之于 JS，PostCSS 能借助各种各样的插件处理 CSS，CSS 的编译器,vue脚手架
 * 内部使用了 PostCSS。我们只需要在PostCSS的配置文件中按需配置插件即可(配插件前先导包)
 *
 */

module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生成浏览器 CSS 样式规则前缀
    // VueCLI 内部已经配置了 autoprefixer 插件
    // 所以又配置了一次，所以产生冲突了
    // 'autoprefixer': { // autoprefixer 插件的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75 // vant包内样式按37.5算rem;开发编码样式按实际设计图的1/10算（75）
      },

      // 配置要转换的CSS属性
      // *表示所有
      propList: ['*'],

      // 配置不要转换的样式资源
      // 因为你配置了所有CSS的px单位转换，所以这个github-markdown.css内的所有字体px也要被转换成相对单位
      // 但是对于字体来说，不管是在大屏幕上还是小屏幕上我们希望看到的大小是一样的，所以我们不希望这个字体还要等比缩小（看起来就太小了）
      exclude: 'github-markdown'

    }
  }
}

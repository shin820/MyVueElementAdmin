const steps = [
  {
    element: '.sidebar-container',
    popover: {
      title: '主菜单',
      description: '这是侧边栏功能菜单。',
      position: 'right-center'
    }
  },
  {
    element: '.hamburger-container',
    popover: {
      title: '侧边栏隐藏/显示按钮',
      description: '通过这个按钮，您可以隐藏或者显示侧边栏菜单。',
      position: 'bottom'
    }
  },
  {
    element: '.breadcrumb-container',
    popover: {
      title: '页面导航',
      description: '通过点击页面导航中的标签，您可以返回当前页面的上级页面。',
      position: 'bottom'
    }
  },
  {
    element: '.right-menu',
    popover: {
      title: '子功能菜单',
      description: '通过子功能菜单，您可以进入执行平台或者退出当前监管平台。',
      position: 'left'
    }
  },
  {
    element: '.tags-view-wrapper',
    popover: {
      title: '访问历史',
      description: `该区域保存了您<b>访问过的历史</b>页面，您可以点击这些标签返回您之前访问过的页面。
      <br/>在该区域，您可以通过<b>鼠标右键</b>的菜单关闭部分或全部标签。<br/>如果您的标签页较多，在当前屏幕无法显示全部，
      您可以在该区域通过滚动<b>鼠标滚轮</b>来浏览所有标签页。`,
      position: 'bottom'
    }
  }
]

export default steps

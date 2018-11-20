var data = [
  {
    id: 1,
    label: '湖南湘江新区发展集团',
    type: 1,
    children: [
      {
        id: 1,
        label: '梅溪湖投资（长沙）有限公司',
        type: 2,
        children: [
          {
            id: 1,
            label: '梅溪湖国际新城（二期）路网',
            type: 3,
            children: [
              { id: 1, label: '第一标段', type: 4 },
              { id: 2, label: '第二标段', type: 4 }
            ]
          },
          {
            id: 2,
            type: 3,
            label: '梅溪湖国际新城地下综合管廊'
          }
        ]
      },
      {
        id: 2,
        label: '湖南湘江新区投资集团有限公司',
        type: 2,
        children: [
          {
            id: 3,
            type: 3,
            label: '湘江西岸江滩（银盆岭大桥—靳江河）提质工程'
          },
          {
            id: 4,
            type: 3,
            label: '湘江西岸景观亮化工程（龙王港—猴子石大桥）'
          }
        ]
      },
      {
        id: 3,
        type: 2,
        label: '湖南湘江新区市政建设投资有限公司'
      },
      {
        id: 4,
        type: 2,
        label: '湖南湘新水务投资有限公司'
      },
      {
        id: 5,
        type: 2,
        label: '长沙岳麓山国家大学科技城建设投资有限公司'
      },
      {
        id: 6,
        type: 2,
        label: '湖南华年文化旅游投资有限公司'
      },
      {
        id: 7,
        type: 2,
        label: '湖南梦想置业开发有限公司'
      }
    ]
  }
]

export default {
  getOrganizationUnitTree: config => {
    return {
      result: data
    }
  }
}

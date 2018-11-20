export default {
  getQuantityStats: config => {
    return {
      result: [
        { value: 2, name: '在整改' },
        { value: 3, name: '已完成' },
        { value: 1, name: '逾期未整改' }
      ]
    }
  },
  getCompanyQuantityStats: config => {
    return {
      result: {
        organizations: [
          '梅溪湖投资（长沙）有限公司',
          '湖南湘江新区投资集团有限公司',
          '湖南湘江新区市政建设投资有限公司',
          '湖南湘新水务投资有限公司',
          '长沙岳麓山国家大学科技城建设投资有限公司',
          '湖南华年文化旅游投资有限公司',
          '湖南梦想置业开发有限公司'
        ],
        series: [
          { name: '在整改', data: [1, 2, 3, 2, 1, 4, 2] },
          { name: '已完成', data: [1, 1, 2, 1, 1, 1, 2] },
          { name: '逾期未整改', data: [1, 1, 0, 2, 0, 1, 0] }
        ]
      }
    }
  },
  getProjectQuantityStats: config => {
    return {
      result: {
        organizations: [
          '梅溪湖国际新城（二期）路网',
          '梅溪湖国际新城地下综合管廊',
          '湘江西岸江滩（银盆岭大桥—靳江河）提质工程',
          '湘江西岸景观亮化工程（龙王港—猴子石大桥）',
          '岳麓大道两厢绿化提质改造工程',
          '湘府路快速化改造'
        ],
        series: [
          { name: '在整改', data: [1, 2, 3, 2, 1, 4] },
          { name: '已完成', data: [1, 1, 2, 1, 1, 1] },
          { name: '逾期未整改', data: [1, 1, 0, 2, 0, 1] }
        ]
      }
    }
  },
  getGradeStats: config => {
    return {
      result: [
        { value: 2, name: '轻微' },
        { value: 3, name: '一般' },
        { value: 1, name: '较大' },
        { value: 1, name: '严重' }
      ]
    }
  },
  getProblemClassStats: config => {
    return {
      result: [
        { problemClass: '质量', total: 12, complete: 6, completeRatio: 50, unComplete: 2, expire: 1 },
        { problemClass: '安全', total: 10, complete: 2, completeRatio: 20, unComplete: 3, expire: 2 },
        { problemClass: '环保', total: 3, complete: 1, completeRatio: 33.33, unComplete: 1, expire: 1 },
        { problemClass: '其他', total: 1, complete: 1, completeRatio: 100, unComplete: 0, expire: 0 }
      ]
    }
  },
  getCompanyStats: config => {
    return {
      result: {
        organizations: [
          '梅溪湖投资（长沙）有限公司',
          '湖南湘江新区投资集团有限公司',
          '湖南湘江新区市政建设投资有限公司',
          '湖南湘新水务投资有限公司',
          '长沙岳麓山国家大学科技城建设投资有限公司',
          '湖南华年文化旅游投资有限公司',
          '湖南梦想置业开发有限公司'
        ],
        series: [
          { name: '质量', data: [1, 2, 3, 2, 1, 4, 2] },
          { name: '安全', data: [1, 1, 2, 1, 1, 1, 2] },
          { name: '环保', data: [1, 1, 0, 2, 0, 1, 0] },
          { name: '其他', data: [1, 1, 0, 1, 0, 0, 0] }
        ]
      }
    }
  },
  getCompanyGradeStats: config => {
    return {
      result: {
        organizations: [
          '梅溪湖投资（长沙）有限公司',
          '湖南湘江新区投资集团有限公司',
          '湖南湘江新区市政建设投资有限公司',
          '湖南湘新水务投资有限公司',
          '长沙岳麓山国家大学科技城建设投资有限公司',
          '湖南华年文化旅游投资有限公司',
          '湖南梦想置业开发有限公司'
        ],
        series: [
          { name: '轻微', data: [1, 2, 3, 2, 1, 4, 2] },
          { name: '一般', data: [1, 1, 2, 1, 1, 1, 2] },
          { name: '较大', data: [1, 1, 0, 2, 0, 1, 0] },
          { name: '严重', data: [1, 1, 0, 1, 0, 0, 0] }
        ]
      }
    }
  }
}

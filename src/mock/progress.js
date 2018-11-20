export default {
  getVisualProgressPieChart: config => {
    return {
      result: [
        { name: '正常', value: 23 },
        { name: '滞后', value: 10 },
        { name: '严重滞后', value: 8 },
        { name: '停工', value: 5 }
      ]
    }
  },
  getProgressOverview: config => {
    return {
      result: {
        yearAmount: 1000000000,
        completeAmount: 500000000,
        completeRatio: 50,
        requisitionAmount: 200000000,
        requisitionRatio: 10,
        taskInvestmentAmount: 180000000,
        taskInvestmentRatio: 8
      }
    }
  },
  getCompanyCompleteStats: config => {
    return {
      result: [
        { name: '梅溪湖公司', value: 20000000 },
        { name: '湘新投公司', value: 10000000 },
        { name: '市政公司', value: 30000000 },
        { name: '科技城公司', value: 38000000 },
        { name: '华年公司', value: 110000000 }
      ]
    }
  },
  getCompanyPlanStats: config => {
    return {
      result: [
        { name: '梅溪湖公司', value: 120000000 },
        { name: '湘新投公司', value: 30000000 },
        { name: '市政公司', value: 50000000 },
        { name: '科技城公司', value: 40000000 },
        { name: '华年公司', value: 180000000 }
      ]
    }
  },
  getVisualProgressList: config => {
    return {
      result: [
        { projectName: '梅溪湖国际新城（二期）路网', statusName: '正常' },
        { projectName: '梅溪湖国际新城地下综合管廊', statusName: '停工' },
        {
          projectName: '湘江西岸江滩（银盆岭大桥—靳江河）提质工程',
          statusName: '正常'
        },
        {
          projectName: '湘江西岸景观亮化工程（龙王港—猴子石大桥',
          statusName: '滞后'
        },
        { projectName: '岳麓大道两厢绿化提质改造工程', statusName: '严重滞后' },
        { projectName: '湘府路快速化改造', statusName: '正常' }
      ]
    }
  },
  getVisualProgressStats: config => {
    return {
      result: {
        organizations: [
          '全部',
          '梅溪湖公司',
          '湘新投公司',
          '市政公司',
          '科技城公司',
          '华年公司'
        ],
        series: [
          {
            name: '正常',
            data: [20, 1, 2, 3, 5, 4]
          },
          {
            name: '滞后',
            data: [8, 1, 2, 1, 2, 2]
          },
          {
            name: '严重滞后',
            data: [4, 1, 2, 1, 0, 0]
          },
          {
            name: '停工',
            data: [2, 1, 0, 0, 1, 0]
          }
        ]
      }
    }
  },
  getProgressStats: config => {
    return {
      result: {
        organizations: [
          '全部',
          '梅溪湖公司',
          '湘新投公司',
          '市政公司',
          '科技城公司',
          '华年公司'
        ],
        series: [
          {
            name: '计划项目数',
            yAxisIndex: 0,
            data: [20, 1, 2, 3, 5, 4]
          },
          {
            name: '当年计划投资额',
            yAxisIndex: 1,
            data: [
              1000000000,
              200000000,
              300000000,
              100000000,
              150000000,
              150000000
            ]
          },
          {
            name: '当年完成投资额',
            yAxisIndex: 1,
            data: [
              80000000,
              180000000,
              200000000,
              80000000,
              100000000,
              120000000
            ]
          },
          {
            name: '当年完成比例',
            yAxisIndex: 2,
            data: [80, 90, 60, 80, 60, 70]
          }
        ]
      }
    }
  },
  getCompanyProgressBarChart: config => {
    return {
      result: {
        organizations: [
          '全部',
          '梅溪湖公司',
          '湘新投公司',
          '市政公司',
          '科技城公司',
          '华年公司'
        ],
        series: [
          {
            name: '计划投资额',
            yAxisIndex: 0,
            data: [
              1000000000,
              200000000,
              300000000,
              100000000,
              150000000,
              150000000
            ]
          },
          {
            name: '完成投资额',
            yAxisIndex: 0,
            data: [
              80000000,
              180000000,
              200000000,
              80000000,
              100000000,
              120000000
            ]
          },
          {
            name: '完成比例',
            yAxisIndex: 1,
            data: [80, 90, 60, 80, 60, 70]
          }
        ]
      }
    }
  }
}

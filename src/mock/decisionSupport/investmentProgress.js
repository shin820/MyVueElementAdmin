export default {
  getOverviewInvestmentStats: config => {
    return {
      result: [
        {
          value: 335,
          name: '合同金额'
        },
        {
          value: 310,
          name: '计划金额'
        },
        {
          value: 234,
          name: '完成金额'
        }
      ]
    }
  },
  getMonthlyInvestmentStats: config => {
    return {
      result: {
        months: ['17年7月', '17年8月', '17年9月', '17年10月', '17年11月', '17年12月', '18年1月', '18年2月', '18年3月', '18年4月', '18年5月', '18年6月'],
        series: [
          {
            name: '计划金额',
            type: 'line',
            data: [5000, 5000, 8000, 8000, 8000, 10000, 10000, 10000, 11000, 11000, 11000, 11000]
          },
          {
            name: '完成金额',
            type: 'line',
            data: [1000, 2000, 3000, 3500, 4000, 4500, 5000, 6000, 6800, 7000, 8000, 8800]
          }
        ]
      }
    }
  },
  getCompanyInvestmentStats: config => {
    return {
      result: {
        organizations: ['梅溪湖投资（长沙）有限公司', '湖南湘江新区投资集团有限公司', '湖南湘江新区市政建设投资有限公司', '湖南湘新水务投资有限公司', '长沙岳麓山国家大学科技城建设投资有限公司', '湖南华年文化旅游投资有限公司', '湖南梦想置业开发有限公司'],
        series: [
          {
            name: '合同金额',
            data: [3200, 1100, 1200, 2300, 4500, 1200, 3000]
          },
          {
            name: '计划金额',
            data: [3200, 1000, 1100, 2000, 4100, 1200, 2800]
          },
          {
            name: '完成金额',
            data: [1000, 300, 400, 800, 2300, 1100, 1600]
          }
        ]
      }
    }
  },
  getProjectInvestmentStats: config => {
    return {
      result: {
        organizations: ['梅溪湖国际新城（二期）路网', '梅溪湖国际新城地下综合管廊', '湘江西岸江滩（银盆岭大桥—靳江河）提质工程', '湘江西岸景观亮化工程（龙王港—猴子石大桥）', '岳麓大道两厢绿化提质改造工程', '湘府路快速化改造'],
        series: [
          {
            name: '合同金额',
            data: [3200, 1100, 1200, 2300, 4500, 1200]
          },
          {
            name: '计划金额',
            data: [3200, 1000, 1100, 2000, 4100, 1200]
          },
          {
            name: '完成金额',
            data: [1000, 300, 400, 800, 2300, 1100]
          }
        ]
      }
    }
  },
  getSectionInvestmentStats: config => {
    return {
      result: {
        organizations: ['第一标段', '第二标段', '第三标段', '第四标段', '第五标段', '第六标段'],
        series: [
          {
            name: '合同金额',
            data: [3200, 1100, 1200, 2300, 4500, 1200]
          },
          {
            name: '计划金额',
            data: [3200, 1000, 1100, 2000, 4100, 1200]
          },
          {
            name: '完成金额',
            data: [1000, 300, 400, 800, 2300, 1100]
          }
        ]
      }
    }
  }
}
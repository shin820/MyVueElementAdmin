export default {
  getProjectProgress: config => {
    return {
      result: {
        organizations: [
          '路基',
          '路面',
          '桥梁',
          '涵洞',
          '隧道',
          '路基A',
          '路面A',
          '桥梁A',
          '涵洞A',
          '隧道A',
          '路基B',
          '路面B',
          '桥梁B',
          '涵洞B',
          '隧道B',
          '路基D',
          '路面D',
          '桥梁D',
          '涵洞D',
          '隧道D',
          '路基E',
          '路面E',
          '桥梁E',
          '涵洞E',
          '隧道E',
          '路基F',
          '路面F',
          '桥梁F',
          '涵洞F',
          '隧道F'
        ],
        series: [
          {
            name: '完成百分比',
            data: [20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60]
          },
          {
            name: '合同金额',
            data: [30, 40, 50, 60, 70, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60]
          },
          {
            name: '计量金额',
            data: [10, 30, 20, 45, 55, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60, 20, 30, 40, 50, 60]
          }
        ]
      }
    }
  },
  getSectionProgress: config => {
    return {
      result: {
        organizations: [
          '路基',
          '路面',
          '桥梁',
          '涵洞',
          '隧道'
        ],
        series: [
          {
            name: '完成百分比',
            data: [20, 30, 40, 50, 60]
          },
          {
            name: '合同金额',
            data: [30, 40, 50, 60, 70]
          },
          {
            name: '计量金额',
            data: [10, 30, 20, 45, 55]
          }
        ]
      }
    }
  },
  getProjectStats: config => {
    return {
      result: [
        {
          name: '测试项目1',
          startTime: '2018-01-01',
          completionTime: '2020-12-31',
          investmentAmount: 12000,
          legalPerson: '张三',
          projectTypeName: '市政',
          contractAmount: 180000,
          alterAmount: 20000,
          completeAmount: 10000,
          paymentAmount: 12000
        },
        {
          name: '测试项目2',
          startTime: '2018-01-01',
          completionTime: '2020-12-31',
          investmentAmount: 12000,
          legalPerson: '张三',
          projectTypeName: '市政',
          contractAmount: 180000,
          alterAmount: 20000,
          completeAmount: 10000,
          paymentAmount: 12000
        }
      ]
    }
  }
}

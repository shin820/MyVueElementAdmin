export default {
  getTypeAmounts: config => {
    return {
      result: {
        organizations: [
          '全部',
          '施工合同',
          '监理合同',
          '设计合同',
          '勘察合同',
          '其他'
        ],
        series: [
          {
            name: '项目个数',
            data: [20, 1, 2, 3, 5, 4]
          },
          {
            name: '概算总额',
            data: [800000000, 50000000, 30000000, 400000000, 41000000, 12000000]
          }
        ]
      }
    }
  },
  getStatusAmounts: config => {
    return {
      result: {
        organizations: ['全部', '执行中', '终止'],
        series: [
          {
            name: '项目个数',
            data: [4, 1, 2]
          },
          {
            name: '概算总额',
            data: [800000000, 50000000, 30000000]
          }
        ]
      }
    }
  },
  getProjectStatusAmounts: config => {
    return {
      result: {
        organizations: ['全部', '执行中', '终止'],
        series: [
          {
            name: '项目个数',
            data: [4, 1, 2]
          },
          {
            name: '概算总额',
            data: [800000000, 50000000, 30000000]
          }
        ]
      }
    }
  },
  getAmountStats: config => {
    return {
      result: {
        contractAmount: 150000000,
        paymentAmount: 50000000,
        paymentRatio: 33.33,
        unPayAmount: 100000000,
        UnPayRatio: 66.66,
        measureAmount: 30000000,
        measureRatio: 20
      }
    }
  }
}

export default {
  getProgressStats: config => {
    return {
      result: {
        plan: 70,
        actual: 20,
        status: 1,
        statusName: '正常'
      }
    }
  },
  getInvestmentStats: config => {
    return {
      result: {
        ratio: 60,
        budget: 1700000000,
        actual: 1000000000,
        status: 0,
        remark: '欠付40%'
      }
    }
  },
  getQualityStats: config => {
    return {
      result: {
        ratio: 90,
        total: 7,
        unFix: 5,
        fixed: 4,
        status: 0,
        statusName: '严重'
      }
    }
  }
}

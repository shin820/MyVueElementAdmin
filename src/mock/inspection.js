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
        ids: [1, 2, 3],
        organizations: ['梅溪湖公司', '湘新投公司', '市政公司'],
        series: [
          { name: '在整改', data: [1, 2, 3] },
          { name: '已完成', data: [1, 1, 2] },
          { name: '逾期未整改', data: [1, 1, 0] }
        ]
      }
    }
  },
  getProjectQuantityStats: config => {
    return {
      result: {
        ids: [1, 2, 3],
        organizations: [
          '梅溪湖国际新城（二期）路网',
          '梅溪湖国际新城地下综合管廊',
          '湘江西岸江滩（银盆岭大桥—靳江河）提质工程'
        ],
        series: [
          { name: '在整改', data: [1, 2, 3] },
          { name: '已完成', data: [1, 1, 2] },
          { name: '逾期未整改', data: [1, 1, 0] }
        ]
      }
    }
  },
  getSectionQuantityStats: config => {
    return {
      result: {
        ids: [1, 2, 3],
        organizations: ['第一标段', '第二标段', '第三标段'],
        series: [
          { name: '在整改', data: [1, 2, 3] },
          { name: '已完成', data: [1, 1, 2] },
          { name: '逾期未整改', data: [1, 1, 0] }
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
        {
          problemClass: '质量',
          total: 12,
          complete: 6,
          completeRatio: 50,
          unComplete: 2,
          expire: 1
        },
        {
          problemClass: '安全',
          total: 10,
          complete: 2,
          completeRatio: 20,
          unComplete: 3,
          expire: 2
        },
        {
          problemClass: '环保',
          total: 3,
          complete: 1,
          completeRatio: 33.33,
          unComplete: 1,
          expire: 1
        },
        {
          problemClass: '其他',
          total: 1,
          complete: 1,
          completeRatio: 100,
          unComplete: 0,
          expire: 0
        }
      ]
    }
  },
  getCompanyStats: config => {
    return {
      result: {
        ids: [1, 2, 3],
        organizations: ['梅溪湖公司', '湘新投公司', '市政公司'],
        series: [
          { name: '质量', data: [1, 2, 3] },
          { name: '安全', data: [1, 1, 2] },
          { name: '环保', data: [1, 1, 0] },
          { name: '其他', data: [1, 1, 0] }
        ]
      }
    }
  },
  getCompanyGradeStats: config => {
    return {
      result: {
        ids: [1, 2, 3],
        organizations: ['梅溪湖公司', '湘新投公司', '市政公司'],
        series: [
          { name: '轻微', data: [1, 2, 3] },
          { name: '一般', data: [1, 1, 2] },
          { name: '较大', data: [1, 1, 0] },
          { name: '严重', data: [1, 1, 0] }
        ]
      }
    }
  },
  getProjectGradeStats: config => {
    return {
      result: {
        ids: [1, 2, 3],
        organizations: [
          '梅溪湖国际新城（二期）路网',
          '梅溪湖国际新城地下综合管廊',
          '湘江西岸江滩（银盆岭大桥—靳江河）提质工程'
        ],
        series: [
          { name: '轻微', data: [1, 2, 3] },
          { name: '一般', data: [1, 1, 2] },
          { name: '较大', data: [1, 1, 0] },
          { name: '严重', data: [1, 1, 0] }
        ]
      }
    }
  },
  getSectionGradeStats: config => {
    return {
      result: {
        ids: [1, 2, 3],
        organizations: ['第一标段', '第二标段', '第三标段'],
        series: [
          { name: '轻微', data: [1, 2, 3] },
          { name: '一般', data: [1, 1, 2] },
          { name: '较大', data: [1, 1, 0] },
          { name: '严重', data: [1, 1, 0] }
        ]
      }
    }
  },
  getCompanyStatList: config => {
    return {
      result: [
        {
          id: 1,
          name: '梅溪湖公司',
          completed: 9,
          unCompleted: 1,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 90
        },
        {
          id: 2,
          name: '湘新投公司',
          completed: 3,
          unCompleted: 7,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 30
        },
        {
          id: 3,
          name: '市政公司',
          completed: 5,
          unCompleted: 5,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 50
        }
      ]
    }
  },
  getProjectStatList: config => {
    return {
      result: [
        {
          id: 1,
          name: '梅溪湖国际新城（二期）路网',
          completed: 9,
          unCompleted: 1,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 90
        },
        {
          id: 2,
          name: '梅溪湖国际新城地下综合管廊',
          completed: 3,
          unCompleted: 7,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 30
        },
        {
          id: 3,
          name: '湘江西岸江滩提质工程',
          completed: 5,
          unCompleted: 5,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 50
        }
      ]
    }
  },
  getSectionStatList: config => {
    return {
      result: [
        {
          id: 1,
          name: '第一标段',
          completed: 9,
          unCompleted: 1,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 90
        },
        {
          id: 2,
          name: '第二标段',
          completed: 3,
          unCompleted: 7,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 30
        },
        {
          id: 3,
          name: '第三标段',
          completed: 5,
          unCompleted: 5,
          expired: 1,
          minor: 6,
          normal: 3,
          major: 2,
          severity: 1,
          total: 10,
          completeRatio: 50
        }
      ]
    }
  },
  getPagedIssueList: config => {
    return {
      result: {
        items: [
          {
            id: 1,
            projectName: '梅溪湖国际新城（二期）路网',
            contractorUnitName: '第一建设公司',
            inspectionDate: '2018-10-1',
            deadline: '2018-12-31',
            problemDescription: '有安全隐患，请尽快处理',
            problemGrade: '一般',
            status: '未处理',
            problemClass: '安全',
            abarbeitungUserName: '张三',
            photoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'],
            processPhotoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif']
          },
          {
            id: 2,
            projectName: '梅溪湖国际新城地下综合管廊',
            contractorUnitName: '第一建设公司',
            inspectionDate: '2018-10-1',
            deadline: '2018-12-31',
            problemDescription: '有安全隐患，请尽快处理',
            problemGrade: '一般',
            status: '未处理',
            problemClass: '安全',
            abarbeitungUserName: '张三',
            photoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'],
            processPhotoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif']
          },
          {
            id: 3,
            projectName: '湘江西岸江滩提质工程',
            contractorUnitName: '第一建设公司',
            inspectionDate: '2018-10-1',
            deadline: '2018-12-31',
            problemDescription: '有安全隐患，请尽快处理',
            problemGrade: '严重',
            status: '已处理',
            problemClass: '安全',
            abarbeitungUserName: '李四',
            abarbeitungDate: '2018-10-14',
            photoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'],
            processPhotoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif']
          }
        ],
        totalCount: 3
      }
    }
  }
}

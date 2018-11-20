var projects = [
  {
    name: '梅溪湖国际新城（二期）路网',
    lng: 112.886541,
    lat: 28.188289,
    phaseValue: 1,
    phaseName: '预备阶段',
    startTime: '2018-01-01',
    completionTime: '2020-12-31',
    investmentAmount: 12000,
    legalPerson: '张三',
    projectTypeName: '市政',
    contractAmount: 12500,
    planAmount: 10000,
    completeAmount: 11000,
    qualityIssueNum: 2,
    qualityIssueInProgressNum: 1,
    qualityIssueVerifiedNum: 1,
    safetyIssueNum: 2,
    safetyIssueInProgressNum: 1,
    safetyIssueVerifiedNum: 1
  },
  {
    name: '梅溪湖国际新城地下综合管廊',
    lng: 112.907238,
    lat: 28.200514,
    phaseValue: 2,
    phaseName: '前期阶段',
    startTime: '2018-01-01',
    contractAmount: 12500,
    completionTime: '2020-12-31',
    investmentAmount: 12000,
    legalPerson: '张三',
    projectTypeName: '市政',
    planAmount: 10000,
    completeAmount: 11000,
    qualityIssueNum: 2,
    qualityIssueInProgressNum: 1,
    qualityIssueVerifiedNum: 1,
    safetyIssueNum: 2,
    safetyIssueInProgressNum: 1,
    safetyIssueVerifiedNum: 1
  },
  {
    name: '湘江西岸江滩（银盆岭大桥—靳江河）提质工程',
    lng: 112.964442,
    lat: 28.224706,
    phaseValue: 3,
    phaseName: '施工阶段',
    startTime: '2018-01-01',
    completionTime: '2020-12-31',
    investmentAmount: 12000,
    legalPerson: '张三',
    projectTypeName: '市政',
    contractAmount: 12500,
    planAmount: 10000,
    completeAmount: 11000,
    qualityIssueNum: 2,
    qualityIssueInProgressNum: 1,
    qualityIssueVerifiedNum: 1,
    safetyIssueNum: 2,
    safetyIssueInProgressNum: 1,
    safetyIssueVerifiedNum: 1
  },
  {
    name: '湘江西岸景观亮化工程（龙王港—猴子石大桥）',
    lng: 112.938276,
    lat: 28.213871,
    phaseValue: 4,
    phaseName: '后期阶段',
    startTime: '2018-01-01',
    completionTime: '2020-12-31',
    investmentAmount: 12000,
    legalPerson: '张三',
    projectTypeName: '市政',
    contractAmount: 12500,
    planAmount: 10000,
    completeAmount: 11000,
    qualityIssueNum: 2,
    qualityIssueInProgressNum: 1,
    qualityIssueVerifiedNum: 1,
    safetyIssueNum: 2,
    safetyIssueInProgressNum: 1,
    safetyIssueVerifiedNum: 1
  },
  {
    name: '岳麓大道两厢绿化提质改造工程',
    lng: 112.930959,
    lat: 28.231555,
    phaseValue: 5,
    phaseName: '已完成',
    startTime: '2018-01-01',
    completionTime: '2020-12-31',
    investmentAmount: 12000,
    legalPerson: '张三',
    projectTypeName: '市政',
    contractAmount: 12500,
    planAmount: 10000,
    completeAmount: 11000,
    qualityIssueNum: 2,
    qualityIssueInProgressNum: 1,
    qualityIssueVerifiedNum: 1,
    safetyIssueNum: 2,
    safetyIssueInProgressNum: 1,
    safetyIssueVerifiedNum: 1
  },
  {
    name: '湘府路快速化改造',
    lng: 112.956112,
    lat: 28.122656,
    phaseValue: 6,
    phaseName: '异常',
    startTime: '2018-01-01',
    completionTime: '2020-12-31',
    investmentAmount: 12000,
    legalPerson: '张三',
    projectTypeName: '市政',
    contractAmount: 12500,
    planAmount: 10000,
    completeAmount: 11000,
    qualityIssueNum: 2,
    qualityIssueUnFixNum: 1,
    qualityIssueFixedNum: 1,
    safetyIssueNum: 2,
    safetyIssueUnFixNum: 1,
    safetyIssueFixedNum: 1
  }
]

export default {
  getProjectMapInfoList: config => {
    return {
      result: projects
    }
  },
  getProjectMapOverview: config => {
    return {
      result: {
        total: 7,
        totalAmount: 170000000,
        stats: [
          { id: 1, phaseName: '预备阶段', phaseValue: 1, count: 1 },
          { id: 2, phaseName: '前期阶段', phaseValue: 2, count: 1 },
          { id: 3, phaseName: '施工阶段', phaseValue: 3, count: 2 },
          { id: 4, phaseName: '后期阶段', phaseValue: 4, count: 1 },
          { id: 5, phaseName: '已完工', phaseValue: 5, count: 1 },
          { id: 6, phaseName: '异常', phaseValue: 6, count: 0 }
        ]
      }
    }
  },
  getGroupProjectList: config => {
    return {
      result: projects
    }
  },
  getDefaultProjectTypes: config => {
    return {
      result: [
        { id: 1, name: '市政' },
        { id: 2, name: '房建' },
        { id: 3, name: '水利' },
        { id: 4, name: '景观园林' },
        { id: 5, name: '其他' }
      ]
    }
  },
  getTypeQuantityPieChart: config => {
    return {
      result: [
        { name: '市政', value: 13 },
        { name: '房建', value: 6 },
        { name: '水利', value: 3 },
        { name: '景观园林', value: 5 },
        { name: '其他', value: 2 }
      ]
    }
  },
  getPhaseQuantityPieChart: config => {
    return {
      result: [
        { name: '决策阶段', value: 13 },
        { name: '前期阶段', value: 6 },
        { name: '施工阶段', value: 3 },
        { name: '已完工', value: 5 }
      ]
    }
  },
  getStatusQuantityPieChart: config => {
    return {
      result: [
        { name: '前期阶段', value: 13 },
        { name: '施工阶段', value: 6 },
        { name: '停工', value: 3 },
        { name: '部分完工暂停', value: 5 },
        { name: '完工待验收', value: 2 },
        { name: '已验收', value: 5 },
        { name: '移交', value: 8 }
      ]
    }
  }
}

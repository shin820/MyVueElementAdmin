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
  getStatusCount: config => {
    return {
      result: [
        {
          value: 33,
          name: '前期阶段'
        },
        {
          value: 31,
          name: '施工阶段'
        },
        {
          value: 23,
          name: '停工'
        },
        {
          value: 12,
          name: '部分完工暂停'
        },
        {
          value: 6,
          name: '完工待验收'
        },
        {
          value: 36,
          name: '已验收'
        },
        {
          value: 11,
          name: '移交'
        }
      ]
    }
  },
  getStatusAmount: config => {
    return {
      result: [
        {
          value: 335,
          name: '前期阶段'
        },
        {
          value: 310,
          name: '施工阶段'
        },
        {
          value: 234,
          name: '停工'
        },
        {
          value: 123,
          name: '部分完工暂停'
        },
        {
          value: 67,
          name: '完工待验收'
        },
        {
          value: 367,
          name: '已验收'
        },
        {
          value: 111,
          name: '移交'
        }
      ]
    }
  },
  getTypeCount: config => {
    return {
      result: [
        {
          value: 33,
          name: '市政'
        },
        {
          value: 31,
          name: '房建'
        },
        {
          value: 23,
          name: '水利'
        },
        {
          value: 12,
          name: '景观园林'
        },
        {
          value: 6,
          name: '其他'
        }
      ]
    }
  },
  getTypeAmount: config => {
    return {
      result: [
        {
          value: 335,
          name: '市政'
        },
        {
          value: 310,
          name: '房建'
        },
        {
          value: 234,
          name: '水利'
        },
        {
          value: 123,
          name: '景观园林'
        },
        {
          value: 67,
          name: '其他'
        }
      ]
    }
  },
  getTypeAmounts: config => {
    return {
      result: {
        organizations: ['所有项目', '市政', '房建', '水利', '园林景观', '其他'],
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
  getPhaseAmounts: config => {
    return {
      result: {
        organizations: ['研究阶段', '前期阶段', '施工阶段', '移交'],
        series: [
          {
            name: '项目个数',
            data: [4, 1, 2, 3]
          },
          {
            name: '概算总额',
            data: [800000000, 50000000, 30000000, 400000000]
          }
        ]
      }
    }
  },
  getStatusAmounts: config => {
    return {
      result: {
        organizations: ['开工', '暂停', '完工', '移交'],
        series: [
          {
            name: '项目个数',
            data: [4, 1, 2, 3]
          },
          {
            name: '概算总额',
            data: [800000000, 50000000, 30000000, 400000000]
          }
        ]
      }
    }
  },
  getWeeklyReport: config => {
    return {
      result: [
        {
          projectName: '测试项目',
          projectInfo: `按城市快速路标准建设，全长6.519公里，项目总投资约159657万元，其中建安工程费约111477万元。
          1、路基：
          路基挖土石方96.7万方，路基填土石方173.8万方。
          2、通函工程：
          箱涵5道，共长192m；盖板涵4道，共长86.34m；圆管涵1道；长18.75m。
          3、桥梁工程：
          桥梁9座,长2.76千米。下构137座墩台；基础604根桩；上构现浇81跨（现浇箱梁69跨，现浇拱12跨），预制箱梁42跨（212片）。
          4、路面结构：
          15CM级配碎石垫层26.78万㎡；20CM4%水泥稳定碎（砾）石底基层25.85万㎡；5%水泥稳定碎（砾）石下基层25.21万㎡（20CM水稳为15.47万㎡，15CM水稳为9.74万㎡））；5%水泥稳定碎（砾）石上基层24.31万㎡（20CM水稳为14.95万㎡，15CM水稳为9.36万㎡）；
          5、沥青路面工程：
          4CM上面层SMA-13细粒式密级配改性沥青23.62万㎡；5CM中面层为AC-20C中粒式密级级配沥青砼23.62万㎡；7CM下面层为AC-25C粗粒式沥青混凝土23.62万㎡。`,
          reportDate: '2018-1-1',
          plan: `一、K4+800~K7+788.35段：
          1、跨城陵矶至联港路高架桥桩基施工（12-2、4；13-3、4；15-1、3；25-2、3；
          26-2、3）；
          2、K5+460-K5+510左右侧片石回填8000m3、
          3、K5+380-K5+540杂填土换填5000m3。
          4、K5+281-k5+317中间水泥搅拌桩2000m。
          5、K6+810-K6+900清淤5000m3。
          二、K7+788.35~K11+319段：
          1、芭蕉湖大桥2-4#、5-2#桩基浇筑完成；
          2、芭蕉湖大桥16#墩钢平台开始搭设；
          3、K8+200~K8+310段路基填筑；
          4、K9+120-K9+600便道修筑。`,
          actual: `一、K4+800~K7+788.35段：
          1、K5+460-K5+510左右侧片石回填8000m3;
          2、K5+380-K5+540杂填土换填10000m3;
          3、清除表土20700m3;
          4、路床（槽）整形12100m2;
          5、跨城陵矶至联港路高架桥：
          桩基：12-2、4；13-3、4；15-1、3；25-2、3；26-2、3；
          二、K7+788.35~K11+319段：
          1、16#墩钢平台搭设完成；
          2、芭蕉湖大桥2-3#、2-4#、4-4#、5-2#和5-3#桩基灌桩完毕；
          3、K8+210-K8+360段路基填筑15000m³；
          4、K8+270处过路污水管完成20m，污水检查井一座。`,
          nextPlan: `一、K4+800~K7+788.35段：
          1、K5+510-K5+560进行清淤，清淤总量约为6000m3；
          2、K5+510-K5+560进行回填，回填总量约为3000m3；
          3、K5+380-K5+540施工杂填土换填，回填素土约20000m3；
          4、K6+810-K6+900城陵矶西路清除杂填土及淤泥约5000m3；
          5、跨城陵矶至联港路高架桥桩基施工（8根）。
          二、K7+788.35~K11+319段：
          1、K8+255-K8+360路基填筑；
          2、芭蕉湖大桥2-1#、4-3#、5-4#桩基施工完成；
          2、芭蕉湖大桥19#墩钢平台开始搭设；
          3、K8+110-K8+180清淤换填完成；
          4、K9+040-K9+180便道拉通；
          5、K8+200-K8+360开挖弃土。`,
          note: 'test'
        }
      ]
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

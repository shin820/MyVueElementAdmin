export default {
  getStats: config => {
    return {
      result: [
        {
          value: 335,
          name: '质量问题'
        },
        {
          value: 310,
          name: '安全问题'
        }
      ]
    }
  },
  getQualityStats: config => {
    return {
      result: [
        {
          value: 12,
          name: '未处理'
        },
        {
          value: 31,
          name: '已处理'
        }
      ]
    }
  },
  getSafetyStats: config => {
    return {
      result: [
        {
          value: 10,
          name: '未处理'
        },
        {
          value: 20,
          name: '已处理'
        }
      ]
    }
  },
  getCompanyStats: config => {
    return {
      result: {
        organizations: ['梅溪湖投资（长沙）有限公司', '湖南湘江新区投资集团有限公司', '湖南湘江新区市政建设投资有限公司', '湖南湘新水务投资有限公司', '长沙岳麓山国家大学科技城建设投资有限公司', '湖南华年文化旅游投资有限公司', '湖南梦想置业开发有限公司'],
        series: [
          {
            name: '质量问题',
            data: [10, 21, 31, 8, 13, 18, 25]
          },
          {
            name: '安全问题',
            data: [5, 2, 3, 10, 7, 8, 9]
          }
        ]
      }
    }
  },
  getProjectStats: config => {
    return {
      result: {
        organizations: ['梅溪湖国际新城（二期）路网', '梅溪湖国际新城地下综合管廊', '湘江西岸江滩（银盆岭大桥—靳江河）提质工程', '湘江西岸景观亮化工程（龙王港—猴子石大桥）', '岳麓大道两厢绿化提质改造工程', '湘府路快速化改造'],
        series: [
          {
            name: '质量问题',
            data: [10, 21, 31, 8, 13, 18]
          },
          {
            name: '安全问题',
            data: [5, 2, 3, 10, 7, 8]
          }
        ]
      }
    }
  },
  getSectionStats: config => {
    return {
      result: {
        organizations: ['第一标段', '第二标段', '第三标段', '第四标段', '第五标段', '第六标段'],
        series: [
          {
            name: '质量问题',
            data: [10, 21, 31, 8, 13, 18]
          },
          {
            name: '安全问题',
            data: [5, 2, 3, 10, 7, 8]
          }
        ]
      }
    }
  },
  getPagedIssueList: config => {
    return {
      result: {
        totalCount: 100,
        items: [
          {
            projectName: '测试项目1',
            contractorUnitName: '施工单位1',
            problemClass: '质量',
            problemGrade: '严重',
            problemDescription: '严重质量问题，部位出现列横，无法保证正常工作。',
            abarbeitungUserName: '张三',
            abarbeitungDate: new Date(),
            abarbeitungProcess: '购买新设备进行替换，并进行了标准流程测试，保证正常工作。',
            requirement: '重新安装，使用新设备替换。',
            deadline: new Date(),
            inspectionDate: new Date(),
            address: '湖南省长沙市岳麓区XXXXXXXXXXXXXXXXXXXX',
            status: '处理中',
            photoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'],
            processPhotoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif']
          },
          {
            projectName: '测试项目2',
            contractorUnitName: '施工单位2',
            problemClass: '安全',
            problemGrade: '严重',
            problemDescription: '严重质量问题，部位出现列横，无法保证正常工作。',
            abarbeitungUserName: '张三',
            abarbeitungDate: new Date(),
            abarbeitungProcess: '购买新设备进行替换，并进行了标准流程测试，保证正常工作。',
            requirement: '重新安装，使用新设备替换。',
            deadline: new Date(),
            inspectionDate: new Date(),
            address: '湖南省长沙市岳麓区XXXXXXXXXXXXXXXXXXXX',
            status: '处理中',
            photoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'],
            processPhotoList: ['https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif']
          }
        ]
      }
    }
  }
}

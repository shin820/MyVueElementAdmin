export default {
  getProjectPhases: config => {
    return {
      result: [
        { id: 1, name: '前期阶段', value: '1' },
        { id: 2, name: '施工阶段', value: '2' },
        { id: 3, name: '完工阶段', value: '3' },
        { id: 4, name: '移交', value: '4' }
      ]
    }
  },
  getProjectStatuses: config => {
    return {
      result: [
        { id: 1, name: '开工', value: '1' },
        { id: 2, name: '暂停', value: '2' },
        { id: 3, name: '完工', value: '3' },
        { id: 4, name: '移交', value: '4' }
      ]
    }
  }
}

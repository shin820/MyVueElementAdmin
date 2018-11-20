import request from '@/utils/request'

export function getProjectPhases(projectId) {
  return request({
    url: '/api/services/app/dataDict/getDicts',
    method: 'get',
    params: {
      projectId,
      typeName: '项目阶段'
    }
  })
}

export function getProjectStatuses(projectId) {
  return request({
    url: '/api/services/app/dataDict/getDicts',
    method: 'get',
    params: {
      projectId,
      typeName: '项目状态'
    }
  })
}

export function getContractTypes(projectId) {
  return request({
    url: '/api/services/app/dataDict/getDicts',
    method: 'get',
    params: {
      projectId,
      typeName: '合同类型'
    }
  })
}

export function getContractStatuses(projectId) {
  return request({
    url: '/api/services/app/dataDict/getDicts',
    method: 'get',
    params: {
      projectId,
      typeName: '合同状态'
    }
  })
}

export function getAlterTypes(projectId) {
  return request({
    url: '/api/services/app/dataDict/getDicts',
    method: 'get',
    params: {
      projectId,
      typeName: '变更类别'
    }
  })
}

export function getAlterConditionTypes(projectId) {
  return request({
    url: '/api/services/app/dataDict/getDicts',
    method: 'get',
    params: {
      projectId,
      typeName: '变更条件类型'
    }
  })
}

import request from '@/utils/request'

// export function getContractList(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getContractList',
//     method: 'get',
//     params: params
//   })
// }

// export function getTypeAmounts(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getTypeAmounts',
//     method: 'get',
//     params: params
//   })
// }

// export function getStatusAmounts(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getStatusAmounts',
//     method: 'get',
//     params: params
//   })
// }

// export function getProjectStatusAmounts(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getProjectStatusAmounts',
//     method: 'get',
//     params: params
//   })
// }

// export function getAlterContrast(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getAlterContrast',
//     method: 'get',
//     params: params
//   })
// }

// export function getAmountContrast(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getAmountContrast',
//     method: 'get',
//     params: params
//   })
// }

// export function getCompanyAmounts(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getCompanyAmounts',
//     method: 'get',
//     params: params
//   })
// }

export function getAmountStats(params) {
  return request({
    url: '/api/services/app/ContractStats/getAmountStats',
    method: 'get',
    params: params
  })
}

// export function getTypeAmountPieChart(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getTypeAmountPieChart',
//     method: 'get',
//     params: params
//   })
// }

// export function getStatusAmountPieChart(params) {
//   return request({
//     url: '/api/services/app/ContractStats/getStatusAmountPieChart',
//     method: 'get',
//     params: params
//   })
// }

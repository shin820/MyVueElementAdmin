// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'
import moment from 'moment'

export function date(time) {
  if (!time) {
    return ''
  }
  return moment(time).format('YYYY-MM-DD')
}

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function wanYuan(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return ''
  }
  const value = (amount / 10000).toFixed(0)
  return value
}

export function yiYuan(amount) {
  if (isNaN(amount)) {
    return ''
  }
  const value = (amount / 100000000).toFixed(2)
  return value
}

export function chineseAmount(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return ''
  }

  if (amount >= 10000000) {
    const value = (amount / 100000000).toFixed(2)
    return value + '亿元'
  }

  if (amount > 10000) {
    const value = (amount / 10000).toFixed(2)
    return value + '万元'
  }

  return amount + '元'
}

export function percent(amount, digits) {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return ''
  }

  return (amount * 100).toFixed(digits)
}

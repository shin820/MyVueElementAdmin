import { goToNewRoute } from '@/utils'
import moment from 'moment'

export function goToList($store, $router, title, query) {
  if (query.from) {
    query.from = moment(query.from).format('YYYY-MM-DD')
  }
  if (query.to) {
    query.to = moment(query.to).format('YYYY-MM-DD')
  }
  var routeObj = {
    visitedViews: $store.state.tagsView.visitedViews,
    $router: $router,
    title: title,
    componentName: 'inspection-issue-list',
    component: () => import('@/views/inspection/list'),
    query: query
  }

  goToNewRoute(routeObj)
}

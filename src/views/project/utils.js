import { goToNewRoute } from '@/utils'

export function goToList($store, $router, title, query) {
  var routeObj = {
    visitedViews: $store.state.tagsView.visitedViews,
    $router: $router,
    title: title,
    componentName: 'project-info-list',
    component: () => import('@/views/project/list'),
    query: query
  }

  goToNewRoute(routeObj)
}

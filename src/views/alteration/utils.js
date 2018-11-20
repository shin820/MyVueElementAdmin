import { goToNewRoute } from '@/utils'

export function goToList($store, $router, title, query) {
  var routeObj = {
    visitedViews: $store.state.tagsView.visitedViews,
    $router: $router,
    title: title,
    componentName: 'alter-list',
    component: () => import('@/views/alteration/list'),
    query: query
  }

  goToNewRoute(routeObj)
}

export function goToCompanyChart($store, $router, title, query) {
  var routeObj = {
    visitedViews: $store.state.tagsView.visitedViews,
    $router: $router,
    title: title,
    componentName: 'alter-company-barchart',
    component: () => import('@/views/alteration/company-barchart.vue'),
    query: query
  }

  goToNewRoute(routeObj)
}

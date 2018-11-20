import { goToNewRoute } from '@/utils'

export function goToList($store, $router, title, query) {
  var routeObj = {
    visitedViews: $store.state.tagsView.visitedViews,
    $router: $router,
    title: title,
    componentName: 'contract-list',
    component: () => import('@/views/contract/list'),
    query: query
  }

  goToNewRoute(routeObj)
}

export function goToCompanyChart($store, $router, title, query) {
  var routeObj = {
    visitedViews: $store.state.tagsView.visitedViews,
    $router: $router,
    title: title,
    componentName: 'contract-company-barchart',
    component: () => import('@/views/contract/company-barchart.vue'),
    query: query
  }

  goToNewRoute(routeObj)
}

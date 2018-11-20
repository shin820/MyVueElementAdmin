<script>
  import { param2Obj } from '@/utils'
  export default {
    name: 'authredirect',
    created() {
      // const hash = window.location.search.slice(1)
      const params = param2Obj(window.location.href)
      if (params.token) {
        this.$store.dispatch('LoginByToken', params.token).then(() => {
          // window.location.href = window.location.origin + '/login#' + hash
          window.location.href = window.location.origin
        })
      } else {
        alert('无效的登录')
      }
      // const hash = window.location.search.slice(1)
      // window.opener.location.href = window.location.origin + '/login#' + hash
      // window.location.href = window.location.origin + '/login#' + hash
      // window.close()
    }
  }
</script>

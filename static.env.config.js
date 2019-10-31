/**
 * Created by LiuLei on 2019-01-28
 */
const nanoid = require('nanoid')

let script = `<script>
GLOBAL_REGION_ADDRESS="${process.env.VUE_APP_GLOBAL_REGION_ADDRESS}";
TENANT_REGION_ADDRESS="${process.env.VUE_APP_TENANT_REGION_ADDRESS}";
</script>`

if (process.env.NODE_ENV !== 'development') {
  script += `<script src="/env.js?v=${nanoid(13)}"></script>`
}

module.exports = {
  script
}

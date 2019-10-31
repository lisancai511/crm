import { arrToMap } from '@/utils'
import {
  basicComponents,
  fictitiousComponents,
  layoutComponents,
  tabDetailsComponents,
  tabDetailsRelatedListComponents
} from '@/views/designer/config/components'

/**
 * Created by LiuLei on 2019/10/30
 */
const containerComponentByType = arrToMap([
  ...layoutComponents,
  ...fictitiousComponents,
  ...basicComponents,
  ...tabDetailsComponents,
  ...tabDetailsRelatedListComponents
], 'type')

export default containerComponentByType

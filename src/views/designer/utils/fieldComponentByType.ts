import { fieldComponents, IField } from '@/views/designer/config/components'
import { arrToMap } from '@/utils'

/**
 * Created by LiuLei on 2019/10/30
 */
const fieldComponentByType: { [prop: string]: IField } = arrToMap(fieldComponents, 'type')
export default fieldComponentByType

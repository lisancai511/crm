/**
 * Created by LiuLei on 2019/11/5
 */
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import nanoid from 'nanoid'
import { version } from '@/views/designer/config/PredefinedLayouts'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { DraggableOptionsFormField, DraggableOptionsFormFieldGroup } from '@/views/designer/config/DraggableOptions'

export default {
  [LayoutTypes.Mobile]: {
    name: 'layout1_' + LayoutTypes.Mobile + '_' + nanoid(),
    apiName: 'api' + '_' + LayoutTypes.Mobile + '_' + nanoid(),
    description: '',
    type: LayoutTypes.Mobile,
    usedFields: [],
    needAddFields: [],
    needModifyFields: [],
    version,
    // TODO remove next LINE
    // @ts-ignore
    define: {
      version,
      type: ComponentTypes.Container,
      name: 'layout1_' + LayoutTypes.Mobile + '_' + nanoid(),
      // apiName: 'api' + '_' + LayoutTypes.PC + '_' + nanoid(),
      attrs: {
        direction: 'vertical'
      },
      draggable: DraggableOptionsFormFieldGroup,
      children: [
        {
          type: ComponentTypes.Group,
          key: ComponentTypes.Group + '_' + nanoid(),
          name: '基本信息',
          children: [
            {
              type: ComponentTypes.Row,
              key: ComponentTypes.Row + '_' + nanoid(),
              children: [
                {
                  type: ComponentTypes.Col,
                  key: ComponentTypes.Col + '_' + nanoid(),
                  attrs: {
                    span: 24
                  },
                  draggable: DraggableOptionsFormField,
                  isDefaultFieldContainer: true,
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

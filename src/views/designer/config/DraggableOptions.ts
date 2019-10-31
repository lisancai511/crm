/**
 * Created by LiuLei on 2019/9/29
 */

import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'

export enum DraggableOptionsNames {
  DraggableOptionsFormField = 'DraggableOptionsFormField',
  DraggableOptionsFormFieldGroup = 'DraggableOptionsFormFieldGroup'
}

export const DraggableOptionsFormField = {
  name: DraggableOptionsNames.DraggableOptionsFormField,
  group: DraggableGroupTypes.FormField,
  ghostClass: DraggableClassNames.FormField
}

export const DraggableOptionsFormFieldGroup = {
  name: DraggableOptionsNames.DraggableOptionsFormFieldGroup,
  group: DraggableGroupTypes.FormGroup,
  ghostClass: DraggableClassNames.FormGroup
}

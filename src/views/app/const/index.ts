/**
 * Created by LiuLei on 2019/11/12
 */
import ComponentTypes from '@/views/designer/config/ComponentTypes'

export const TermsFieldTypesList: string[] = [
  ComponentTypes.TextField,
  ComponentTypes.LongTextField,
  ComponentTypes.DateField,
  ComponentTypes.DateTimeField,
  ComponentTypes.EmailField,
  ComponentTypes.PhoneField,
  ComponentTypes.WebsiteField,
  ComponentTypes.CheckBoxField,
  ComponentTypes.LookUpField,
  ComponentTypes.OptionListField
]

export enum ListViewOperators {
  EQ = 'EQ',
  NOT_EQ = 'NOT_EQ',
  GT = 'GT',
  GTE = 'GTE',
  LT = 'LT',
  LTE = 'LTE',
  LIKE = 'LIKE',
  NOT_LIKE = 'NOT_LIKE',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
  START_WITH = 'START_WITH',
  END_WITH = 'END_WITH',
  IS_NULL = 'IS_NULL',
  IS_NOT_NULL = 'IS_NOT_NULL',
}

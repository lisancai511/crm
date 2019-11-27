export default {
  'type': 'start',
  'name': '发起人',
  'nodeId': 'sid-startevent',
  'properties': {},
  'childNode': {
    'type': 'route',
    'prevId': 'sid-startevent',
    'nodeId': 'ce2c_ee9a',
    'conditionNodes': [{
      'name': '条件1',
      'type': 'condition',
      'prevId': 'ce2c_ee9a',
      'nodeId': '8c26_2b47',
      'properties': {
        'conditions': [[{
          'paramKey': 'dingtalk_origin_dept',
          'type': 'dingtalk_actioner_dept_condition',
          'paramLabel': '发起人',
          'isEmpty': false,
          'conds': [{ 'type': 'user', 'value': '12056922682418', 'attrs': { 'name': '刘磊', 'avatar': '' } }]
        }, {
          'type': 'dingtalk_actioner_value_condition',
          'paramKey': 'DDHolidayField-J2BWEN12__options',
          'paramLabel': '请假类型',
          'paramValue': '',
          'paramValues': ['年假'],
          'isEmpty': false
        }, {
          'type': 'dingtalk_actioner_range_condition',
          'paramKey': 'DDHolidayField-J2BWEN12__duration',
          'paramLabel': '时长（天）',
          'lowerBound': '',
          'upperBound': '2',
          'unit': '天',
          'isEmpty': false,
          'lowerBoundNotEqual': '',
          'upperBoundEqual': '',
          'boundEqual': '',
          'key': 'l'
        }]]
      },
      'childNode': {
        'name': 'UNKNOWN',
        'type': 'approver',
        'prevId': '8c26_2b47',
        'nodeId': '8ff7_e9ce',
        'properties': {
          'activateType': 'ONE_BY_ONE',
          'agreeAll': false,
          'actionerRules': [{
            'type': 'target_approval',
            'approvals': [{ 'userName': '刘磊', 'workNo': '12056922682418' }],
            'isEmpty': false
          }]
        },
        'childNode': {
          'name': 'UNKNOWN',
          'type': 'approver',
          'prevId': '8ff7_e9ce',
          'nodeId': 'a595_a2ae',
          'properties': {
            'activateType': 'ONE_BY_ONE',
            'agreeAll': false,
            'actionerRules': [{
              'type': 'target_select',
              'multi': 1,
              'select': ['allStaff'],
              'range': { 'approvals': [], 'labels': [], 'allStaff': null },
              'key': 'manual_a595_a2ae_c726_b2e4'
            }]
          },
          'childNode': {
            'name': 'UNKNOWN',
            'type': 'notifier',
            'prevId': 'a595_a2ae',
            'nodeId': 'ba7a_09f2',
            'properties': {
              'actionerRules': [{
                'select': ['allStaff'],
                'range': { 'allStaff': null },
                'multi': 1,
                'type': 'target_select',
                'key': 'manual_ba7a_09f2_5e6c_d635'
              }]
            }
          }
        }
      }
    }, {
      'name': '条件3',
      'type': 'condition',
      'prevId': 'ce2c_ee9a',
      'nodeId': 'be77_0dcb',
      'properties': {
        'conditions': [[{
          'paramKey': 'dingtalk_origin_dept',
          'type': 'dingtalk_actioner_dept_condition',
          'paramLabel': '发起人',
          'isEmpty': false,
          'conds': [{ 'type': 'user', 'value': '12056922682418', 'attrs': { 'name': '刘磊', 'avatar': '' } }]
        }]]
      },
      'childNode': {
        'name': 'UNKNOWN',
        'type': 'notifier',
        'prevId': 'be77_0dcb',
        'nodeId': 'c981_e0d0',
        'properties': {
          'actionerRules': [{
            'select': ['allStaff'],
            'range': { 'allStaff': null },
            'multi': 1,
            'type': 'target_select',
            'key': 'manual_c981_e0d0_1ce2_9590'
          }]
        },
        'childNode': {
          'type': 'route',
          'prevId': 'c981_e0d0',
          'nodeId': '66fb_d75a',
          'conditionNodes': [{
            'name': '条件1',
            'type': 'condition',
            'prevId': '66fb_d75a',
            'nodeId': 'ea43_d037',
            'properties': {
              'conditions': [[{
                'type': 'dingtalk_actioner_value_condition',
                'paramKey': 'DDHolidayField-J2BWEN12__options',
                'paramLabel': '请假类型',
                'paramValue': '',
                'paramValues': ['年假'],
                'isEmpty': false
              }]]
            },
            'childNode': {
              'name': 'UNKNOWN',
              'type': 'approver',
              'prevId': 'ea43_d037',
              'nodeId': '93ab_3752',
              'properties': {
                'activateType': 'ONE_BY_ONE',
                'agreeAll': false,
                'actionerRules': [{
                  'type': 'target_approval',
                  'approvals': [{ 'userName': '刘磊', 'workNo': '12056922682418' }],
                  'isEmpty': false
                }]
              }
            }
          }, {
            'name': '条件2',
            'type': 'condition',
            'prevId': '66fb_d75a',
            'nodeId': '0e1d_dd60',
            'properties': { 'conditions': [] }
          }],
          'properties': {}
        }
      }
    }, {
      'name': '条件2',
      'type': 'condition',
      'prevId': 'ce2c_ee9a',
      'nodeId': '8048_ff35',
      'properties': {
        'conditions': [[{
          'paramKey': 'dingtalk_origin_dept',
          'type': 'dingtalk_actioner_dept_condition',
          'paramLabel': '发起人',
          'isEmpty': false,
          'conds': [{ 'type': 'user', 'value': '12056922682418', 'attrs': { 'name': '刘磊', 'avatar': '' } }]
        }]]
      },
      'childNode': {
        'name': 'UNKNOWN',
        'type': 'approver',
        'prevId': '8048_ff35',
        'nodeId': 'b89c_12f4',
        'properties': {
          'activateType': 'ONE_BY_ONE',
          'agreeAll': false,
          'actionerRules': [{
            'type': 'target_approval',
            'approvals': [{ 'userName': '刘磊', 'workNo': '12056922682418' }],
            'isEmpty': false
          }]
        }
      }
    }],
    'properties': {},
    'childNode': {
      'name': 'UNKNOWN',
      'type': 'approver',
      'prevId': 'ce2c_ee9a',
      'nodeId': '6a6e_6bac',
      'properties': {
        'activateType': 'ONE_BY_ONE',
        'agreeAll': false,
        'actionerRules': [{
          'type': 'target_approval',
          'approvals': [{ 'userName': '刘磊', 'workNo': '12056922682418' }],
          'isEmpty': false
        }]
      },
      'childNode': {
        'name': 'UNKNOWN',
        'type': 'approver',
        'prevId': '6a6e_6bac',
        'nodeId': '7a10_a007',
        'properties': {
          'activateType': 'ONE_BY_ONE',
          'agreeAll': false,
          'actionerRules': [{
            'type': 'target_approval',
            'approvals': [{ 'userName': '刘磊', 'workNo': '12056922682418' }],
            'isEmpty': false
          }]
        }
      }
    }
  }
}

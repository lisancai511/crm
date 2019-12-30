export default [
  {
    id: 'aaaaaaaa',
    type: 'Start',
    name: '发起人'
  },
  {
    id: 'asssssss',
    type: 'Approval',
    name: '组长审批',
    approver: {
      type: 'DesignateUsers',
      userIds: [2, 3, 3234, 99]
    },
    formAuth: [
      {
        fieldId: '12',
        auth: {
          writeable: true,
          readonly: false,
          invisible: false
        }
      }
    ]
  },
  {
    id: 'ffffffff',
    type: 'ExclusiveGateway',
    name: '',
    conditions: [
      {
        id: 'asdasdadsf',
        type: 'Condition',
        name: '条件1',
        config: [],
        nodes: [
          {
            id: 'erwtgdsfgsdfg',
            type: 'ExclusiveGateway',
            name: '',
            conditions: [
              {
                id: 'yuutjhgfhsdfg',
                type: 'Condition',
                name: '条件11',
                config: [],
                nodes: [
                  {
                    id: 'etrgfdadfsg',
                    type: 'Approval',
                    name: '审批人567'
                  }
                ]
              },
              {
                id: 'qwewqrfdsfasdf',
                type: 'Condition',
                name: '条件22',
                config: []
              }
            ]
          }
        ]
      },
      {
        id: 'cvzzbvdfhfdg',
        type: 'Condition',
        name: '条件2',
        config: [],
        nodes: [
          {
            id: 'iophgvdsfasd',
            type: 'Approval',
            name: '审批人333'
          },
          {
            id: 'cxvcvjntryherty',
            type: 'ExclusiveGateway',
            name: '',
            conditions: [
              {
                id: 'yuyuitytre',
                type: 'Condition',
                name: '条件3',
                config: []
              },
              {
                id: 'xcvbcvbcczxcv',
                type: 'Condition',
                name: '条件4',
                config: []
              }
            ]
          },
          {
            id: 'xcvbasdasdzX',
            type: 'Approval',
            name: '审批人555'
          },
          {
            id: 'zxcvxzcvdsfasd',
            type: 'Approval',
            name: '审批人666'
          }
        ]
      },
      {
        id: 'aghfgjhgjkhsdfg',
        type: 'Condition',
        name: '条件3',
        config: [],
        nodes: [
          {
            id: 'iophgvdsfasd',
            type: 'Approval',
            name: '审批人333'
          },
          {
            id: 'cxvcvjntryherty',
            type: 'ExclusiveGateway',
            name: '',
            conditions: [
              {
                id: 'yuyuitytre',
                type: 'Condition',
                name: '条件3',
                config: []
              },
              {
                id: 'xcvbcvbcczxcv',
                type: 'Condition',
                name: '条件4',
                config: []
              }
            ]
          },
          {
            id: 'xcvbasdasdzX',
            type: 'Approval',
            name: '审批人555'
          },
          {
            id: 'zxcvxzcvdsfasd',
            type: 'Approval',
            name: '审批人666'
          }
        ]
      },
      {
        id: 'Zczxvdfsgsagsdfgas',
        type: 'Condition',
        name: '条件4',
        config: [],
        nodes: [
          {
            id: 'iophgvdsfasd',
            type: 'Approval',
            name: '审批人333'
          },
          {
            id: 'cxvcvjntryherty',
            type: 'ExclusiveGateway',
            name: '',
            conditions: [
              {
                id: 'yuyuitytre',
                type: 'Condition',
                name: '条件3',
                config: []
              },
              {
                id: 'xcvbcvbcczxcv',
                type: 'Condition',
                name: '条件4',
                config: []
              }
            ]
          },
          {
            id: 'xcvbasdasdzX',
            type: 'Approval',
            name: '审批人555'
          },
          {
            id: 'zxcvxzcvdsfasd',
            type: 'Approval',
            name: '审批人666'
          }
        ]
      }
    ]
  },
  {
    id: 'afewqsdcvzx',
    type: 'Approval',
    name: '审批人1'
  },
  {
    id: 'xczvasefscv',
    type: 'ExclusiveGateway',
    name: '',
    conditions: [
      {
        id: 'qewrrewqtwq',
        type: 'Condition',
        name: '条件1',
        config: [],
        nodes: [
          {
            id: 'zxcvewfsdghhdfs',
            type: 'Approval',
            name: '直接主管'
          }
        ]
      },
      {
        id: 'erertertewqrtwer',
        type: 'Condition',
        name: '条件2',
        config: []
      },
      {
        id: 'erertertewqrtwqwwqqw',
        type: 'Condition',
        name: '条件22',
        config: []
      }
    ]
  },
  {
    id: 'qwerewcxcvhjj',
    type: 'Approval',
    name: '老板审批'
  },
  {
    id: 'bfgfdsfadsd',
    type: 'CC',
    name: '抄送人'
  }
]

// ////////////////////////////////////////////////////////////////////1
//                         LAYOUT1                                   //1
// ////////////////////////////////////////////////////////////////////1
// ////////////////////////////////////////////////////////////////////1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
// ////////////////////////////////////////////////////////////////////1

export default [
  {
    type: 'Page',
    name: 'page_predefined_1',
    children: [
      {
        type: 'FormHeader',
        name: 'combinedHeader_1',
        usedButtons: [
          'edit', 'delete', 'modifyOwner', 'share'
        ],
        usedFields: [
          'startTime', 'endTime', 'owner', 'status', 'budget'
        ]
      }, {
        type: 'Container',
        name: 'container_1',
        direction: 'horizon',
        children: [
          {
            type: 'InfoTab',
            name: 'infoTab_1',
            children: [
              {
                type: 'Detail',
                name: 'detail_1',
                layout: 'ColumnLayout',
                columnCount: 2,
                children: [
                  {
                    type: 'Container',
                    name: 'container_2',
                    children: [
                      {
                        type: 'TextField',
                        name: 'name',
                        field: 'name'
                      }, {
                        type: 'UserChoise',
                        name: 'operator',
                        field: 'operator'
                      }
                    ]
                  }, {
                    type: 'Container',
                    name: 'container_3',
                    children: [
                      {
                        type: 'MultiTextField',
                        name: 'remark',
                        field: 'remark'
                      }
                    ]
                  }
                ]
              }, {
                type: 'Activity',
                name: 'activity_1'
              }, {
                type: 'File',
                name: 'file_1'
              }
            ]
          }, {
            type: 'InfoTab',
            name: 'infoTab_2',
            children: [
              {
                type: 'TraceRecord',
                name: 'tranceRecord',
                traceRecordTypes: ['telephone', 'QQ'],
                dispButtons: ['newRecord', 'delete', 'edit']
              }
            ]
          }
        ]
      }
    ]
  }
]

// taskId	int		任务id
// systemId	int		系统id
// orgId	int		发布单位id
// orgName	string		发布单位名称
// staffId	int		发布成员id
// staffName	string		发布成员名称
// taskName	string		任务名称
// beginTimeFillEstimate	string		预计填报开始时间 yyyy-mm-dd hh:MM:ss
// endTimeFillEstimate	string		预计填报结束时间 yyyy-mm-dd hh:MM:ss
// endTimeFillActual	string	○	实际填报结束时间 yyyy-mm-dd hh:MM:ss，未结束不传
// templateId	int		模板id
// maxFillCount	int		最大可提交份数，0表示不限制
// publishType	int		任务发布类型  1：按层级发布   2：指定人员发布
// passPeople	int		通过人数
// passCount	int		通过份数
// FillPeople	int		填报人数
// FillCount	int		填报份数
// taskStatus	int		任务状态 0：未开始 1：进行中 2：完成

import { TreeDataNode } from 'antd';

export const orgResultData = [
  {
    orgRate: 80,
    paper: 1,
    itemRate: 80,
    standard: '指标1',
  },
  {
    orgRate: 80,
    paper: 2,
    itemRate: 80,
    standard: '指标2',
  },
  {
    orgRate: 80,
    paper: 3,
    itemRate: 80,
    standard: '指标3',
  },
];
export const professorResultData = [
  {
    professorRate: '99',
    paper: 1,
    rate: 100,
    standard: '标准aaaa',
    itemRate: 88,
  },
  {
    professorRate: '99',
    paper: 1,
    rate: 100,
    standard: '标准aaaa',
    itemRate: 88,
  },
  {
    professorRate: '99',
    paper: 2,
    rate: 100,
    standard: '标准sssss',
    itemRate: 88,
  },
  {
    professorRate: '90',
    paper: 1,
    rate: 100,
    standard: '标准ddddd',
    itemRate: 88,
  },
];
export const checkDetailProfessorData = [
  {
    name: '杨专家',
    phone: '123456789',
    org3: '第一小学',
    target: '杨1',
    targetPhone: '123456789',
    paper: '试卷1',
    rate: '90',
    dimension: '第一个维度',
    dimensionRate: '90',
    status: 'passed',
    professorComment: '好好好好',
  },
  {
    name: '杨专家',
    phone: '123456789',
    org3: '第一小学',
    target: '杨1',
    targetPhone: '123456789',
    paper: '试卷1',
    rate: '90',
    dimension: '第一个维度',
    dimensionRate: '90',
    status: 'submit',
    professorComment: '好好好好',
    rejectInfo: 'sjkdfjskd',
  },
  {
    name: '杨专家',
    phone: '123456789',
    org3: '第一小学',
    target: '杨1',
    targetPhone: '123456789',
    paper: '试卷1',
    rate: '90',
    dimension: '第一个维度',
    dimensionRate: '90',
    status: 'rejected',
    professorComment: '好好好好',
    rejectInfo: 'sjkdfjskd',
  },
];
export const checkDetailData: any[] = [
  {
    key: '1',
    org1: '四川省总办',
    org2: '成都总办',
    org3: '第一小学',
    name: '杨1',
    phone: '123456789',
    detail: 1,
    finishRate: 20,
    finishPerson: 10,
    checkingPerson: 5,
    toSubmitPerson: 3,
    rejectedPerson: 2,
    org1Result: 91,
    org2Result: 92,
    org3Result: 93,
    personResult: 90,
    paper: 1,
    result: 90,
  },
  {
    key: '2',
    org1: '四川省总办',
    org2: '成都总办',
    org3: '第一小学',
    name: '杨1',
    phone: '123456789',
    detail: 3,
    finishRate: 20,
    finishPerson: 10,
    checkingPerson: 5,
    toSubmitPerson: 3,
    rejectedPerson: 2,
    personResult: 90,
    paper: 2,
    result: 90,
  },
  {
    key: '3',
    org1: '四川省总办',
    org2: '成都总办',
    org3: '第一小学',
    name: '杨5',
    phone: '123456789',
    detail: 2,
    finishRate: 20,
    finishPerson: 10,
    checkingPerson: 5,
    toSubmitPerson: 3,
    rejectedPerson: 2,
    org1Result: 91,
    org2Result: 92,
    org3Result: 93,
  },
  {
    key: '4',
    org1: '四川省总办',
    org2: '成都总办',
    org3: '第二小学',
    name: '杨5',
    phone: '123456789',
    detail: 2,
    finishRate: 20,
    org1Result: 91,
    org2Result: 92,
    org3Result: 93,
  },
  {
    key: '5',
    org1: '四川省总办',
    org2: '绵阳总办',
    org3: '第一小学',
    name: '杨5',
    phone: '123456789',
    detail: 1,
    finishRate: 20,
    finishPerson: 10,
    org1Result: 91,
    org2Result: 92,
    org3Result: 93,
  },
  {
    key: '6',
    org1: '四川省总办',
    org2: '绵阳总办',
    org3: '第二小学',
    name: '杨5',
    phone: '123456789',
    detail: 1,
    finishRate: 20,
    finishPerson: 10,
    checkingPerson: 5,
    org1Result: 91,
    org2Result: 92,
    org3Result: 93,
  },
  {
    key: '7',
    org1: '陕西总办',
    org2: '西安总办',
    org3: '第一小学',
    name: '杨5',
    phone: '123456789',
    detail: 1,
    finishRate: 20,
    finishPerson: 10,
    checkingPerson: 5,
    toSubmitPerson: 3,
    org1Result: 91,
    org2Result: 92,
    org3Result: 93,
  },
];
// processStatus	int		提交状态 0：未提交 1: 已提交 2：驳回
export const toAllotTaskData = [
  {
    taskName: '小学教学计划资料收集1',
    orgName: '四川省教育总局1',
    staffName: '张三1',
    maxFillCount: 5,
    taskStatus: 0,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 2,
    processStatus: 0,
  },
  {
    taskName: '小学教学计划资料收集2',
    orgName: '四川省教育总局2',
    staffName: '张三2',
    maxFillCount: 0,
    taskStatus: 1,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 2,
    processStatus: 1,
  },
  {
    taskName: '小学教学计划资料收集3',
    orgName: '四川省教育总局2',
    staffName: '张三2',
    maxFillCount: 0,
    taskStatus: 2,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 1,
    processStatus: 2,
  },
];

export const collectDataSource = [
  {
    stage: '（一）试题征集',
    title: '小学教学计划资料收集1',
    orgName: '四川省教育总局1',
    staffName: '张三1',
    maxFillCount: 5,
    taskStatus: 0,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 2,
  },
  {
    stage: '（一）试题征集',
    title: '小学教学计划资料收集2',
    orgName: '四川省教育总局2',
    staffName: '张三2',
    maxFillCount: 0,
    taskStatus: 1,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 2,
  },
  {
    stage: '（一）试题征集',
    title: '小学教学计划资料收集3',
    orgName: '四川省教育总局2',
    staffName: '张三2',
    maxFillCount: 0,
    taskStatus: 2,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 1,
  },
  {
    stage: '（一）试题征集',
    title: '小学教学计划资料收集4',
    orgName: '四川省教育总局2',
    staffName: '张三2',
    maxFillCount: 0,
    taskStatus: 1,
    beginTimeFillEstimate: '2024-07-11 12:00:00',
    endTimeFillEstimate: '2024-08-18 12:00:00',
    endTimeFillActual: '2024-08-10 12:00:00',
    passPeople: 10,
    passCount: 40,
    fillPeople: 8,
    fillCount: 30,
    publishType: 1,
  },
];

export const checkDataSource = [
  [
    {
      stage: '（一）试题征集',
      title: '小学教学计划资料收集1',
      orgName: '四川省教育总局1',
      staffName: '张三1',
      maxFillCount: 5,
      taskStatus: 0,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 2,
    },
    {
      stage: '（二）专家评审',
      title: '小学教学计划资料收集1',
      orgName: '四川省教育总局1',
      staffName: '张三1',
      maxFillCount: 5,
      taskStatus: 0,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 2,
      passPercent: '30%',
      evaluateStatus: 0,
    },
  ],
  [
    {
      stage: '（一）试题征集',
      title: '小学教学计划资料收集2',
      orgName: '四川省教育总局2',
      staffName: '张三2',
      maxFillCount: 0,
      taskStatus: 1,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 2,
    },
    {
      stage: '（二）专家评审',
      title: '小学教学计划资料收集2',
      orgName: '四川省教育总局2',
      staffName: '张三2',
      maxFillCount: 0,
      taskStatus: 1,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 2,
      passPercent: '30%',
      evaluateStatus: 0,
    },
  ],
  [
    {
      stage: '（一）试题征集',
      title: '小学教学计划资料收集3',
      orgName: '四川省教育总局2',
      staffName: '张三2',
      maxFillCount: 0,
      taskStatus: 2,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 1,
    },
    {
      stage: '（二）专家评审',
      title: '小学教学计划资料收集3',
      orgName: '四川省教育总局2',
      staffName: '张三2',
      maxFillCount: 0,
      taskStatus: 2,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 1,
      passPercent: '30%',
      evaluateStatus: 2,
    },
  ],
  [
    {
      stage: '（一）试题征集',
      title: '小学教学计划资料收集4',
      orgName: '四川省教育总局2',
      staffName: '张三2',
      maxFillCount: 0,
      taskStatus: 1,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 1,
    },
    {
      stage: '（二）专家评审',
      title: '小学教学计划资料收集4',
      orgName: '四川省教育总局2',
      staffName: '张三2',
      maxFillCount: 0,
      taskStatus: 1,
      beginTimeFillEstimate: '2024-07-11 12:00:00',
      endTimeFillEstimate: '2024-08-18 12:00:00',
      endTimeFillActual: '2024-08-10 12:00:00',
      passPeople: 10,
      passCount: 40,
      fillPeople: 8,
      fillCount: 30,
      publishType: 1,
      passPercent: '30%',
      evaluateStatus: 0,
    },
  ],
];

export const testDataSource = [
  {
    key: '1',
    orgName: '天府新区第一小学',
    name: '杨1',
    num: '1',
    testPaperId: 12,
    reviewStatus: 0,
    score: 0,
    dimension: ['评价维度一', '评价维度二'],
    dimensionScore: [0, 0],
    comment: '',
    isShowInfo: true,
  },
  {
    key: '2',
    orgName: '天府新区第一小学',
    name: '杨2',
    num: '2',
    testPaperId: 12,
    reviewStatus: 1,
    score: 20,
    dimension: ['评价维度一', '评价维度二'],
    dimensionScore: [4, 3],
    comment: '这里是专家评价，评价试题征集中的试题',
    isShowInfo: true,
  },
  {
    key: '3',
    orgName: '天府新区第一小学',
    name: '杨3',
    num: '3',
    testPaperId: 12,
    reviewStatus: 2,
    score: 20,
    dimension: ['评价维度一', '评价维度二'],
    dimensionScore: [4, 3],
    comment: '这里是专家评价，评价试题征集中的试题',
    isShowInfo: true,
  },
  {
    key: '4',
    orgName: '天府新区第一小学',
    name: '杨4',
    num: '4',
    testPaperId: 12,
    reviewStatus: 4,
    score: 20,
    dimension: ['评价维度一', '评价维度二'],
    dimensionScore: [4, 3],
    comment: '这里是专家评价，评价试题征集中的试题',
    isShowInfo: true,
  },
  {
    key: '5',
    orgName: '天府新区第一小学',
    name: '杨5',
    num: '5',
    testPaperId: 12,
    reviewStatus: 1,
    score: 20,
    dimension: ['评价维度一', '评价维度二'],
    dimensionScore: [4, 3],
    comment: '这里是专家评价，评价试题征集中的试题',
    isShowInfo: false,
  },
];

export const treeData: TreeDataNode[][] = [
  [
    {
      title: '省**单位（已选3人）',
      key: 's',
      children: [
        {
          title: '杨118999999',
          key: '1',
        },
        {
          title: '杨218999999',
          key: '1',
        },
        {
          title: '杨318999999',
          key: '1',
        },
        {
          title: '杨418999999',
          key: '1',
        },
      ],
    },
  ],
  [
    {
      title: '市**单位（已选2人）',
      key: 's',
      children: [
        {
          title: '杨118999999',
          key: '1',
        },
        {
          title: '杨218999999',
          key: '1',
        },
        {
          title: '杨318999999',
          key: '1',
        },
        {
          title: '杨418999999',
          key: '1',
        },
      ],
    },
  ],
  [
    {
      title: '校**单位（已选6人）',
      key: 's',
      children: [
        {
          title: '杨118999999',
          key: '1',
        },
        {
          title: '杨218999999',
          key: '1',
        },
        {
          title: '杨318999999',
          key: '1',
        },
        {
          title: '杨418999999',
          key: '1',
        },
      ],
    },
  ],
];

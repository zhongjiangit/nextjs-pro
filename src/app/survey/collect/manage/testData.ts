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
// processStatus	int		提交状态 0：未提交 1: 已提交 2：驳回
export const collectDataSource = [
  {
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
];
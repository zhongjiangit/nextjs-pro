'use client';

import Api from '@/api';
import { useSurveyOrgStore } from '@/contexts/useSurveyOrgStore';
import { useSurveySystemStore } from '@/contexts/useSurveySystemStore';
import { formatTreeData } from '@/lib/format-tree-data';
import {
  ModalType,
  PublishTypeEnum,
  ZeroOrOneTypeEnum,
} from '@/types/CommonType';
import {
  ExclamationCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { useRequest } from 'ahooks';
import {
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Modal,
  Select,
  Tooltip,
  Tree,
  TreeSelect,
} from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { treeData } from '../../testData';
import { CustomTreeDataNode } from '@/components/common/custom-tree';
import {
  getSelectedNum,
  membersToNode,
  selectMember,
  updateTreeDataV2,
} from '@/app/(survey)/check/manage/modules/utils';
const { RangePicker } = DatePicker;

interface TaskDetailEditModalProps {
  linkName?: string;
  record: any;
  type: ModalType;
  refreshList: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const TaskDetailEditModal: React.FC<TaskDetailEditModalProps> = ({
  linkName,
  record,
  type,
  refreshList,
  open,
  setOpen,
}: TaskDetailEditModalProps) => {
  const [modal, contextHolder] = Modal.useModal();
  const [filterValue, setFilterValue] = useState<string[]>([]);
  const [form] = Form.useForm();
  const currentSystem = useSurveySystemStore(state => state.currentSystem);
  const currentOrg = useSurveyOrgStore(state => state.currentOrg);
  const [checkAll, setCheckAll] = useState(false);
  const [orgSelectedNum, setOrgSelectedNum] = useState<number>(0);
  const [staffSelectedNum, setStaffSelectedNum] = useState<number>(0);
  const [indeterminate, setIndeterminate] = useState(false);
  const [levelOrgs, setLevelOrgs] = useState<any[]>([]);
  const [levelOrgList, setLevelOrgList] = useState<any[]>([]);
  const [orgMembers, setOrgMembers] = useState<any>({});
  const [task, setTask] = useState<any>(null);
  const [member, setMember] = useState<any>([]);

  useMemo(() => {
    setLevelOrgList(levelOrgs.map(t => updateTreeDataV2(t, orgMembers)));
  }, [levelOrgs, orgMembers]);

  const { run: updateInspTaskFill } = useRequest(
    values => {
      return Api.updateInspTaskFill({
        ...values,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        form.resetFields();
        setOpen!(false);
        refreshList();
        setCheckAll(false);
      },
    }
  );

  const { data: orgMemberList, run: getStaffListByTags } = useRequest(
    () => {
      if (!currentSystem || !currentOrg) {
        return Promise.reject('No current system');
      }
      return Api.getStaffListByTags({
        currentSystemId: currentSystem.systemId,
        currentOrgId: currentOrg.orgId,
        orgId: currentOrg.orgId,
        tags: filterValue.map(item => ({
          key: Number(item),
        })),
      });
    },
    {
      manual: true,
      onSuccess: (data, params) => {
        console.log('getStaffListByTags', data, params);
        // // 将data.data以children为属性的levelOrgs对应的id为param[0]中
        // const newLevelOrgs = levelOrgs.map((level: any) =>
        //   level.map((org: any) => {
        //     console.log('org', org, params[0], org.key == params[0]);

        //     if (org.key == params[0]) {
        //       console.log('params', org);
        //       org.children = data.data.map(item => ({
        //         key: item.id,
        //         title: `${item.staffName}(${item.cellphone})`,
        //       }));
        //     }
        //     return org;
        //   })
        // );
        // setLevelOrgs(newLevelOrgs);
      },
    }
  );

  const { data: listLevelAssignSub, run: getListLevelAssignSub } = useRequest(
    (index: number, filterValue?: string[]) => {
      if (!currentSystem || !currentOrg) {
        return Promise.reject('No current system');
      }
      return Api.listLevelAssignSub({
        currentSystemId: currentSystem.systemId!,
        currentOrgId: currentOrg.orgId!,
        levelIndex: index || 1,
        tags: (filterValue || []).map(item => ({
          key: Number(item),
        })),
      });
    },
    {
      manual: true,
    }
  );

  const { run: getInspTaskFill } = useRequest(
    (taskId: number) => {
      if (!currentSystem || !currentOrg) {
        return Promise.reject('No current system');
      }
      return Api.getInspTaskFill({
        currentSystemId: currentSystem.systemId!,
        currentOrgId: currentOrg.orgId!,
        taskId: taskId,
      });
    },
    {
      manual: true,
      onSuccess: data => {
        const initValues = {
          levels: data.data.levels?.map(level => level.levelIndex),
          orgs: data.data.orgs?.map(org => org.orgId),
          timeFillEstimate: [
            dayjs(data.data.beginTimeFillEstimate, 'YYYY-MM-DD HH:mm'),
            dayjs(data.data.endTimeFillEstimate, 'YYYY-MM-DD HH:mm'),
          ],
        };
        // getListLevelAssignSub(initValues?.levels?.[1] ?? 1);
        form.setFieldsValue(initValues);
        setTask(data.data);
      },
    }
  );

  const { data: listVisibleLevels, run: getListVisibleLevels } = useRequest(
    () => {
      if (!currentSystem || !currentOrg) {
        return Promise.reject('No current system');
      }
      return Api.listVisibleLevels({
        currentSystemId: currentSystem.systemId!,
        currentOrgId: currentOrg.orgId!,
        // TODO orgId是什么？
        orgId: currentOrg.orgId!,
      });
    },
    {
      manual: true,
    }
  );

  const { data: tagList, run: getTagList } = useRequest(
    () => {
      if (!currentSystem || !currentOrg) {
        return Promise.reject('No current system');
      }
      return Api.getTagList({
        currentSystemId: currentSystem.systemId!,
        tagType: record.publishType,
      });
    },
    {
      manual: true,
    }
  );

  // 获取人员分配的所有单位
  const {
    data: listAllAssignSub,
    run: getListAllAssignSub,
    loading: allAssignSubLoading,
  } = useRequest(
    (filterValue: string[] = []) => {
      console.log('getListAllAssignSub');

      if (!currentSystem || !currentOrg) {
        return Promise.reject('No current system');
      }
      return Api.listAllAssignSub({
        currentSystemId: currentSystem.systemId!,
        currentOrgId: currentOrg.orgId!,
        staffTags: filterValue.map<{ key: number }>(item => ({
          key: Number(item),
        })),
      }).then(res => res.data);
    },
    {
      manual: true,
      onSuccess: data => {
        setLevelOrgs(
          data.map(level =>
            level.orgs.map(org => ({
              ...org,
              title: `${org.orgName} (共${org.staffCount}人)`,
              key: org.orgId,
              disableCheckbox: org.staffCount === 0,
              isLeaf: false,
            }))
          )
        );
      },
    }
  );

  useEffect(() => {
    if (!open) {
      return;
    }
    if (record.publishType === PublishTypeEnum.Org) {
      //
    }
    if (record.publishType === PublishTypeEnum.Member) {
      getListAllAssignSub();
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      getInspTaskFill(record.taskId);
      getListVisibleLevels();
      getTagList();
    }
    if (record.isLowest === ZeroOrOneTypeEnum.One) {
      getStaffListByTags();
    }
  }, [open]);

  const onCreate = (values: any) => {
    const createDate: any = {
      currentSystemId: currentSystem?.systemId!,
      currentOrgId: currentOrg?.orgId!,
      taskId: record.taskId,
      beginTimeFillEstimate:
        values.timeFillEstimate[0].format('YYYY-MM-DD HH:mm'),
      endTimeFillEstimate:
        values.timeFillEstimate[1].format('YYYY-MM-DD HH:mm'),
    };
    console.log(values);
    delete createDate.timeFillEstimate;
    if (
      record.publishType === PublishTypeEnum.Org &&
      task.isLowest !== ZeroOrOneTypeEnum.One
    ) {
      createDate.levels = values.levels?.map((item: string) => ({
        levelIndex: Number(item),
      }));
      createDate.orgs = values.orgs?.map((item: string) => ({
        orgId: Number(item),
      }));
    } else if (
      record.publishType === PublishTypeEnum.Org &&
      task.isLowest === ZeroOrOneTypeEnum.One
    ) {
      createDate.staffs = values.staffs?.map((item: string) => ({
        staffId: Number(item),
      }));
    } else if (record.publishType === PublishTypeEnum.Member) {
      createDate.staffs = member?.map((item: string) => ({
        staffId: Number(item),
      }));
      createDate.staffTags = filterValue?.map((item: string) => ({
        key: item,
      }));
    }
    updateInspTaskFill(createDate);
  };

  const plainOptions = useMemo(
    () => listLevelAssignSub?.data.map(item => item.orgId) || [],
    [listLevelAssignSub]
  );

  const onCheckAllChange = (e: any) => {
    form.setFieldValue('orgs', e.target.checked ? plainOptions : []);
    setCheckAll(e.target.checked);
  };

  const showConfirm = (nodes: any[]) => {
    const value = nodes.map(t => t.value);
    const onOk = () => {
      setFilterValue(value);
      setMember([]);
      setOrgMembers({});
      form.setFieldValue('orgs', []);
      if (record.publishType === PublishTypeEnum.Org) {
        getListLevelAssignSub(form.getFieldValue('levels')?.[0], value);
      }
      if (record.publishType === PublishTypeEnum.Member) {
        getListAllAssignSub(value);
      }
    };
    // 如果未选择就无需确认
    if (!member.length && !form.getFieldValue('orgs')?.length) {
      onOk();
      return;
    }
    // TODO 之前所选单位是不是为空，，不为空则需要确认。
    modal.confirm({
      title: '过滤条件确认',
      icon: <ExclamationCircleFilled />,
      content: <>改变过滤条件之后，之前的选择将会清空，确认改变过滤条件？</>,
      onOk() {
        onOk();
      },
    });
  };

  const getOrgMembers = async (key: number | string) => {
    orgMembers[key] = [];
    const res = await Api.getStaffListByTags({
      currentSystemId: currentSystem?.systemId,
      currentOrgId: currentOrg?.orgId,
      orgId: Number(key),
      tags: filterValue.map<{ key: number }>(item => ({ key: Number(item) })),
    });
    const members = membersToNode(res.data);
    setOrgMembers((t: any) => ({ ...t, [key]: members }));
    return members;
  };

  const onLoadMember = async (node: CustomTreeDataNode) => {
    const { key, children } = node;
    if (children) {
      return;
    }
    // Hack 防止重复加载
    node.children = [];
    return await getOrgMembers(key as number);
  };

  useEffect(() => {
    if (task && task.publishType === PublishTypeEnum.Member) {
      setMember(task.staffs.map((item: { staffId: number }) => item.staffId));
      const p = Promise.resolve();
      // 获取已选部门人员列表
      for (const orgId of [
        ...new Set<number>(
          task.staffs.map((item: { orgId: number }) => item.orgId)
        ),
      ]) {
        p.then(() => getOrgMembers(orgId));
      }
    }
    if (task && task.publishType === PublishTypeEnum.Org) {
      getListLevelAssignSub(task.levels?.[0]?.levelIndex, filterValue);
    }
  }, [task]);

  const onSelectMember = async (
    checkedKeys: any,
    { checked, node }: { checked: boolean; node: any }
  ) => {
    setMember(await selectMember(member, checked, node, getOrgMembers));
  };
  const titleRender = (nodeData: any) => {
    return nodeData.isLeaf
      ? nodeData.title
      : `${nodeData.orgName} (共${getSelectedNum(member, nodeData.children || [])}/${nodeData.staffCount}人)`;
  };

  const MemberSelect = (
    <div>
      <div className="w-full flex justify-start items-center">
        <span>人员标签过滤：</span>
        <div
          className="flex flex-1 justify-between items-center"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <TreeSelect
            style={{ width: '40%' }}
            onChange={showConfirm}
            treeData={formatTreeData([tagList?.data.tags])}
            treeCheckable={true}
            treeCheckStrictly={true}
            showCheckedStrategy={'SHOW_ALL'}
            placeholder="选择标签过滤人员"
          />
          <span
            style={{
              marginRight: '20px',
              color: 'red',
            }}
          >
            已选：{member.length}人
          </span>
        </div>
      </div>

      <Divider></Divider>
      <div
        key={filterValue.join(',')}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 40px 0 0',
        }}
      >
        {levelOrgList?.map((level: any, index: number) => (
          <div key={index} style={{ flex: 'auto', width: '0px' }}>
            <div className="font-bold">
              {listAllAssignSub?.[index]?.levelName}
            </div>
            <Tree
              treeData={level}
              checkedKeys={member}
              loadData={onLoadMember}
              checkable
              defaultExpandAll
              onCheck={onSelectMember}
              style={{ flexShrink: 1 }}
              titleRender={titleRender}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const OrgSelect = (
    <>
      <Form.Item
        name="levels"
        label="任务分配路径（任务下放经由层级）"
        dependencies={['publishType']}
        labelCol={{ span: 5 }}
        tooltip="分配第一个所选层级的参与单位"
        rules={[
          ({ getFieldValue }) => ({
            required: getFieldValue('publishType') === PublishTypeEnum.Org,
          }),
        ]}
      >
        <Checkbox.Group
          onChange={value => {
            getListLevelAssignSub(value[0], filterValue);
            form.setFieldValue('orgs', []);
          }}
          //listVisibleLevels剔除数组中的第一个元素
          options={
            listVisibleLevels?.data
              .filter((item, index) => index !== 0)
              .map(item => ({
                label: item.levelName,
                value: item.levelIndex,
              })) || []
          }
        ></Checkbox.Group>
      </Form.Item>
      <div className="flex items-center mx-16">
        <div className="flex flex-nowrap items-center gap-1 w-24">
          {' '}
          单位过滤{' '}
          <Tooltip placement="top" title={'分配第一个所选层级的参与单位：'}>
            <QuestionCircleOutlined className="cursor-pointer" />
          </Tooltip>{' '}
          <span>：</span>
        </div>
        <TreeSelect
          style={{ width: '40%' }}
          onChange={showConfirm}
          treeData={formatTreeData([tagList?.data.tags])}
          treeCheckable={true}
          treeCheckStrictly={true}
          showCheckedStrategy={'SHOW_ALL'}
        />
      </div>

      <div className="mr-5 text-blue-400 text-right">
        <Form.Item noStyle dependencies={['orgs']}>
          {() => {
            return `已选：${form.getFieldValue('orgs')?.length} 单位`;
          }}
        </Form.Item>
      </div>
      <Divider></Divider>
      <div className="px-16">
        <Form.Item noStyle dependencies={['orgs']}>
          {() => {
            if (!listLevelAssignSub?.data.length) {
              return null;
            }
            const checkedList = form.getFieldValue('orgs') || [];
            setOrgSelectedNum(checkedList.length);
            const indeterminate =
              !!checkedList.length &&
              checkedList.length < (plainOptions?.length || 0);
            const checkedAll = checkedList.length === plainOptions.length;
            return (
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkedAll}
              >
                全选
              </Checkbox>
            );
          }}
        </Form.Item>
        <Form.Item
          name="orgs"
          label=""
          rules={[{ required: true, message: '请选择单位' }]}
        >
          <Checkbox.Group
            onChange={checkedList => {
              setOrgSelectedNum(checkedList.length);
              setIndeterminate(
                !!checkedList.length &&
                  checkedList.length < (plainOptions?.length || 0)
              );
              setCheckAll(checkedList.length === plainOptions.length);
            }}
            options={listLevelAssignSub?.data.map(item => ({
              label: item.orgName,
              value: item.orgId,
            }))}
          ></Checkbox.Group>
        </Form.Item>
      </div>
    </>
  );

  const LastOrgSelect = (
    <>
      <div className="flex items-center mx-16">
        <div className="flex flex-nowrap items-center gap-1 w-24">
          {' '}
          人员过滤 <span>：</span>
        </div>
        <TreeSelect
          style={{ width: '40%' }}
          value={filterValue}
          onChange={showConfirm}
          treeData={formatTreeData([tagList?.data.tags])}
          treeCheckable={true}
          showCheckedStrategy={'SHOW_PARENT'}
        />
      </div>
      <div className="mr-5 text-blue-400 text-right">
        已选：{orgSelectedNum}人
      </div>
      <Divider></Divider>
      <div className="px-16">
        {!!listLevelAssignSub?.data.length && (
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            全选
          </Checkbox>
        )}
        <Form.Item
          name="staffs"
          label=""
          rules={[{ required: true, message: '请选择人员' }]}
        >
          <Checkbox.Group
            onChange={checkedList => {
              setStaffSelectedNum(checkedList.length);
              setIndeterminate(
                !!checkedList.length &&
                  checkedList.length < (orgMemberList?.data?.length || 0)
              );
              setCheckAll(checkedList.length === orgMemberList?.data.length);
            }}
            options={orgMemberList?.data.map(item => ({
              label: item.staffName + ' ' + item.cellphone,
              value: item.id,
            }))}
          ></Checkbox.Group>
        </Form.Item>
      </div>
    </>
  );

  return (
    <>
      <Modal
        width={1400}
        open={open}
        title={`${type}抽检任务`}
        okText="确定"
        cancelText="取消"
        okButtonProps={{
          autoFocus: true,
          onClick: () => form.submit(),
        }}
        onCancel={() => {
          setOpen!(false);
        }}
      >
        <Form
          form={form}
          name="form_new_task_modal"
          onFinish={values => onCreate(values)}
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  border: '1px',
                  width: '100%',
                }}
              >
                <div className="px-10">
                  <Form.Item
                    name="timeFillEstimate"
                    label="任务起止时间"
                    rules={[{ required: true }]}
                  >
                    <RangePicker
                      format="YYYY-MM-DD HH:mm"
                      showTime={{ format: 'HH:mm:ss' }}
                      style={{ width: '40%' }}
                    />
                  </Form.Item>
                </div>
                <Divider orientation="left">分配详情</Divider>
                <div style={{ marginLeft: '20px' }}>
                  {record.publishType === PublishTypeEnum.Org
                    ? !task
                      ? null
                      : task?.isLowest !== ZeroOrOneTypeEnum.One
                        ? OrgSelect
                        : LastOrgSelect
                    : MemberSelect}
                </div>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      {contextHolder}
    </>
  );
};

// export default TaskDetailEditModal;
const TaskDetailEditBtn: React.FC<TaskDetailEditModalProps> = ({
  linkName,
  record,
  type,
  refreshList,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <a
        className="text-blue-500"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {linkName || '修改'}
      </a>
      {open && (
        <TaskDetailEditModal
          key={record.taskId}
          record={record}
          type={type}
          refreshList={refreshList}
          linkName={linkName}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
};
export default TaskDetailEditBtn;

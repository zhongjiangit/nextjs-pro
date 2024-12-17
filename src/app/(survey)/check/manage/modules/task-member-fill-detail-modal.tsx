'use client';

import Api from '@/api';
import { useSurveyOrgStore } from '@/contexts/useSurveyOrgStore';
import { useSurveySystemStore } from '@/contexts/useSurveySystemStore';
import {
  TaskProcessStatusEnum,
  TaskProcessStatusObject,
  TaskProcessStatusType,
} from '@/types/CommonType';
import { useRequest } from 'ahooks';
import { Form, Input, message, Modal, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

interface Values {
  rejectComment: string;
}

interface TaskFillDetailModalProps {
  taskId: number | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  refreshList: () => void;
}

const TaskMemberFillDetailModal = ({
  taskId,
  open,
  setOpen,
  refreshList,
}: TaskFillDetailModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const currentSystem = useSurveySystemStore(state => state.currentSystem);
  const currentOrg = useSurveyOrgStore(state => state.currentOrg);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<any>();
  const [form] = Form.useForm();

  const {
    run: getFillProcessDetails,
    data: fillProcessDetailsList,
    refresh,
  } = useRequest(
    () => {
      if (!currentOrg?.orgId || !currentSystem?.systemId) {
        return Promise.reject('未获取到组织机构');
      } else if (!taskId) {
        return Promise.reject('未获取到任务信息');
      }
      return Api.getFillProcessDetails({
        currentSystemId: currentSystem.systemId,
        currentOrgId: currentOrg.orgId,
        pageNumber: 1,
        pageSize: 10,
        taskId,
      });
    },
    {
      manual: true,
    }
  );

  const { run: rejectFill } = useRequest(
    (values: Values) => {
      if (!currentSystem?.systemId || !currentOrg?.orgId || !taskId) {
        return Promise.reject('未获取到组织机构');
      }
      return Api.rejectFill({
        currentSystemId: currentSystem.systemId,
        currentOrgId: currentOrg.orgId,
        taskId,
        staffId: currentRecord?.staffId,
        rejectComment: values.rejectComment,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        messageApi.info('驳回成功');
        setRejectModalOpen(false);
        refresh();
      },
      onError: error => {
        messageApi.error(error.toString());
      },
    }
  );

  const columns: ColumnsType<any> = useMemo(
    () => [
      {
        title: '单位',
        dataIndex: 'org',
        key: 'org',
        width: '20%',
        render: (_: any, record: any) => {
          return (
            <div className="cursor-pointer">
              {/* TODO need to add org */}
              {/* <Popover content={record.org}>{record.org.split('/')[0]}</Popover> */}
            </div>
          );
        },
      },
      {
        title: '人员',
        dataIndex: 'member',
        key: 'member',
        align: 'center',
        // width: '30%',
        render: (_, record) => {
          return (
            <>
              {record.cellphone
                ? `${record.staffName}(${record.cellphone}) 资料提交：${record.fillCount}份`
                : '-'}
            </>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'processStatus',
        align: 'center',
        render: value => {
          return (
            <div>
              {TaskProcessStatusObject[value as TaskProcessStatusType] || value}
            </div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 200,
        align: 'center',
        render: (_: any, record: any) => {
          return (
            <Space className="flex justify-center items-center">
              {record.processStatus && (
                <a className=" text-blue-500">资料详情</a>
              )}
              {record.processStatus === TaskProcessStatusEnum.NeedSelfAudit && (
                <a
                  className=" text-blue-500"
                  onClick={() => {
                    if (taskId === undefined) {
                      return;
                    }
                    Api.approveFill({
                      currentSystemId: currentSystem!.systemId,
                      currentOrgId: currentOrg!.orgId,
                      taskId: taskId,
                      staffId: record.staffId,
                    }).then(() => {
                      messageApi.info('通过成功');
                      refresh();
                      refreshList();
                    });
                  }}
                >
                  通过
                </a>
              )}
              {record.processStatus === TaskProcessStatusEnum.NeedSelfAudit && (
                <a
                  className=" text-blue-500"
                  onClick={() => {
                    setRejectModalOpen(true);
                    setCurrentRecord(record);
                  }}
                >
                  驳回
                </a>
              )}
            </Space>
          );
        },
      },
    ],
    [currentOrg, currentSystem, messageApi, refresh, refreshList, taskId]
  );

  useEffect(() => {
    if (open) {
      getFillProcessDetails();
    }
  }, [getFillProcessDetails, open]);

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title={
          <div className="flex gap-5 items-center justify-between mb-3 pr-10">
            <h2 className="text-xl">任务详情</h2>
          </div>
        }
        width={1000}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
        }}
        maskClosable={false}
        footer={false}
      >
        <Table
          columns={columns}
          dataSource={fillProcessDetailsList?.data || []}
        />
      </Modal>
      <Modal
        open={rejectModalOpen}
        title="驳回信息"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setRejectModalOpen(false)}
        destroyOnClose
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            initialValues={{ modifier: 'public' }}
            clearOnDestroy
            onFinish={values => rejectFill(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="rejectComment"
          label="驳回原因"
          rules={[
            {
              required: true,
              message: '请输入驳回原因!',
            },
          ]}
        >
          <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
      </Modal>
    </>
  );
};

export default TaskMemberFillDetailModal;

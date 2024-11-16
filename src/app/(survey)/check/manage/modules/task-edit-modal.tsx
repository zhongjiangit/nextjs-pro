'use client';

import Api from '@/api';
import { EditInspTaskParamsType } from '@/api/task/editInspTask';
import { useSurveyOrgStore } from '@/contexts/useSurveyOrgStore';
import { useSurveySystemStore } from '@/contexts/useSurveySystemStore';
import { useRequest } from 'ahooks';
import { Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

interface TaskEditModalProps {
  task: any;
}

interface Values {
  taskName: string;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const currentSystem = useSurveySystemStore(state => state.currentSystem);
  const currentOrg = useSurveyOrgStore(state => state.currentOrg);

  console.log('task', task);

  useEffect(() => {
    form.setFieldsValue({
      taskName: task.taskName,
    });
  }, [task]);

  const { run: editInspTask, loading: submitLoading } = useRequest(
    (values: EditInspTaskParamsType) => {
      return Api.editInspTask({
        ...values,
      });
    },
    {
      manual: true,
      onSuccess: () => {
        setOpen(false);
        form.resetFields();
      },
    }
  );

  const onCreate = (values: Values) => {
    console.log('Received values of form: ', values);
    editInspTask({
      ...values,
      taskId: task.taskId,
      currentSystemId: currentSystem?.systemId!,
      currentOrgId: currentOrg?.orgId!,
    });
  };

  return (
    <>
      <a className="underline text-blue-500" onClick={() => setOpen(true)}>
        编辑
      </a>
      <Modal
        open={open}
        title="编辑抽检任务基本信息"
        okText="确定"
        cancelText="取消"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        confirmLoading={submitLoading}
        modalRender={dom => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            onFinish={values => onCreate(values)}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="taskName"
          label="抽检任务名称"
          rules={[
            {
              required: true,
              message: '抽检任务名称不能为空!',
            },
          ]}
        >
          <Input type="input" />
        </Form.Item>
      </Modal>
    </>
  );
};

export default TaskEditModal;

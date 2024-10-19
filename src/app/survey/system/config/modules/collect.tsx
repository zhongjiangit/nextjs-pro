'use client';

import { SystemListType } from '@/data/system/useSystemListAllSWR';
import useListOutlineSWR, {
  TemplateListResponse,
} from '@/data/temp/useListOutlineSWR';
import { TemplateTypeEnum, ZeroOrOneType } from '@/interfaces/CommonType';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import CreateModal from './create-modal';
import Api from '@/api';
import { useRequest } from 'ahooks';

interface CollectProps {
  system: SystemListType;
}

const Collect = ({ system }: CollectProps) => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');
  const selectedTab = searchParams.get('tab');
  const [currentTemplate, setCurrentTemplate] =
    useState<TemplateListResponse>();
  const [open, setOpen] = useState(false);

  const {
    run: getCollectList,
    data: collectList,
    loading,
  } = useRequest(() => {
    return Api.getTemplateOutlineList({
      currentSystemId: system.id,
      templateType: TemplateTypeEnum.Collect,
    });
  });

  const { run: createOutline, loading: submitLoading } = useRequest(
    params => {
      return Api.createTemplateOutline(params);
    },
    {
      manual: true,
      onSuccess: () => {
        getCollectList();
      },
    }
  );

  const copyCollectTemplate = (record: TemplateListResponse) => {
    createOutline({});
  };

  const columns = useMemo(
    () => [
      {
        title: '收集模板',
        dataIndex: 'templateTitle',
        key: 'collectList',
      },

      {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
      },
      {
        title: '启用状态',
        key: 'isValid',
        dataIndex: 'isValid',
        render: (value: ZeroOrOneType) => (
          <Tag color={value === 1 ? 'green' : 'geekblue'}>
            {value === 1 ? '启用' : '停用'}
          </Tag>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (_: any, record: TemplateListResponse) => (
          <Space size="middle">
            <Link
              href={`/survey/system/config/collect?id=${selectedId}&tab=${selectedTab}&tempId=${record.templateId}`}
            >
              详情
            </Link>
            <a
              onClick={() => {
                copyCollectTemplate(record);
              }}
            >
              复制
            </a>
            <a
              onClick={() => {
                setCurrentTemplate(record);
                setOpen(true);
              }}
            >
              编辑
            </a>
            <Popconfirm
              title="删除模版"
              description="删除后将不可恢复，您确定要删除此模版吗？"
              // onConfirm={confirm}
            >
              <a>删除</a>
            </Popconfirm>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <main className="relative">
      <Button
        type="primary"
        className="absolute -top-14 right-0"
        onClick={() => {
          setCurrentTemplate(undefined);
          setOpen(true);
        }}
      >
        新增数据收集
      </Button>
      <Table
        columns={columns}
        dataSource={collectList?.data || []}
        loading={loading}
      />
      <CreateModal
        type={selectedTab as 'spotCheck' | 'collect'}
        open={open}
        setOpen={setOpen}
        refreshList={getCollectList}
        initValues={
          currentTemplate
            ? {
                ...currentTemplate,
                currentSystemId: system.id,
                templateType: TemplateTypeEnum.Collect,
              }
            : undefined
        }
      />
    </main>
  );
};
export default Collect;

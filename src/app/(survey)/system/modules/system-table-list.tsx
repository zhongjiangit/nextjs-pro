'use client';

import Api from '@/api';
import { useSurveySystemStore } from '@/contexts/useSurveySystemStore';
import { SystemType } from '@/types/SystemType';
import { useRequest } from 'ahooks';
import type { TableProps } from 'antd';
import { Table, Tag } from 'antd';
import { useMemo } from 'react';
import { ConfigSystem, DeleteSystem, UpdateSystem } from './buttons';

export default function SystemsTableList({ query }: { query: string }) {
  const currentSystem = useSurveySystemStore(state => state.currentSystem);

  const {
    data: systemList,
    loading: isLoading,
    run: getSystemListAll,
  } = useRequest(
    () => {
      if (!currentSystem?.systemId) {
        return Promise.reject('currentSystem is not exist');
      }
      return Api.getSystemListAll({
        currentSystemId: currentSystem.systemId,
      });
    },
    {
      refreshDeps: [currentSystem?.systemId],
    }
  );

  const dataSources = useMemo(() => {
    if ((systemList?.data ?? []).length > 0) {
      const dataList = systemList?.data;
      const dataSources = (dataList ?? []).filter(
        ({ systemName }: { systemName: string }) =>
          systemName.toLowerCase().includes(query.toLowerCase())
      );
      return dataSources;
    }
    return [];
  }, [systemList?.data, query]);

  const { run: deleteSystem, loading: deleteLoading } = useRequest(
    params => {
      return Api.deleteSystem(params);
    },
    {
      manual: true,
      onSuccess: () => {
        getSystemListAll();
      },
    }
  );

  const columns: TableProps<SystemType>['columns'] = useMemo(
    () => [
      {
        title: '系统名称',
        dataIndex: 'systemName',
        key: 'systemName',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
      },
      {
        title: '层级',
        dataIndex: 'levelCount',
        key: 'levelCount',
      },
      {
        title: '各层级名称',
        key: 'levels',
        render: (_, { levels }) => (
          <div className="flex">
            {levels.map((level, index) => (
              <Tag key={index} color={index % 2 === 0 ? 'blue' : 'green'}>
                {level.levelName}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        title: '剩余次数/总次数',
        key: 'freeTimes',
        render: (_, { leftTimes, freeTimes }) => (
          <div>
            {leftTimes} / {freeTimes}
          </div>
        ),
      },
      {
        title: '账号有效期',
        dataIndex: 'validDate',
        key: 'validDate',
      },
      {
        title: '操作',
        key: 'action',
        render: (_, record) => (
          <div className="flex justify-start gap-3">
            <ConfigSystem id={record.id} />
            <UpdateSystem id={record.id} />
            <DeleteSystem id={record.id} deleteSystem={deleteSystem} />
          </div>
        ),
      },
    ],
    [deleteSystem]
  );

  return (
    <Table
      // @ts-ignore
      columns={columns}
      dataSource={dataSources}
      loading={isLoading || deleteLoading}
    />
  );
}

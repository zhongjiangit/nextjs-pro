'use client';

import Circle from '@/components/display/circle';
import { Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { checkDetailData } from '../testData';
import OrgResult from './modules/org-result';
import ProfessorResult from './modules/professor-result';
import { joinRowSpanData } from './utls/joinRowSpanData';

interface CheckDetailProps {}
interface DataType {
  [key: string]: any;
}
const joinRowSpanKey = ['org1', 'org2', 'org3', 'name'];

const CheckResult = () => {
  const [dataSource, setDataSource] = useState<any>();
  const columns: TableProps<DataType>['columns'] = [
    {
      title: (
        <>
          <div>第一层级单位</div>
          <div>平均分(点击查看详情)</div>
        </>
      ),
      dataIndex: 'org1',
      align: 'center',
      onCell: text => {
        return {
          rowSpan: text.rowSpan?.org1 || 0,
        };
      },
      render: (text, record) => (
        <>
          <div>{text}</div>
          <OrgResult
            buttonText={`${record.org1Result}分`}
            record={record}
          ></OrgResult>
        </>
      ),
    },
    {
      title: (
        <>
          <div>第二层级单位</div>
          <div>平均分(点击查看详情)</div>
        </>
      ),
      dataIndex: 'org2',
      align: 'center',
      onCell: text => ({
        rowSpan: text.rowSpan?.org2 || 0,
      }),
      render: (text, record) => (
        <>
          <div>{text}</div>
          <OrgResult
            buttonText={`${record.org2Result}分`}
            record={record}
          ></OrgResult>{' '}
        </>
      ),
    },
    {
      title: (
        <>
          <div>第三层级单位</div>
          <div>平均分(点击查看详情)</div>
        </>
      ),
      dataIndex: 'org3',
      align: 'center',
      onCell: text => ({
        rowSpan: text.rowSpan?.org3 || 0,
      }),
      render: (text, record) => (
        <>
          <div>{text}</div>
          <OrgResult
            buttonText={`${record.org3Result}分`}
            record={record}
          ></OrgResult>{' '}
        </>
      ),
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      render: (text, record) => (
        <>
          <div>{text}</div>
          <a className="text-blue-500">{record.phone}</a>
        </>
      ),
      onCell: text => ({
        rowSpan: text.rowSpan?.name || 0,
      }),
    },
    {
      title: (
        <>
          <div> 个人平均分</div>
          <div> (点击查看详情)</div>
        </>
      ),
      align: 'center',
      dataIndex: 'personResult',
      render: (text, record) =>
        text && (
          <ProfessorResult
            buttonText={`${text}分`}
            record={record}
          ></ProfessorResult>
        ),
      onCell: text => ({
        rowSpan: text.rowSpan?.name || 0,
      }),
    },
    {
      title: (
        <>
          <div> 试卷</div>
          <div> (点击查看详情)</div>
        </>
      ),
      align: 'center',
      dataIndex: 'paper',
      render: text =>
        text && (
          <div className="flex justify-center">
            <a>
              <Circle value={text} />
            </a>
          </div>
        ),
    },
    {
      title: '试卷得分',
      align: 'center',
      dataIndex: 'result',
      render: text => text && <a>{text} </a>,
    },
  ];

  useEffect(() => {
    setDataSource(
      joinRowSpanKey.reduce((prev: any[] | undefined, currentKey: string) => {
        return joinRowSpanData(prev, currentKey);
      }, checkDetailData)
    );

    return () => {
      setDataSource(undefined);
    };
  }, [checkDetailData]);

  return (
    <div>
      <Table<DataType> columns={columns} dataSource={dataSource} bordered />
    </div>
  );
};

export default CheckResult;

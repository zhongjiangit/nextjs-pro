import { CustomTreeDataNode } from '@/components/common/custom-tree';
import { ResponseObject } from '@/interfaces';
import { TagTypeType } from '@/interfaces/CommonType';
import request from '@/lib/request';
import useSWR from 'swr';

interface StaffListParamsType {
  currentSystemId?: number;
  currentOrgId?: number;
}

interface StaffListResponse {
  id: number;
  staffName: string;
  cellphone: string;
  staffType: number;
  tags: CustomTreeDataNode[];
}

export default function useTagListSWR(params: StaffListParamsType) {
  return useSWR(
    ['/api/staff/list', params],
    async ([url, params]) =>
      request.post<ResponseObject<StaffListResponse>>(url, params),
    {
      refreshInterval: 0,
    }
  );
}

import { CustomTreeDataNode } from '@/components/common/custom-tree';
import { ResponseObject } from '@/interfaces';
import { TagTypeType } from '@/interfaces/CommonType';
import request from '@/lib/request';
import useSWR from 'swr';

export interface TagListType {
  tags: CustomTreeDataNode;
}

export default function useTagListSWR(params: {
  currentSystemId?: number;
  tagType?: TagTypeType;
}) {
  return useSWR(['/api/org/get', params], async ([url, params]) =>
    request.post<ResponseObject<TagListType>>(url, params)
  );
}

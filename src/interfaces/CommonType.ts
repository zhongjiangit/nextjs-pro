// 返回 0 ｜ 1 的类型， 0 代表否，1 代表是
export type ZeroOrOne = 0 | 1;

export type RoleType = {
  key: string;
  isActive: boolean;
  label: string;
  name: string | boolean | undefined;
};

export type StaffType = 1 | 2 | 3; // 是单位成员，则有单位成员类型 1: 单位管理员 2: 普通管理员 3: 普通成员

// 列举1: 单位管理员 2: 普通管理员 3: 普通成员 的枚举类型
export enum StaffTypeEnum {
  UnitAdmin = 1,
  Admin = 2,
  Member = 3,
}

// 生成单位成员类型对象
export const StaffTypeObject = {
  [StaffTypeEnum.UnitAdmin]: '单位管理员',
  [StaffTypeEnum.Admin]: '普通管理员',
  [StaffTypeEnum.Member]: '普通成员',
};

export type TagTypeType = 1 | 2 | 3; // 标签类型 1: 单位标签 2：组织人员标签  3: 专家标签

import serves from './axios'

const service = serves();

// 获取首页数据以及Item
export const getFrontInfo = (body: any) => service.post("getFrontInfo",body);
// 获取博客列表（分页）
export const getBlogList = (body: any) => service.get("getBlogList",{params:body});
// 代码段
export const getMiniList = (body: any) => service.get("getMiniList",{params:body});
// 根据ID获取blog详情
export const getBlogDetailById = (body: any) => service.get("getBlogDetailById",{params:body});
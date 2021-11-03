import serves from './axios'

const service = serves();

// 获取首页数据以及Item
export const getFrontInfo = body => service.post("getFrontInfo",body);
// 获取博客列表（分页）
export const getBlogList = body => service.get("getBlogList",{params:body});
// 根据ID获取blog详情
export const getBlogDetailById = body => service.get("getBlogDetailById",{params:body});
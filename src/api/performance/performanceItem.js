import request from '~/utils/fetch'
/**
 * 绩效项
 *
 * id                     绩效项id
 * performanceName        绩效项名称
 * parentId               父级项id(无父级项0，有父级项则为父级项的id)
 * performanceScore       绩效项分数
 * performanceLimit	      申报上限
 * sonlist                子项集合
 */

/**
 *  获取该分类下的绩效项
 */
export function gainPerformanceItem(id) {
  return request({
    url: `/inside/inside/Bperformance/selectAllperformance/${id}`,
    method: 'get'
  })
}

/**
 * 模糊查询绩效项
 */
export function inquirePerformanceItem(data) {
  return request({
    url: '/inside/inside/Bperformance/selectSomePerformance',
    method: 'post',
    data
  })
}

/**
 * 添加绩效项
 */
export function addPerformanceItem(id, data) {
  return request({
    url: `/inside/inside/Bperformance/savePerformance/${id}`,
    method: 'post',
    data
  })
}

/**
 * 删除绩效项
 */
export function deletePerformanceItem(id) {
  return request({
    url: `/inside/inside/Bperformance/deletePerformance/${id}`,
    method: 'delete'
  })
}

/**
 * 编辑绩效项
 */
export function compilePerformanceItem(data) {
  return request({
    url: '/inside/inside/Bperformance/updatePerformance',
    method: 'put',
    data
  })
}

import request from '~/utils/fetch'

/**
 * 查询所有面试者
 * @returns
 */
export function SearchInterviewee() {
  return request({
    url: '/inside/inside/apply-message/search',
    method: 'get'
  })
}

/**
 * 模糊查询
 * @param {*} data
 * @returns
 */
export function FuzzySearch(data) {
  return request({
    url: '/inside/inside/apply-message/msearch',
    method: 'post',
    data
  })
}

/**
 * 根据用户id查询面试进度
 * @param {*} id
 * @returns
 */
export function SearchIntervieweeSchedule(id) {
  return request({
    url: `/inside/inside.insideInfo/step/getStepsId/${id}`,
    method: 'get'
  })
}

/**
 * 查询可以分配的面试官
 * @returns
 */
export function SearchAllInterviewer() {
  return request({
    url: '/inside/inside/Bdistribution/getUserInterview',
    method: 'get'
  })
}

/**
 * 更新步骤表
 * @param {*} data
 * @returns
 */
export function updateStep(data) {
  return request({
    url: '/inside/inside/step',
    method: 'put',
    data
  })
}

/**
 * 分配面试官
 * @param {*} data
 * @returns
 */
export function AllotInterviewee(data) {
  return request({
    url: '/inside/inside/Bdistribution',
    method: 'post',
    data
  })
}

/**
 * 根据面试者id查询当前所分配的面试官
 * @param {*} id
 * @returns
 */
export function SearchIntervieweeId(id) {
  return request({
    url: `/inside/inside/Bdistribution/${id}`,
    method: 'get'
  })
}

/**
 * 面试通过不通过
 * @param {*} id    步骤id
 * @param {*} applyId  面试者id
 * @param {*} status  状态
 * @returns
 */
export function InterviewJudgment(id, applyId, status) {
  return request({
    url: `/inside/inside/step/updateState/${id}/${applyId}/${status}`,
    method: 'put'
  })
}

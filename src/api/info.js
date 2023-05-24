import request from '~/utils/fetch'

/**
 * 查寻所有的离职人员
 */
export function searchQuit() {
  return request({
    url: '/inside/inside/Binfo/searchQuit',
    method: 'get'
  })
}

/**
 * 分页条件 查询个人信息
 */
export function searchData(data) {
  return request({
    url: '/inside/inside/Binfo/search',
    method: 'post',
    data
  })
}

/**
 * 根据id回显个人用户信息
 */
export function putData(id) {
  return request({
    url: `/inside/inside/Binfo/${id}`,
    method: 'get'
  })
}

// 修改用户数据

export function EditUserData(data) {
  return request({
    url: '/inside/inside/Binfo',
    method: 'put',
    data
  })
}

// 给用户分配合同
export function Distribution(userId, data) {
  return request({
    url: `/inside/inside/Binfo/contractPeople/${userId}`,
    method: 'post',
    data
  })
}

// 查看用户已分配合同的ids
export function SeeContract(userId) {
  return request({
    url: `/inside/inside/Binfo/contractPeople/${userId}/ids`,
    method: 'get'
  })
}

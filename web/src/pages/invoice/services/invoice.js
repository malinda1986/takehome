import { request, config } from 'utils'

const { api } = config
const { invoice } = api

export function upload (params) {
  return request({
    url: invoice + '/files',
    method: 'post',
    data: params,
  })
}

export function query (params) {
  return request({
    url: invoice,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return request({
    url: invoice.replace('/:id', ''),
    method: 'post',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: invoice,
    method: 'delete',
    data: params,
  })
}

export function update (params) {
  return request({
    url: invoice,
    method: 'patch',
    data: params,
  })
}

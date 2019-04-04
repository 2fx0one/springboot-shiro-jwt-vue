import request from '@/utils/request'

const get = (url, query) => request({
  url: url,
  method: 'get',
  params: query
})

const post = (url, data) => request({
  url: url,
  method: 'post',
  data
})

const put = (url, data) => request({
  url: url,
  method: 'put',
  data
})

const del = (url, data) => request({
  url: url,
  method: 'delete',
  data
})
//
// const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))
//
// const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))
//
// const del = (url, data) => request.delete(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))
//
export { get, post, put, del }

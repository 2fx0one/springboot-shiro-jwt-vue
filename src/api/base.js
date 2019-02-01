import request from '@/utils/request'

const get = (url, data) => request.get(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const post = (url, data) => request.post(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

const del = (url, data) => request.delete(url, data).then(res => res.status === 200 ? res.data : console.error(res)).catch(err => console.log(err))

export { get, post, del }

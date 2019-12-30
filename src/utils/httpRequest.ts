/**
 * Created by LiuLei on 2019/11/24
 */

function getError (action: any, option: any, xhr: XMLHttpRequest) {
  let msg
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to put ${action} ${xhr.status}`
  }

  const err: any = new Error(msg)
  err.status = xhr.status
  err.method = 'put'
  err.url = action
  return err
}

function getBody (xhr: XMLHttpRequest) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

// @ts-ignore
export default function upload (option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()
  const action = option.action
  debugger

  if (xhr.upload) {
    xhr.upload.onprogress = function progress (e: any) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key])
    })
  }

  formData.append(option.filename, option.file, option.file.name)

  xhr.onerror = function error (e) {
    option.onError(e)
  }

  xhr.onload = function onload () {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr))
    }

    option.onSuccess(getBody(xhr))
  }

  xhr.open('put', action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  for (const item in headers) {
    if (Reflect.has(headers, item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  xhr.send(formData)
  debugger
  return xhr
}

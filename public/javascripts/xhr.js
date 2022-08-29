export function xhr(url, method) {
  /* code */
  let [isLoading,
    data,
    error,
    started] = [false,
    false,
    null,
    false]
  function addListeners(xhr) {
    xhr.addEventListener('loadstart', (e)=> {
      started = true;
    });
    xhr.addEventListener('load', (e)=> {
      loaded = true
    });
    xhr.addEventListener('loadend', (e)=> {
      loadend = true
    })
    xhr.addEventListener('progress', (e)=> {
      loadedValue = e.loaded
      isLoading = true
    })
    xhr.addEventListener('error', (e)=> {
      error = {
        ...e
      }
    });
  }

  function runXHR(url, method) {
    const xhr = new XMLHttpRequest();
    addListeners(xhr);
    xhr.open(method, url);
    xhr.send();
    return xhr;
  }
runXHR(url,method)
return {
  isLoading,
  data,
  error
}
}
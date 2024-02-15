const getUrlParam = (url, name) => {
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ""
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

chrome.webNavigation.onBeforeNavigate.addListener((tabInfo) => {
  const tabId = tabInfo.tabId
  const originUrl = tabInfo.url
  const isLongmanSearch = /^https:\/\/www\.google\.com\/search\?q=longman\+/
  const isForvoSearch = /^https:\/\/www\.google\.com\/search\?q=forvo\+/

  const q = getUrlParam(originUrl, "q")

  if (isLongmanSearch.test(originUrl)) {
    const keyword = q.substring(8).split(" ").join("-")
    const url = `https://www.ldoceonline.com/dictionary/english-korean/${keyword}`

    chrome.tabs.update(tabId, { url })
  }

  if (isForvoSearch.test(originUrl)) {
    const keyword = q.substring(6)
    const url = `https://www.forvo.com/search/${keyword}`

    chrome.tabs.update(tabId, { url })
  }
})

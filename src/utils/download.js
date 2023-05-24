export const download = (link, fileName) => {
  if (!fileName) {
    fileName = link.slice(link.lastIndexOf('/') + 1)
  }
  const eleLink = document.createElement('a')
  eleLink.download = fileName
  eleLink.style.display = 'none'
  eleLink.href = link
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

import defaultSettings from '~/setting'

const title = defaultSettings.title

export default function getPageTitle(pageTitle) {
  // document.title = pageTitle;
  if (pageTitle) {
    return `${pageTitle}-${title}`
  }
  return `${title}`
}

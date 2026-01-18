// Create the context‑menu item once the service worker starts
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "search-wikipedia",
    title: "Search with Wikipedia",
    contexts: ["selection"]   // only show when text is selected
  });
});

// Handle the click on the menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "search-wikipedia" && info.selectionText) {
    const query = encodeURIComponent(info.selectionText.trim());
    const wikiUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${query}`;

    // Open the result in a new foreground tab
    chrome.tabs.create({ url: wikiUrl, active: true });
  }
});

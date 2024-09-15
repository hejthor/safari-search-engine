chrome.storage.sync.get('customSearchURL', (data) => {
    const customSearchURL = "https://www.perplexity.ai/search/?q=";

    chrome.webNavigation.onBeforeNavigate.addListener((details) => {
        const url = new URL(details.url);
        const query = url.searchParams.get("p") || url.searchParams.get("q");

        if (query) {
            let newURL = "";

            if (details.url.includes("google.com/search")) {
                newURL = customSearchURL + encodeURIComponent(query);
            } else if (details.url.includes("yahoo.com/search")) {
                newURL = customSearchURL + encodeURIComponent(query);
            } else if (details.url.includes("bing.com/search")) {
                newURL = customSearchURL + encodeURIComponent(query);
            } else if (details.url.includes("duckduckgo.com/")) {
                newURL = customSearchURL + encodeURIComponent(query);
            } else if (details.url.includes("ecosia.org/search")) {
                newURL = customSearchURL + encodeURIComponent(query);
            }

            if (newURL) {
                chrome.tabs.update(details.tabId, { url: newURL });
            }
        }
    }, { url: [{ hostContains: 'google.com' }, { hostContains: 'yahoo.com' }, { hostContains: 'bing.com' }, { hostContains: 'duckduckgo.com' }, { hostContains: 'ecosia.org' }] });
});

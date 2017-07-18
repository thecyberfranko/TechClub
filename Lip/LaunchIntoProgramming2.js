var tabLinks = [],
    contentDivs = [];
function init() {
    let tabElement = document.getElementById("tabs");
    let tabAnchors = tabElement.getElementsByTagName("a");
    let tabsAmount = tabAnchors.length;
    for (let i = 0; i < tabsAmount; ++i) {
        let Anchor = tabAnchors[i];
        let linkId = getHash(Anchor);
        let contentDiv = document.getElementById(linkId);
        Anchor.onclick = showTab;
        Anchor.onfocus = function() {this.blur};
        tabLinks[linkId] = Anchor;
        contentDivs[linkId] = contentDiv;
        // Only for the first element.
        if (i == 0) {
            Anchor.className = "selected";
        } else {
            contentDiv.className = "tabContent hide";
        }
    }
}
function showTab() {
    let selectedId = getHash(this);
    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for (let id in contentDivs) {
        if (id == selectedId) {
              tabLinks[id].className = "selected";
              contentDivs[id].className = "tabContent";
        } else {
            tabLinks[id].className = "";
            contentDivs[id].className = "tabContent hide";
        }
    }
    // Stop the browser following the link
    return false;
}
function getHash(Anchor) {
    let anchorHref = Anchor.getAttribute("href");
    return anchorHref.substring(anchorHref.lastIndexOf("#") + 1);
}

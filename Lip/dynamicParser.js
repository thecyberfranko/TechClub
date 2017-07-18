let TAB_CACHE = {};

function Tab(headingEl) {
    let listItem = document.createElement("li");
    listItem.innerHTML = headingEl.innerHTML;
    listItem.onclick = showTab;
    this.heading = listItem;
    let Content = headingEl.nextElementSibling;
    if (Content.nodeName == "div") {
        this.content = Content;
    }
    else {
        // Prevent inconsistant borders.
        let divEl = document.createElement("div");
        Content.parentElement.insertBefore(divEl, Content);
        divEl.appendChild(Content);
        this.content = divEl;
    }
    return this;
}

function showTab() {
    let containerId = this.parentElement.parentElement.id;
    let tabText = this.innerHTML;
    for (let key in TAB_CACHE[containerId]) {
        let tab = TAB_CACHE[containerId][key];
        if (tabText == key) {
            tab.heading.className = "selected"
            tab.content.className = "content";
        }
        else {
            tab.heading.className = ""
            tab.content.className = "hide";
        }
    }
}
function addTab(tab, id, tabListEl) {
    tab.content.className = "hide";  // Position for better clearity
    TAB_CACHE[id][tab.heading.innerHTML] = tab;
    tabListEl.appendChild(tab.heading);
}
function tabIt() {
    let tabContainer = document.getElementsByName("tabContainer");
    for (let containerEl of tabContainer) {
        let containerId = containerEl.id;
        let tabListEl =  document.createElement("ul");
        let tabHeadings = containerEl.getElementsByTagName(
            containerEl.firstElementChild.nodeName);
        let firstHeading = tabHeadings[0].innerHTML;
        TAB_CACHE[containerId] = {};
        while (tabHeadings.length) {
            let headingEl = tabHeadings[0];
            let tab = new Tab(headingEl);
            addTab(tab, containerId, tabListEl);
            containerEl.removeChild(headingEl);
        }
        let firstTab = TAB_CACHE[containerId][firstHeading];
        firstTab.heading.className = "selected";
        firstTab.content.className = "content";
        tabListEl.className = "tabs";
        containerEl.insertBefore(tabListEl, containerEl.firstChild);
    }
}

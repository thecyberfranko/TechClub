let TAB_MENUS = {};

function wrapInDiv(contentEl) {
    let wrapper = document.createElement('div');
    contentEl.parentNode.replaceChild(wrapper, contentEl);
    wrapper.appendChild(contentEl);
}

function showTab() {
    let containerId = this.parentElement.parentElement.id;
    let tabText = this.innerHTML;
    for (let key in TAB_MENUS[containerId]) {
        let tab = TAB_MENUS[containerId][key];
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

function Heading(headingEl) {
    let heading = document.createElement("li");
    heading.onclick = showTab;
    heading.innerHTML = headingEl.innerHTML;
    return heading;
}

function Content(contentEl) {
    let content = contentEl.nodeName == "DIV" ? contentEl : wrapInDiv(contentEl);
    return content;
}

function Tab(headingEl) {
    this.heading = new Heading(headingEl);
    this.content = new Content(headingEl.nextElementSibling);
    return this;
}

function TabMenu(containerEl) {
    let listEl =  document.createElement("ul");
    let tabHeadings = containerEl.getElementsByTagName(
        containerEl.firstElementChild.nodeName);
    let firstHeading = tabHeadings[0].innerHTML;  // Save for later.
    while (tabHeadings.length) {  // Removing elements after use.
        let headingEl = tabHeadings[0];
        let tab = new Tab(headingEl);
        this[tab.heading.innerHTML] = tab;
        listEl.appendChild(tab.heading);
        containerEl.removeChild(headingEl);
    }
    listEl.className = "tabs";
    containerEl.insertBefore(listEl, containerEl.firstChild);
    showTab.call(listEl.firstElementChild);
    return this;
}

function tabIt() {
    for (let containerEl of document.getElementsByName("tabMenu")) {
        console.log(containerEl.id);
        TAB_MENUS[containerEl.id] = new TabMenu(containerEl);
        showTab.call(containerEl.firstElementChild.firstElementChild);
    }
    console.table(TAB_MENUS);
}

function dynamIt() {
    tabIt();
}

/**
 * @fileOverview Panel manages the display panels.
 * @version 1.0
 * @author David
 */
panel = function() {
	// Access the display elements.
	var display = document.getElementById("display"),
		tabBar = document.getElementById("tabBar");
    // Utility function to clear child nodes from an element.
    function clearNodes(elem) {
        while (elem.childNodes.length > 0) {
            elem.removeChild(elem.firstChild);
        }
    }
	// Maintains the selected tab.
	var selectedTab = function() {
		var currentTab = null,
			currentPanel = null;
		function clearTheOld() {
			currentTab.classList.remove("current");
			currentPanel.classList.remove("current");
		}
		function setTheNew(tabNode, panelNode) {
			currentTab = tabNode;
			currentTab.classList.add("current");
			currentPanel = panelNode;
			currentPanel.classList.add("current");
		}
		return {
			setTab: function(tabNode, panelNode) {
				clearTheOld();
				setTheNew(tabNode, panelNode);
			},
			addTab: function(tabNode, panelNode) {
				if (!currentTab) {
					setTheNew(tabNode, panelNode);
					display.style.visibility = "visible";
				}
			}
		};
	}();
	// Add a panel to the display.
	function addPanel(name) {
		var newTab = document.createElement("button"),
			newPanel = document.createElement("div");
		newTab.appendChild(document.createTextNode(name));
		// Set the click handler for newTab.
		(function(thisPanel) {
			newTab.onclick = function() {
				selectedTab.setTab(this, thisPanel);
			}
		})(newPanel);
		tabBar.appendChild(newTab);
		newPanel.className = "panel";
		display.appendChild(newPanel);
		selectedTab.addTab(newTab, newPanel);
		// Return function to set content in newPanel.
		return function(content) {
			clearNodes(newPanel);
			newPanel.appendChild(content);
		};
	}
	// Return the function to add a panel.
	return function(name) {
		return addPanel(name);
	};
}();
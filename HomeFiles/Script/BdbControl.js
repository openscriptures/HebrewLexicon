/**
 * @fileOverview BDB Control manages the BDB documents.
 * @version 1.0
 * @author David
 */
bdbControl = function() {
	// Set up required variables.
	var xmlHandling = window.xmlHandling,
		panel = window.panel,
		bdbDoc, addContent, currentID, entryDoc, xslt,
		xsltProcessor = new XSLTProcessor();
	// Transforms and displays the entryDoc.
	function displayEntry() {
		var content = xsltProcessor.transformToFragment(entryDoc, document);
		addContent(content);
	}
    // Callback function for XML handling.
    function callXSLT() {
		xslt = this.responseXML;
		xsltProcessor.importStylesheet(xslt);
		displayEntry();
	}
	// Sets the XSLT style sheet for BDB entries.
	function setXSLT(entry) {
		entryDoc = xmlHandling.build("lexicon", entry);
		if (xslt) {
			displayEntry();
		} else {
			xmlHandling.load("Transform/BdbEntry.xslt", callXSLT);
		}
	}
	// Gets the entry specified by the currentID.
	function getEntry() {
		var entry = bdbDoc.getElementById(currentID);
		if (entry) {
			setXSLT(entry.cloneNode(true));
		} else {
			var content = document.createElement("p");
			content.appendChild(document.createTextNode("No entry found for this ID " + currentID));
			addContent(content);
		}
	}
    // Callback function for XML handling.
    function callBDB() {
		bdbDoc = this.responseXML;
		addContent = panel("Brown Driver Briggs");
		getEntry();
	}
	// Sets the XML book file to read.
	function setBDB(id) {
		currentID = id;
		if (bdbDoc) {
			getEntry();
		} else {
			xmlHandling.load("../BrownDriverBriggs.xml", callBDB);
		}
	}
	// Return public interface.
	return function(id) {
		setBDB(id);
	};
}();
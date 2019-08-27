/**
 * @fileOverview Strong Control manages the Strong documents.
 * @version 1.0
 * @author David
 */
strongControl = function() {
	// Set up required variables.
	var xmlHandling = window.xmlHandling,
		panel = window.panel,
		xmlDoc, addContent, currentID, entryDoc, xslt,
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
	// Sets the XSLT style sheet for Strong entries.
	function setXSLT(entry) {
		entryDoc = xmlHandling.build("lexicon", entry);
		if (xslt) {
			displayEntry();
		} else {
			xmlHandling.load("Transform/StrongEntry.xslt", callXSLT);
		}
	}
	// Gets the entry specified by the currentID.
	function getEntry() {
		var entry = xmlDoc.getElementById(currentID);
		if (entry) {
			setXSLT(entry.cloneNode(true));
		} else {
			var content = document.createElement("p");
			content.appendChild(document.createTextNode("No entry found for this ID " + currentID));
			addContent(content);
		}
	}
    // Callback function for XML handling.
    function callStrong() {
		xmlDoc = this.responseXML;
		addContent = panel("Strong’s Dictionary");
		getEntry();
	}
	// Sets the XML book file to read.
	function setStrong(id) {
		currentID = id ? "H" + id : id;
		if (xmlDoc) {
			getEntry();
		} else {
			xmlHandling.load("../HebrewStrong.xml", callStrong);
		}
	}
	// Return public interface.
	return function(id) {
		setStrong(id);
	};
}();
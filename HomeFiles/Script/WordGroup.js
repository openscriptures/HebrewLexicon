/**
 * @fileOverview Word Group manages the Lexical Index documents.
 * @version 1.0
 * @author David
 */
wordGroup = function() {
	// Set up required variables.
	var xmlHandling = window.xmlHandling,
		bdbControl = window.bdbControl,
		strongControl = window.strongControl,
		panel = window.panel,
		lexID = document.getElementById("lexID"),
		xmlDoc, addContent, currentID, entryDoc, xslt, isNew, augID,
		xsltProcessor = new XSLTProcessor();
/******************************************************************************
* Controlling BDB and Strong.
******************************************************************************/
	// Set the BDB and Strong IDs from the entry.
	function setXref(entry) {
		if (entry) {
			var xref = entry.getElementsByTagName("xref")[0];
			if (xref) {
				if (xref.hasAttribute("bdb")) {
					bdbControl(xref.getAttribute("bdb"));
				} else {
					bdbControl("");
				}
				if (xref.hasAttribute("strong")) {
					augID = xref.getAttribute("strong")
					strongControl(augID);
					lexID.value = xref.hasAttribute("aug") ? augID + xref.getAttribute("aug") : augID;
				} else {
					strongControl("");
					lexID.value = currentID;
				}
			}
		} else {
			bdbControl("");
			strongControl("");
			lexID.value = currentID;
		}
	};
/******************************************************************************
* Word Groups Handling.
******************************************************************************/
	// Transforms and displays the entryDoc.
	function displayEntry() {
		var content;
		// Add the parameter.
		xsltProcessor.setParameter(null, "selectedId", currentID);
		content = xsltProcessor.transformToFragment(entryDoc, document);
		addContent(content);
	}
    // Callback function for XML handling.
    function callXSLT() {
		xslt = this.responseXML;
		xsltProcessor.importStylesheet(xslt);
		displayEntry();
	}
	// Sets the XSLT style sheet for Strong entries.
	function setXSLT() {
		if (xslt) {
			displayEntry();
		} else {
			xmlHandling.load("Transform/WordGroup.xslt", callXSLT);
		}
	}
	// Gets the etymology of the entry.
	function getEtymology(entry) {
		var etym = entry.getElementsByTagName("etym")[0],
			entryType = "main", content = "";
		if (etym) {
			entryType = etym.hasAttribute("type") ? etym.getAttribute("type") : "main";
			content = etym.firstChild ? etym.firstChild.nodeValue : "";
		}
		return {type: entryType, ids: content};
	}
	// Constructs the XML document for the entry.
	function constructXML(entry) {
		var etym = getEtymology(entry), main = currentID;
		// Find the main entry & construct the word group.
		if (etym.type == "sub") {
			main = etym.ids;
			entry = xmlDoc.getElementById(main).cloneNode(true);
			etym = getEtymology(entry);
		}
		entryDoc = xmlHandling.build("index", entry);
		// Add the sun-entries.
		var node = entryDoc.documentElement,
			subs = etym.ids.split(", "), lim = subs.length, i;
		for (i = 0; i < lim; i++) {
			if (subs[i]) {
				node.appendChild(xmlDoc.getElementById(subs[i]).cloneNode(true));
			}
		}
		setXSLT();
	}
	// Gets the entry specified by the currentID.
	function getEntry() {
		var entry = xmlDoc.getElementById(currentID);
		if (entry) {
			// Get BDB & Strong IDs, and call control functions.
			entry = entry.cloneNode(true);
			setXref(entry)
			if (isNew) {constructXML(entry)};
		} else {
			setXref();
			var content = document.createElement("p");
			content.appendChild(document.createTextNode("No entry found for this ID " + currentID));
			addContent(content);
		}
	}
    // Callback function for XML handling.
    function callLI() {
		xmlDoc = this.responseXML;
		addContent = panel("Lexical Index");
		getEntry();
	}
	// Sets the XML book file to read.
	function setXML(id) {
		currentID = id;
		isNew = true;
		if (xmlDoc) {
			getEntry();
		} else {
			xmlHandling.load("../LexicalIndex.xml", callLI);
		}
	}
	// Return public interface.
	return {
		select: function(id) {
			// Click handler for word group radio buttons.
			currentID = id;
			isNew = false;
			getEntry();
		},
		set: function(id) {
			setXML(id);
		}
	};
}();
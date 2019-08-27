/**
 * @fileOverview XML Handling manages XML documents.
 * @version 1.0
 * @author David
 */
xmlHandling = function() {
    // Parses the XML string into a DOM document.
    function parseXmlString(xml) {
        if (window.DOMParser)
        {
            parser=new DOMParser();
            xmlDoc=parser.parseFromString(xml, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async=false;
            xmlDoc.loadXML(xml);
        }
        return xmlDoc;
    }
	// Loads the XML document.
    // From https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
    function xhrSuccess() {
        this.callback.apply(this, this.arguments);
    }
    function xhrError() {
        console.error(this.statusText);
    }
    function loadFile(sURL, fCallback /*, argumentToPass1, argumentToPass2, etc. */) {
      var oReq = new XMLHttpRequest();
      oReq.callback = fCallback;
      oReq.arguments = Array.prototype.slice.call(arguments, 2);
      oReq.onload = xhrSuccess;
      oReq.onerror = xhrError;
      oReq.open("get", sURL, true);
      oReq.send(null);
    }
	// Builds an XML document from a n XML element.
	function buildXMLDoc(name, node) {
		var xml = '<?xml version="1.0" encoding="UTF-8"?>';
		xml += '<' + name + ' xmlns="http://openscriptures.github.com/morphhb/namespace">';
		xml += '</' + name + '>';
		xmlDoc = parseXmlString(xml);
		xmlDoc.documentElement.appendChild(node);
		return xmlDoc;
	}
	// Return the public interface.
	return {
		load: function(filename, callback) {
			loadFile(filename, callback);
		},
		build: function (name, node) {
			return buildXMLDoc(name, node);
		}
	};
}();
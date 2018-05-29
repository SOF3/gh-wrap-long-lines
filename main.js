(function (document, location) {
    var prevUrl = "";
    var func = function () {
        if (prevUrl === location.pathname) { // ignore line highlighting
            return;
        }
        prevUrl = location.pathname;
        setTimeout(function () {
            var blob = document.getElementsByClassName("blob-wrapper")[0];
            if (blob === undefined) {
                return;
            }
            var blobWidth = (blob.clientWidth - document.getElementById("L1").clientWidth) * 0.85; // 85% to play safe
            var lineList = blob.getElementsByClassName("blob-code");
            var charWidth = (function () {
                for (var i = 0; i < lineList.length; ++i) {
                    var nodes = lineList[0].childNodes;
                    for (var j = 0; j < nodes.length; ++j) {
                        if (nodes[j] instanceof HTMLElement && nodes[j].innerText.length > 0) {
                            var node = nodes[j];
                            return node.getBoundingClientRect().width / node.innerText.length;
                        }
                    }
                }
                return NaN;
            })();
            if (isNaN(charWidth)) {
                return;
            }
            var currentLength;
            for (var i = 0; i < lineList.length; ++i) {
                currentLength = 0;
                breakLine(lineList[i]);
            }
            function breakLine(node) {
                if (node instanceof Text) {
                    var noTabsText = node.textContent.replace(/\t/g, "        ");
                    // actual number of spaces varies with .editorconfig, but let's assume it's 8 here, since we don't care getting too aggressive
                    if (currentLength + charWidth * noTabsText.length >= blobWidth) {
                        if (currentLength > 0) {
                            node.parentNode.insertBefore(document.createElement("br"), node);
                            currentLength = 0;
                        }
                        if (charWidth * noTabsText.length >= blobWidth) {
                            var text = node.textContent;
                            var tabsCount = text.length - text.replace(/\t/g, "").length; // assume all tabs are at the beginning
                            while (text.replace(/\t/g, "        ").length * charWidth >= blobWidth) {
                                var span_1 = document.createElement("span");
                                var cutLength = Math.floor(blobWidth / charWidth) - tabsCount * 7;
                                span_1.innerText = text.substr(0, cutLength);
                                text = text.substr(cutLength);
                                node.parentNode.insertBefore(span_1, node);
                                node.parentNode.insertBefore(document.createElement("br"), node);
                            }
                            var span = document.createElement("span");
                            span.innerText = text;
                            node.parentNode.replaceChild(span, node);
                        }
                        return true;
                    }
                    currentLength += charWidth * node.textContent.length;
                }
                else {
                    var children = [];
                    for (var i = 0; i < node.childNodes.length; ++i) {
                        children.push(node.childNodes[i]);
                    }
                    for (var i = 0; i < children.length; ++i) {
                        breakLine(children[i]);
                    }
                }
                return false;
            }
        }, 1000);
    };
    setInterval(func, 500);
})(document, location);

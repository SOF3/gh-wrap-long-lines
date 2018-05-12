(function (document) {
    var blob = document.getElementsByClassName("blob-wrapper")[0];
    if (blob === undefined) {
        return;
    }
    var blobWidth = blob.clientWidth * 0.85; // 85% to play safe
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
            if (currentLength + charWidth * node.textContent.length >= blobWidth) {
                if (currentLength > 0) {
                    node.parentNode.insertBefore(document.createElement("br"), node);
                    currentLength = 0;
                }
                if (charWidth * node.textContent.length >= blobWidth) {
                    var text = node.textContent;
                    while (text.length * charWidth >= blobWidth) {
                        var span_1 = document.createElement("span");
                        span_1.innerText = text.substr(0, Math.floor(blobWidth / charWidth));
                        text = text.substr(Math.floor(blobWidth / charWidth));
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
})(document);

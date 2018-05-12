((document: Document): void =>{
	const blob = document.getElementsByClassName("blob-wrapper")[0] as HTMLDivElement
	if(blob === undefined){
		return
	}
	const blobWidth = blob.clientWidth * 0.85 // 85% to play safe

	const lineList = blob.getElementsByClassName("blob-code")

	const charWidth = ((): number =>{
		for(let i = 0; i < lineList.length; ++i){
			const nodes = lineList[0].childNodes
			for(let j = 0; j < nodes.length; ++j){
				if(nodes[j] instanceof HTMLElement && (nodes[j] as HTMLElement).innerText.length > 0){
					const node = nodes[j] as HTMLElement
					return node.getBoundingClientRect().width / node.innerText.length
				}
			}
		}
		return NaN
	})()
	if(isNaN(charWidth)){
		return
	}

	let currentLength

	for(let i = 0; i < lineList.length; ++i){
		currentLength = 0
		breakLine(lineList[i] as HTMLTableCellElement)
	}

	function breakLine(node: Node): boolean{
		if(node instanceof Text){
			if(currentLength + charWidth * node.textContent.length >= blobWidth){
				if(currentLength > 0){
					node.parentNode.insertBefore(document.createElement("br"), node)
					currentLength = 0
				}
				if(charWidth * node.textContent.length >= blobWidth){
					let text = node.textContent

					while(text.length * charWidth >= blobWidth){
						const span = document.createElement("span")
						span.innerText = text.substr(0, Math.floor(blobWidth / charWidth))
						text = text.substr(Math.floor(blobWidth / charWidth))
						node.parentNode.insertBefore(span, node)
						node.parentNode.insertBefore(document.createElement("br"), node)
					}
					const span = document.createElement("span") as HTMLSpanElement
					span.innerText = text
					node.parentNode.replaceChild(span, node)
				}
				return true
			}
			currentLength += charWidth * node.textContent.length
		}else{
			const children = [] as Node[]
			for(let i = 0; i < node.childNodes.length; ++i){
				children.push(node.childNodes[i])
			}
			for(let i = 0; i < children.length; ++i){
				breakLine(children[i])
			}
		}

		return false
	}
})(document)

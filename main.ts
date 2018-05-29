((document: Document, location: Location): void =>{
	let prevUrl = ""

	const func = (): void =>{
		if(prevUrl === location.pathname){ // ignore line highlighting
			return
		}
		prevUrl = location.pathname

		setTimeout(() =>{
			const blob = document.getElementsByClassName("blob-wrapper")[0] as HTMLDivElement
			if(blob === undefined){
				return
			}
			const blobWidth = (blob.clientWidth - document.getElementById("L1").clientWidth) * 0.85 // 85% to play safe

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
					const noTabsText = node.textContent.replace(/\t/g, "        ")
					// actual number of spaces varies with .editorconfig, but let's assume it's 8 here, since we don't care getting too aggressive
					if(currentLength + charWidth * noTabsText.length >= blobWidth){
						if(currentLength > 0){
							node.parentNode.insertBefore(document.createElement("br"), node)
							currentLength = 0
						}
						if(charWidth * noTabsText.length >= blobWidth){
							let text = node.textContent
							const tabsCount = text.length - text.replace(/\t/g, "").length // assume all tabs are at the beginning

							while(text.replace(/\t/g, "        ").length * charWidth >= blobWidth){
								const span = document.createElement("span")
								const cutLength = Math.floor(blobWidth / charWidth) - tabsCount * 7
								span.innerText = text.substr(0, cutLength)
								text = text.substr(cutLength)
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
		}, 1000)
	}

	setInterval(func, 500)
})(document, location)

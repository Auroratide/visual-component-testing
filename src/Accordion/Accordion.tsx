import React from "react"
import { AccordionItem, AccordionItemProps } from "./AccordionItem"
import { AccordionProvider } from "./AccordionContext"
import C from "./Accordion.module.css"

export type AccordionProps = {
	children?:
		| React.ReactElement<AccordionItemProps>
		| React.ReactElement<AccordionItemProps>[]
}

export function Accordion({ children }: AccordionProps) {
	return (
		<AccordionProvider>
			<div className={C.accordion}>
				{children}
			</div>
		</AccordionProvider>
	)
}

Accordion.Item = AccordionItem

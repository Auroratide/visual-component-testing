import React, { useId } from "react"
import { useAccordion } from "./AccordionContext"

export type AccordionItemProps = {
	header: string,
	children?: React.ReactNode,
}

export function AccordionItem({ header, children }: AccordionItemProps) {
	const id = useId()
	const { open, setOpen } = useAccordion()

	const onClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setOpen(id)
	}

	return (
		<details open={open === id} onClick={onClick}>
			<summary>{header}</summary>
			<div>
				{children}
			</div>
		</details>
	)
}

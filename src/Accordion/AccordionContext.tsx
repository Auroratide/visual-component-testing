import { useState, createContext, useContext } from "react"

export type AccordionContext = {
	open: string,
	setOpen: (value: string) => void,
}

export const AccordionContext = createContext<AccordionContext>({
	open: "",
	setOpen: () => {},
})

export function useAccordion() {
	return useContext(AccordionContext)
}

export type AccordionProviderProps = {
	children?: React.ReactNode
}

export function AccordionProvider({ children }: AccordionProviderProps) {
	const [open, setOpen] = useState("")

	const closeIfAlreadyOpen = (value: string) => {
		setOpen((prev) => value === prev ? "" : value)
	}

	return (
		<AccordionContext.Provider value={{
			open,
			setOpen: closeIfAlreadyOpen,
		}}>
			{children}
		</AccordionContext.Provider>
	)
}
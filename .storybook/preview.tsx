import React from "react"
import type { Preview } from "@storybook/react"
import "@fontsource/urbanist"
import "../src/main.module.css"

export const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
}

export default preview

export const decorators = [
	(Story) => (
		<Story />
	),
]

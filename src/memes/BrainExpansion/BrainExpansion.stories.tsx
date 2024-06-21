import type { Meta, StoryFn } from "@storybook/react"
import { BrainExpansion } from "."

export default {
	component: BrainExpansion,
} satisfies Meta<typeof BrainExpansion>

export const Example: StoryFn = () => {
	return (
		<BrainExpansion
			level1="Meme Generator"
			level2="Screenshots of Figma"
			level3="A Javascript Frontend Testing Framework"
		/>
	)
}

import type { Meta, StoryFn } from "@storybook/react"
import { within, userEvent, expect } from "@storybook/test"
import { Accordion } from "."

export default {
	component: Accordion,
} satisfies Meta<typeof Accordion>

export const Example: StoryFn = () => {
	return (
		<Accordion>
			<Accordion.Item header="What is the eighth planet from the sun?">
				<p>Neptune!</p>
			</Accordion.Item>
			<Accordion.Item header="Which moon is the only moon with a substantial atmosphere?">
				<p>Titan, a moon of Saturn.</p>
			</Accordion.Item>
			<Accordion.Item header="What is the hottest planet in the solar system?">
				<p>Venus, over 850°F.</p>
			</Accordion.Item>
		</Accordion>
	)
}
Example.play = async ({ canvasElement, step }) => {
	const canvas = within(canvasElement)

	const planetDistanceQuestion = () => canvas.findByText(/what is the eighth/i)
	const planetDistanceAnswer = () => canvas.queryByText(/neptune/i)

	const moonQuestion = () => canvas.findByText(/which moon is the only moon/i)
	const moonAnswer = () => canvas.queryByText(/titan/i)

	const hottestQuestion = () => canvas.findByText(/what is the hottest planet/i)
	const hottestAnswer = () => canvas.queryByText(/venus/i)


	await step("Viewing the first item", async () => {
		await userEvent.click(await planetDistanceQuestion())

		expect(planetDistanceAnswer()).toBeVisible()
		expect(moonAnswer()).not.toBeVisible()
		expect(hottestAnswer()).not.toBeVisible()
	})

	await step("Viewing a second item", async () => {
		await userEvent.click(await moonQuestion())

		// the first item gets closed automatically
		expect(planetDistanceAnswer()).not.toBeVisible()
		expect(moonAnswer()).toBeVisible()
		expect(hottestAnswer()).not.toBeVisible()
	})

	await step("Viewing a third item", async () => {
		await userEvent.click(await hottestQuestion())

		expect(planetDistanceAnswer()).not.toBeVisible()
		expect(moonAnswer()).not.toBeVisible()
		expect(hottestAnswer()).toBeVisible()
	})
}

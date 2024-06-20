import { describe, test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Accordion } from "."

describe("Accordion", () => {
	test("opening and closing stuff", async () => {
		const user = userEvent.setup()

		render(
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

		const planetDistanceQuestion = () => screen.findByText(/what is the eighth/i)
		const planetDistanceAnswer = () => screen.queryByText(/neptune/i)

		const moonQuestion = () => screen.findByText(/which moon is the only moon/i)
		const moonAnswer = () => screen.queryByText(/titan/i)

		const hottestQuestion = () => screen.findByText(/what is the hottest planet/i)
		const hottestAnswer = () => screen.queryByText(/venus/i)

		// step 1
		await user.click(await planetDistanceQuestion())

		expect(planetDistanceAnswer()).toBeVisible()
		expect(moonAnswer()).not.toBeVisible()
		expect(hottestAnswer()).not.toBeVisible()

		// step 2
		await userEvent.click(await moonQuestion())

		// the first item gets closed automatically
		expect(planetDistanceAnswer()).not.toBeVisible()
		expect(moonAnswer()).toBeVisible()
		expect(hottestAnswer()).not.toBeVisible()

		// step 3
		await userEvent.click(await hottestQuestion())

		expect(planetDistanceAnswer()).not.toBeVisible()
		expect(moonAnswer()).not.toBeVisible()
		expect(hottestAnswer()).toBeVisible()
	})
})
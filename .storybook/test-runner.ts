import type { TestRunnerConfig } from "@storybook/test-runner"
import type { Page } from "@playwright/test"
import * as path from "node:path"
import { toMatchImageSnapshot } from "jest-image-snapshot"

const NO_SNAPSHOT = process.env.NO_SNAPSHOT === "true"

export default {
	tags: {
		exclude: ["skip"],
	},

	setup() {
		expect.extend({ toMatchImageSnapshot })
	},

	async postVisit(page, context) {
		if (!NO_SNAPSHOT) {
			await waitForAllImagesToLoad(page)
			const image = await waitForStableImage(1, page, context.id)

			expect(image).toMatchImageSnapshot({
				comparisonMethod: "ssim",
				failureThreshold: 0.01,
				failureThresholdType: "percent",
				customSnapshotsIdentifier: context.id,
				customDiffDir: path.resolve(
					".storybook",
					"testing",
					"snapshot-diffs",
					context.title,
				),
			})
		}
	},
} satisfies TestRunnerConfig

async function waitForAllImagesToLoad(page: Page) {
	const images = await page.locator("img").all()
	await Promise.allSettled(
		images.map((img) =>
			img.evaluate(
				(el: HTMLImageElement) =>
					el.complete || new Promise((res) => (el.onload = res)),
			),
		),
	)
}

async function waitForStableImage(seconds: number, page: Page, id: string) {
	const start = Date.now()
	let lastImage: Buffer | undefined
	while (Date.now() - start < seconds * 1000) {
		const image = await page.screenshot({
			fullPage: true,
			animations: "disabled",
		})

		if (lastImage != null && image.equals(lastImage)) {
			return image
		}
		lastImage = image

		await page.waitForTimeout(100)
	}

	console.warn(`[${id}] Image did not stabilize within ${seconds} seconds`)
	return lastImage
}
import image from "./brain-expansion.png"
import C from "./BrainExpansion.module.css"

export type BrainExpansionProps = {
	level1: string,
	level2: string,
	level3: string,
}

export function BrainExpansion({
	level1,
	level2,
	level3,
}: BrainExpansionProps) {
	return (
		<figure className={C["brain-expansion"]}>
			<img src={image} alt="Brain expansion meme" />
			<figcaption>
				<ol>
					<li>{level1}</li>
					<li>{level2}</li>
					<li>{level3}</li>
				</ol>
			</figcaption>
		</figure>
	)
}
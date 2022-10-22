import { useState, useEffect } from "react"
import { FaBeer } from "react-icons/fa"

export function DynamicIcon(c: { name: string }): JSX.Element {
	const [state, setState] = useState(false)
	const [icon, setIcon] = useState(<FaBeer />)

	useEffect(() => {
		if (!state) {
			fetch("/api/dynamicIcons", {
				method: 'POST',
				body: JSON.stringify(c),
			})
				.then((res) => res.json())
				.then((data) => {
					if (data && data.path && data.viewBox) {
						setIcon(
							<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox={data.viewBox} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
								<path d={data.path}></path>
							</svg>
						)
						setState(true)
					}
				})
		}

	})

	return icon
}
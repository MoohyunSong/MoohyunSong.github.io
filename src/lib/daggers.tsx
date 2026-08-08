import { Fragment, type ReactNode } from "react"

/** Renders `text` with every `†` marker as a slight superscript. */
export function withSupDaggers(text: string): ReactNode {
  if (!text.includes("†")) return text
  return text.split("†").map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <sup className="top-[-0.35em] text-[0.8em]">†</sup>}
      {part}
    </Fragment>
  ))
}

export const serializers = {
  marks: {
    strong: ({ children }) => {
      return (<strong>{children.text}</strong>)
    },
    internalLink: ({ mark, children }) => {
      const { reference } = mark
      const href = `/id/${reference._ref}`
      const text = children.length ? children[0] : children
      return <Link href={href}>{text}</Link>
    },
    link: ({ mark, children }) => {
      // console.log(children)
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = mark
      const text = children.length ? children[0] : children
      return blank ? (
        <Link href={href} isExternal>
          {text}
        </Link>
      ) : (
        <Link href={href}>{text}</Link>
      )
    },
  },
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
}

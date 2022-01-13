// lib/sanity.js
import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'
import { config } from './sanityConfig'
import Link from '../components/Link'

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config)

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {
    marks: {
      strong: ({ children }) => {
        return <strong>{children.text}</strong>
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
  },
})

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
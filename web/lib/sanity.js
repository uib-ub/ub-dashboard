// lib/sanity.js
import {
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'
import { PortableText as PortableTextComponent } from '@portabletext/react'
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
export const PortableText = (props) => <PortableTextComponent components={serializers} {...props} />

const serializers = {
  marks: {
    /*     strong: ({ children }) => {
          return <strong>{children.text}</strong>
        }, */
    internalLink: ({ value, children }) => {
      const { reference } = value
      const href = `/id/${reference._ref}`
      const text = children.length ? children[0] : children
      return <Link href={href}>{text}</Link>
    },
    link: ({ value, children }) => {
      // console.log(children)
      // Read https://css-tricks.com/use-target_blank/
      const { blank, href } = value
      const text = children.length ? children[0] : children
      return blank ? (
        <a href={href} target="_blank" rel='noreferrer'>
          {text}
        </a>
      ) : (
        <a href={href}>{text}</a>
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


// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
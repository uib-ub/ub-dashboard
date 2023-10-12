/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig, SanityDocument } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dashboardTool } from "@sanity/dashboard";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId, previewSecretId } from './sanity/env'

import Iframe, {
  defineUrlResolver,
  IframeOptions,
} from 'sanity-plugin-iframe-pane'
import { previewUrl } from 'sanity-plugin-iframe-pane/preview-url'

import { timespanInput } from '@seidhr/sanity-plugin-timespan-input'
import { codeInput } from '@sanity/code-input'
import { table } from '@sanity/table';
import { schema } from './sanity/schema'
import { deskStructure } from './sanity/deskStructure'
import { dashboardConfig } from './sanity/dashboard'
import { PREVIEWABLE_DOCUMENT_TYPES, PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS } from '@/schemas';

// Used to generate URLs for drafts and live previews
export const PREVIEW_BASE_URL = '/api/draft'

/* export const urlResolver = defineUrlResolver({
  base: PREVIEW_BASE_URL,
  requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
}) */

function getPreviewUrl(doc: SanityDocument) {
  return doc?._id
    ? `http://localhost:3002${PREVIEW_BASE_URL}?slug=${doc._id}`
    : `http://localhost:3002`
}

export const iframeOptions = {
  url: getPreviewUrl,
  urlSecretId: previewSecretId,
} satisfies IframeOptions

export default defineConfig({
  title: 'UB Dashboard',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    dashboardTool(dashboardConfig),
    deskTool({
      structure: deskStructure,
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      // You can add any React component to `S.view.component` and it will be rendered in the pane
      // and have access to content in the form in real-time.
      // It's part of the Studio's “Structure Builder API” and is documented here:
      // https://www.sanity.io/docs/structure-builder-reference
      defaultDocumentNode: (S, { schemaType }) => {
        if ((PREVIEWABLE_DOCUMENT_TYPES as string[]).includes(schemaType)) {
          return S.document().views([
            // Default form view
            S.view.form(),
            // Preview
            S.view.component(Iframe).options(iframeOptions).title('Preview'),
          ])
        }

        return null
      },
    }),
    previewUrl({
      base: PREVIEW_BASE_URL,
      requiresSlug: PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS,
      urlSecretId: previewSecretId,
      matchTypes: PREVIEWABLE_DOCUMENT_TYPES,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    timespanInput(),
    codeInput(),
    table(),
  ],
})

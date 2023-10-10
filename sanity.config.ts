/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { dashboardTool } from "@sanity/dashboard";
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './sanity/env'

import { timespanInput } from '@seidhr/sanity-plugin-timespan-input'
import { codeInput } from '@sanity/code-input'
import { table } from '@sanity/table';
import { schema } from './sanity/schema'
import { deskStructure } from './sanity/deskStructure'
import { dashboardConfig } from './sanity/dashboard'

export default defineConfig({
  title: 'UB Dashboard',
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    dashboardTool(dashboardConfig),
    deskTool(
      { structure: deskStructure, }
    ),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    timespanInput(),
    codeInput(),
    table(),
  ],
})

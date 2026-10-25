import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '@pages/canvas'

export const Route = createLazyFileRoute('/canvas')({
  component: Page
})

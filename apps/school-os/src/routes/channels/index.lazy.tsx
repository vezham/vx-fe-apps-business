import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '@pages/channels'

export const Route = createLazyFileRoute('/channels/')({
  component: Page
})

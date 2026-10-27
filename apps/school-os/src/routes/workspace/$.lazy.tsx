import { PageContent } from '@component/page-content'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/workspace/$')({
  component: PageContent
})

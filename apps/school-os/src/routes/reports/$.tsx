import {
  getDefaultDestination,
  getNavigationPage
} from '@component/section-navigation'
import { createFileRoute, redirect } from '@tanstack/react-router'

import Page from '@pages/reports'

export const Route = createFileRoute('/reports/$')({
  beforeLoad: ({ location }) => {
    const { page } = getNavigationPage('reports', location.pathname)
    if (page.children?.length)
      throw redirect({ to: getDefaultDestination(page), replace: true })
  },
  component: Page
})

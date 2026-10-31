import {
  getDefaultDestination,
  getNavigationPage
} from '@component/section-navigation'
import { createFileRoute, redirect } from '@tanstack/react-router'

import Page from '@pages/operations'

export const Route = createFileRoute('/operations/$')({
  beforeLoad: ({ location }) => {
    const { page } = getNavigationPage('operations', location.pathname)
    if (page.children?.length)
      throw redirect({ to: getDefaultDestination(page), replace: true })
  },
  component: Page
})

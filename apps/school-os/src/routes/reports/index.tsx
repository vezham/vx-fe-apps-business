import { getDefaultDestination } from '@component/section-navigation'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getNavigationChildren } from '@generated/navigation'

export const Route = createFileRoute('/reports/')({
  beforeLoad: () => {
    throw redirect({
      to: getDefaultDestination(getNavigationChildren('reports')[0])
    })
  }
})

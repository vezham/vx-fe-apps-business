import { getDefaultDestination } from '@component/section-navigation'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getNavigationChildren } from '@generated/navigation'

export const Route = createFileRoute('/academic/')({
  beforeLoad: () => {
    throw redirect({
      to: getDefaultDestination(getNavigationChildren('academic')[0])
    })
  }
})

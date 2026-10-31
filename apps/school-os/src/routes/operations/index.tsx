import { getDefaultDestination } from '@component/section-navigation'
import { createFileRoute, redirect } from '@tanstack/react-router'

import { getNavigationChildren } from '@generated/navigation'

export const Route = createFileRoute('/operations/')({
  beforeLoad: () => {
    throw redirect({
      to: getDefaultDestination(getNavigationChildren('operations')[0])
    })
  }
})

import { createFileRoute, redirect } from '@tanstack/react-router'

import { getNavigationChildren } from '@generated/navigation'

export const Route = createFileRoute('/tabs/')({
  beforeLoad: () => {
    throw redirect({ to: getNavigationChildren('tabs')[0].href })
  }
})

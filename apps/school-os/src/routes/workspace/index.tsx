import { createFileRoute, redirect } from '@tanstack/react-router'

import { getNavigationChildren } from '@generated/navigation'

export const Route = createFileRoute('/workspace/')({
  beforeLoad: () => {
    throw redirect({ to: getNavigationChildren('workspace')[0].href })
  }
})

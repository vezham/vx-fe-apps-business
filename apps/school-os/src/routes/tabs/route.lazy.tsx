import { AppSectionLayout } from '@component/app-section-layout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/tabs')({
  component: () => <AppSectionLayout menuKey="tabs" />
})

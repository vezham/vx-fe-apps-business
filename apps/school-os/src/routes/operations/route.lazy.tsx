import { AppSectionLayout } from '@component/app-section-layout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/operations')({
  component: () => <AppSectionLayout menuKey="operations" />
})

import { AppSectionLayout } from '@component/app-section-layout'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/academic')({
  component: () => <AppSectionLayout menuKey="academic" />
})

import { PageContent } from '@component/page-content'
import {
  getDefaultDestination,
  getNavigationPage
} from '@component/section-navigation'
import { createFileRoute, redirect } from '@tanstack/react-router'

import {
  getClassFilterSearch,
  getClassFiltersFromSearch
} from '@pages/academic/classes/all-classes/components/utils'

export const Route = createFileRoute('/academic/$')({
  validateSearch: (search: Record<string, unknown>) =>
    getClassFilterSearch(getClassFiltersFromSearch(search)),
  beforeLoad: ({ location }) => {
    const { page } = getNavigationPage('academic', location.pathname)
    if (page.key === 'timetable')
      throw redirect({
        to: '/academic/$',
        params: { _splat: 'timetable/week' },
        search: { code: undefined, name: undefined, status: undefined },
        replace: true
      })
    if (page.children?.length)
      throw redirect({ to: getDefaultDestination(page), replace: true })
  },
  component: PageContent
})

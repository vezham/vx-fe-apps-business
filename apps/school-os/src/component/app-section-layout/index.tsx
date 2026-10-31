import { Outlet, useChildMatches } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { getNavigationToolbar } from '@vezham/react'
import { toast } from '@vezham/react-v3'
import { SectionLayout } from '@vezham/react/layouts/section'
import {
  useToolbarAction,
  useToolbarActions
} from '@vezham/react/toolbar-actions'

import { navigationItems } from '@generated/navigation'

import { PageSearchContext } from '../page-search-context'
import { type MenuKey, getNavigationPage } from '../section-navigation'
import { getToolbarActions } from '../toolbar-actions'

type Props = { menuKey: MenuKey }

export const AppSectionLayout = ({ menuKey }: Props) => {
  // vx-bot/NOTE: Read the mounted child route, not a destination URL from a navigation in progress.
  const pathname = useChildMatches({
    select: matches =>
      [...matches]
        .reverse()
        .find(match => match.pathname.startsWith(`/${menuKey}/`))?.pathname
  })
  return pathname ? <AppSection menuKey={menuKey} pathname={pathname} /> : null
}

const AppSection = ({ menuKey, pathname }: Props & { pathname: string }) => {
  const { items, section, page, tabs } = getNavigationPage(menuKey, pathname)
  const menuTitle = navigationItems.find(item => item.key === menuKey)?.title

  const [search, setSearch] = useState('')
  const toolbar = getNavigationToolbar(navigationItems, pathname)
  const { emit } = useToolbarActions()
  const navigationActions = getToolbarActions(
    toolbar,
    { pageKey: page.key, pathname },
    emit
  )
  const actions =
    menuKey === 'academic'
      ? { ...navigationActions, filter: false, sort: false }
      : navigationActions
  useToolbarAction('sync', () => {
    // vx-bot/TODO: Replace this notice with server synchronization.
    toast.info('Server sync is not implemented yet.')
  })
  useToolbarAction('print', () => window.print())
  useToolbarAction('create', () => {
    toast.info('Create is not implemented on this page.')
  })

  const searchContext = useMemo(
    () => ({ query: search, setQuery: setSearch }),
    [search, setSearch]
  )

  return (
    <PageSearchContext.Provider value={searchContext}>
      <SectionLayout
        sectionKey={section.key}
        title={section.title}
        navigationLabel={`${menuTitle} sections`}
        sidebarItems={items}
        tabs={tabs}
        {...actions}
        onSync={() => {
          emit({ actionKey: 'sync', pageKey: page.key, pathname })
        }}
        search={
          toolbar.search
            ? {
                ...toolbar.search,
                value: search,
                onChange: setSearch
              }
            : undefined
        }>
        <Outlet />
      </SectionLayout>
    </PageSearchContext.Provider>
  )
}

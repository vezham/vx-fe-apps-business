import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { vi } from 'vitest'

import { createRouter } from '@vezham/start/router/tanstack'

import { vxI18n } from '../src/generated/vx'
import { routeTree } from '../src/routeTree.gen'

const renderApp = async (path = '/') => {
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [path]
    }),
    routeTree
  })

  await router.load()
  return { ...render(<RouterProvider router={router} />), router }
}

describe('App', () => {
  afterEach(() => vi.restoreAllMocks())

  beforeAll(() => {
    Element.prototype.getAnimations = () => []
  })

  it('uses the configured default language for the document', async () => {
    await renderApp()

    await waitFor(() =>
      expect(document.documentElement.lang).toBe(vxI18n.defaultLanguage)
    )
  })

  it('should render successfully', async () => {
    const { baseElement } = await renderApp()

    await waitFor(() => expect(baseElement).toBeTruthy())
  })

  it('should mount app shell container', async () => {
    const { baseElement } = await renderApp()

    await waitFor(() =>
      expect(baseElement.querySelector('.vx-app')).toBeTruthy()
    )
  })

  it('keeps the info panel mounted when navigating to an unknown page and back', async () => {
    window.localStorage.setItem(
      'vx-app:info-panel',
      JSON.stringify({ activeInfoPanel: 'bookmarks', isOpen: true })
    )
    const { baseElement, router } = await renderApp(
      '/academic/classes/allclasses'
    )
    await screen.findByRole('tab', { name: 'All Classes' })
    const panel = baseElement.querySelector('[data-vx="info-panel"]')
    expect(panel).toBeTruthy()

    await act(() => router.navigate({ to: '/missing-page' }))
    expect(router.state.location.pathname).toBe('/missing-page')
    expect(baseElement.querySelector('[data-vx="info-panel"]')).toBe(panel)

    await act(() => router.navigate({ to: '/academic/classes/allclasses' }))
    await screen.findByRole('tab', { name: 'All Classes' })
    expect(baseElement.querySelector('[data-vx="info-panel"]')).toBe(panel)
    window.localStorage.removeItem('vx-app:info-panel')
  })

  it('opens Operations and navigates between groups and standalone pages', async () => {
    const { router } = await renderApp('/operations')
    const sidebar = await screen.findByRole('navigation', {
      name: 'Operations sections'
    })
    const feesGroup = await within(sidebar).findByRole('link', {
      name: 'Fees Group'
    })
    expect(feesGroup).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('tablist')).toBeNull()
    expect(router.state.location.pathname).toBe('/operations/fees/fees-group')

    fireEvent.click(within(sidebar).getByRole('link', { name: 'Fees Type' }))
    await screen.findByText('/operations/fees/fees-type')

    fireEvent.click(within(sidebar).getByRole('button', { name: 'Library' }))
    fireEvent.click(
      within(sidebar).getByRole('link', { name: 'Library Members' })
    )
    await screen.findByText('/operations/library/members')
    expect(
      within(sidebar).getByRole('link', { name: 'Library Members' })
    ).toHaveAttribute('aria-current', 'page')
    expect(router.state.location.pathname).toBe('/operations/library/members')

    fireEvent.click(within(sidebar).getByRole('button', { name: 'Transport' }))
    fireEvent.click(within(sidebar).getByRole('link', { name: 'Vehicles' }))
    await screen.findByText('/operations/transport/vehicles')
    expect(router.state.location.pathname).toBe(
      '/operations/transport/vehicles'
    )

    fireEvent.click(within(sidebar).getByRole('link', { name: 'Sports' }))
    await screen.findByText('/operations/sports')
    expect(router.state.location.pathname).toBe('/operations/sports')
    expect(screen.queryByRole('tablist')).toBeNull()
  })

  it('opens Reports and navigates between attendance sidebar pages and standalone reports', async () => {
    const { router } = await renderApp('/reports')
    const sidebar = await screen.findByRole('navigation', {
      name: 'Reports sections'
    })
    const attendance = await within(sidebar).findByRole('link', {
      name: 'Attendance Report'
    })
    expect(attendance).toHaveAttribute('aria-current', 'page')
    expect(screen.queryByRole('tablist')).toBeNull()
    expect(router.state.location.pathname).toBe(
      '/reports/attendance/attendance-report'
    )

    fireEvent.click(
      within(sidebar).getByRole('link', { name: 'Daily Attendance' })
    )
    await screen.findByText('/reports/attendance/daily-attendance')

    fireEvent.click(
      within(sidebar).getByRole('link', { name: 'Class Reports' })
    )
    await screen.findByText('/reports/class')
    expect(router.state.location.pathname).toBe('/reports/class')
    expect(screen.queryByRole('tablist')).toBeNull()

    await act(() =>
      router.navigate({ to: '/reports/$', params: { _splat: 'attendance' } })
    )
    await screen.findByText('/reports/attendance/attendance-report')
  })

  it('keeps navigation collapsed while changing child routes', async () => {
    const matchMedia = window.matchMedia.bind(window)
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
      ...matchMedia(query),
      matches: query === '(min-width: 768px)'
    }))
    await renderApp('/operations/hostel/hostel-list')
    await screen.findByRole('navigation', { name: 'Operations sections' })
    const hideSidebar = screen
      .getAllByRole('button', { name: 'Hide Sidebar' })
      .find(button => button.hasAttribute('aria-controls'))
    if (!hideSidebar) throw new Error('Hide Sidebar control was not found')
    fireEvent.click(hideSidebar)
    expect(
      screen.queryByRole('navigation', { name: 'Operations sections' })
    ).toBeNull()
    fireEvent.click(screen.getByRole('tab', { name: 'Hostel Room' }))
    await waitFor(() =>
      expect(screen.getByRole('tabpanel').textContent).toContain(
        '/operations/hostel/hostel-room'
      )
    )
    expect(
      screen.queryByRole('navigation', { name: 'Operations sections' })
    ).toBeNull()
    fireEvent.keyDown(document.body, { key: 's', code: 'KeyS', metaKey: true })
    fireEvent.keyUp(document.body, { key: 's', code: 'KeyS', metaKey: true })
    expect(
      screen.getByRole('navigation', { name: 'Operations sections' })
    ).toBeTruthy()
  })

  it('opens section navigation in a drawer and closes it after selecting a section', async () => {
    const matchMedia = window.matchMedia.bind(window)
    vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
      ...matchMedia(query),
      matches: query === '(max-width: 767px)'
    }))
    await renderApp('/operations/hostel/hostel-list')
    const bubble = await screen.findByRole('group', {
      name: 'Mobile navigation controls'
    })
    fireEvent.click(
      await within(bubble).findByRole('button', { name: 'Show Sidebar' })
    )
    const drawer = await screen.findByRole('dialog', {
      name: 'Hostel'
    })
    fireEvent.click(within(drawer).getByRole('link', { name: 'Sports' }))
    await screen.findByText('/operations/sports')
    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'Hostel' })).toBeNull()
    )
  })
})

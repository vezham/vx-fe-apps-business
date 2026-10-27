import { Tabs } from '@vezham/react-v3'

export type DetailTab = {
  id: string
  label: string
}

type Props = {
  ariaLabel: string
  idPrefix: string
  selectedKey: string
  tabs: readonly DetailTab[]
  onSelectionChange: (key: string) => void
}

export const getDetailTabId = (idPrefix: string, key: string) =>
  `${idPrefix}-${key}-tab`

export const DetailTabs = ({
  ariaLabel,
  idPrefix,
  selectedKey,
  tabs,
  onSelectionChange
}: Props) => {
  const selectedTabId = getDetailTabId(idPrefix, selectedKey)

  return (
    <Tabs
      className="min-w-0 flex-1"
      selectedKey={selectedTabId}
      variant="primary"
      onSelectionChange={key => {
        const selectedId = String(key)
        const selectedTab = tabs.find(
          tab => getDetailTabId(idPrefix, tab.id) === selectedId
        )

        if (selectedTab) onSelectionChange(selectedTab.id)
      }}>
      <Tabs.ListContainer>
        <Tabs.List aria-label={ariaLabel}>
          {tabs.map((tab, index) => (
            <Tabs.Tab key={tab.id} id={getDetailTabId(idPrefix, tab.id)}>
              {index > 0 && <Tabs.Separator />}
              {tab.label}
              <Tabs.Indicator />
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  )
}

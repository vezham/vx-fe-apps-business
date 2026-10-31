import { Sheet } from '@vezham/react-pro-v3'
import { SearchField } from '@vezham/react-v3'

type Props = {
  isOpen: boolean
  label: string
  onOpenChange: (isOpen: boolean) => void
  onQueryChange: (query: string) => void
  placeholder?: string
  query: string
}

export const PageSearchSheet = ({
  isOpen,
  label,
  onOpenChange,
  onQueryChange,
  placeholder = 'Search',
  query
}: Props) => (
  <Sheet
    isOpen={isOpen}
    placement="bottom"
    isHandleOnly
    shouldAutoFocus
    onOpenChange={onOpenChange}>
    <Sheet.Backdrop
      variant="blur"
      className="bg-overlay/10 z-80 backdrop-blur-xs">
      <Sheet.Content className="mx-auto w-full max-w-2xl">
        <Sheet.Dialog className="rounded-t-[1.75rem]">
          <Sheet.Handle />
          <Sheet.Header className="pr-12">
            <Sheet.Heading>{label}</Sheet.Heading>
            <Sheet.CloseTrigger aria-label={`Close ${label.toLowerCase()}`} />
          </Sheet.Header>
          <Sheet.Body className="pb-[max(2rem,env(safe-area-inset-bottom))]">
            <SearchField
              aria-label={label}
              fullWidth
              value={query}
              onChange={onQueryChange}
              onSubmit={() => onOpenChange(false)}>
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder={placeholder} />
                <SearchField.ClearButton
                  aria-label={`Clear ${label.toLowerCase()}`}
                />
              </SearchField.Group>
            </SearchField>
          </Sheet.Body>
        </Sheet.Dialog>
      </Sheet.Content>
    </Sheet.Backdrop>
  </Sheet>
)

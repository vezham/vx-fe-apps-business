import { Switch } from '@vezham/react-v3'

export const StatusSwitchContent = () => (
  <Switch.Content className="flex w-full items-center justify-between gap-4">
    <span className="flex flex-col gap-1">
      <span className="font-medium">Status</span>
      <span className="text-muted text-sm">Change the status by toggle</span>
    </span>
    <Switch.Control>
      <Switch.Thumb />
    </Switch.Control>
  </Switch.Content>
)

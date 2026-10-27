import type { ComponentProps, ReactNode } from 'react'

import { Drawer } from '@vezham/react-v3'

export const RecordDrawerFrame = ({
  state,
  className,
  children
}: {
  state: ComponentProps<typeof Drawer>['state']
  className: string
  children: ReactNode
}) => (
  <Drawer state={state}>
    <Drawer.Backdrop variant="transparent">
      <Drawer.Content placement="right">
        <Drawer.Dialog className={className}>{children}</Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  </Drawer>
)

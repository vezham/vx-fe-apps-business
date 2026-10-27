import { usePageSearch } from '@component/page-search-context'

import type { AcademicRecord } from './entity-configs'
import { AcademicEntityPage } from './entity-page'
import type { AcademicEntityConfig } from './entity-page'

type Props = {
  config: AcademicEntityConfig<AcademicRecord, string>
}

export const AcademicConfigPage = ({ config }: Props) => {
  const { query } = usePageSearch()
  return <AcademicEntityPage config={config} searchQuery={query} />
}

import { usePageSearch } from '@component/page-search-context'
import { AcademicEntityPage } from '@shared/entity-page'

import { classroomConfig } from './config'

const ClassroomPage = () => {
  const { query } = usePageSearch()

  return <AcademicEntityPage config={classroomConfig} searchQuery={query} />
}

export default ClassroomPage

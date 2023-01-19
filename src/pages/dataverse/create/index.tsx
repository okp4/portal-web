import type { NextPage } from 'next'
import { CreateIntroduction, PreviousPageButton } from '../../../components'

const Create: NextPage = () => {

  return (
    <div className="okp4-create-main">
      <div className="okp4-create-page-introduction">
        <CreateIntroduction />
        <div className="okp4-create-return-button">
          <PreviousPageButton variant="round" />
        </div>
      </div>
    </div>
  )
}

export default Create

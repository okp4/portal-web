import { Button, Icon, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { useCallback } from 'react'

export const PreviousPageButton = (): JSX.Element => {
  const router: NextRouter = useRouter()
  const { t }: UseTranslationResponse = useTranslation()

  const handlePreviousPageClick = useCallback((): void => {
    router.back()
  }, [router])

  return (
    <div className="okp4-previous-page-button">
      <Button
        label={t('dataset:back')}
        leftIcon={<Icon name="arrow-left" size={22} />}
        onClick={handlePreviousPageClick}
      />
    </div>
  )
}

export default PreviousPageButton

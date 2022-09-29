import { Button, Icon, useTranslation } from '@okp4/ui'
import type { UseTranslationResponse } from '@okp4/ui'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { useCallback } from 'react'

export const GoToPreviousPage = (): JSX.Element => {
  const router: NextRouter = useRouter()
  const { t }: UseTranslationResponse = useTranslation()

  const handleClick = useCallback((): void => {
    router.back()
  }, [router])

  return (
    <div className="okp4-go-to-previous-page">
      <Button label={t("explore:back")} leftIcon={<Icon name="arrow-left" size={22} />} onClick={handleClick} />
    </div>
  )
}

export default GoToPreviousPage

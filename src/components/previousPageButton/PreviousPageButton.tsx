import { Button, Icon, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseTranslationResponse } from '@okp4/ui'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { useCallback } from 'react'
import classNames from 'classnames'

type PreviousPageButtonProps = DeepReadonly<{
  variant?: 'squared' | 'round'
}>

export const PreviousPageButton = ({
  variant = 'squared'
}: PreviousPageButtonProps): JSX.Element => {
  const router: NextRouter = useRouter()
  const { t }: UseTranslationResponse = useTranslation()
  const label = t('dataset:back')

  const handlePreviousPageClick = useCallback((): void => {
    router.back()
  }, [router])

  return (
    <div className={classNames('okp4-previous-page-button', variant)}>
      {variant === 'squared' ? (
        <Button
          label={label}
          leftIcon={<Icon name="arrow-left" size={22} />}
          onClick={handlePreviousPageClick}
        />
      ) : (
        <>
          <Button
            backgroundColor="info"
            icon={<Icon invertColor name="arrow-left" />}
            label={label}
            onClick={handlePreviousPageClick}
            variant="icon"
          />
          <Typography fontSize="small" noWrap>
            {label}
          </Typography>
        </>
      )}
    </div>
  )
}

export default PreviousPageButton

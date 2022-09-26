import { Button, Icon } from '@okp4/ui'
import { useRouter } from 'next/router'
import type { NextRouter } from 'next/router'
import { useCallback } from 'react'

export const GoBack = (): JSX.Element => {
  const router: NextRouter = useRouter()

  const handleClick = useCallback((): void => {
    router.back()
  }, [router])

  return (
    <div className='okp4-go-back'>
      <Button label="Back" leftIcon={<Icon name="arrow-left" size={22} />} onClick={handleClick} />
    </div>
  )
}

export default GoBack

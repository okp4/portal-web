import { Button, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import { format } from 'date-fns'
import { PortalCard } from '../../portalCard/PortalCard'
import './exploreCard.scss'
import type { Explore } from '../../../types/explore/Explore.type'
import { useMemo } from 'react'

type ExploreCardProps = {
  readonly explore: Explore
}

export const ExploreCard = ({ explore }: DeepReadonly<ExploreCardProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const color = useMemo(() => (theme === 'light' ? 'text' : 'inverted-text'), [theme])

  return (
    <div className="okp4-explore-card">
      <PortalCard>
        <>
          <Typography as="h2" color={color} fontSize="large" fontWeight="bold">
            {explore.name}
          </Typography>

          <Typography as="span" color={color} fontSize="medium">
            {explore.type}
          </Typography>
          <Typography as="span" color={color} fontSize="small">
            {explore.access.toLocaleLowerCase()}
          </Typography>
          <Typography as="span" color={color} fontSize="small">
            {explore.categories.join(', ')}
          </Typography>
          <Typography as="span" color={color} fontSize="x-small">{`${t('explore:by')} ${
            explore.provider
          }, ${t('explore:updatedAt')} ${format(
            new Date(explore.updatedAt),
            'dd/MM/yyyy'
          )}`}</Typography>

          <Button
            backgroundColor="secondary"
            label={`${t('explore:addThis')} ${t(`explore:${explore.type}`)} ${t(
              'explore:toDataspace'
            )}`}
            size="large"
          />
        </>
      </PortalCard>
    </div>
  )
}

export default ExploreCard

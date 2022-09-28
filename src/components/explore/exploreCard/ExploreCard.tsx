import { Button, Typography, useTranslation } from '@okp4/ui'
import type { DeepReadonly, UseTranslationResponse } from '@okp4/ui'
import { format } from 'date-fns'
import { PortalCard } from '../../portalCard/PortalCard'
import './ExploreCard.scss'
import type { Explore } from '../../../types/explore/Explore.type'

type ExploreCardProps = {
  readonly explore: Explore
}

export const ExploreCard = ({ explore }: DeepReadonly<ExploreCardProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-explore-card">
      <PortalCard>
        <>
          <Typography as="h2" color="inverted-text" fontSize="large" fontWeight="bold">
            {explore.name}
          </Typography>

          <Typography as="span" color="inverted-text" fontSize="medium">
            {explore.type}
          </Typography>
          <Typography as="span" color="inverted-text" fontSize="small">
            {explore.access.toLocaleLowerCase()}
          </Typography>
          <Typography as="span" color="inverted-text" fontSize="small">
            {explore.categories.join(', ')}
          </Typography>
          <Typography as="span" color="inverted-text" fontSize="x-small">{`${t('explore:by')} ${
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

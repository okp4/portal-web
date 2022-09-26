import { Button, Typography } from '@okp4/ui'
import { format } from 'date-fns'
import { PortalCard } from '../../portalCard/PortalCard'
import './ExploreCard.scss'

export const ExploreCard = (): JSX.Element => (
  <div className="okp4-explore-card">
    <PortalCard>
      <>
        <Typography as="h2" color="inverted-text" fontSize="large" fontWeight="bold">
          Agreste
        </Typography>

        <Typography as="span" color="inverted-text" fontSize="medium">
          Dataset
        </Typography>
        <Typography as="span" color="inverted-text" fontSize="small">
          Public
        </Typography>
        <Typography as="span" color="inverted-text" fontSize="small">
          Agriculture, Open data, Census, Dataviz, Agreste
        </Typography>
        <Typography
          as="span"
          color="inverted-text"
          fontSize="x-small"
        >{`By Agreste, Last update ${format(new Date(), 'dd/MM/yyyy')}`}</Typography>

        <Button backgroundColor="secondary" label="Add this Dataset to my Dataspace" size="large" />
      </>
    </PortalCard>
  </div>
)

export default ExploreCard

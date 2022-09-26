import { Button, Typography } from '@okp4/ui'
import type { DeepReadonly } from '@okp4/ui'
import { PortalCard } from '../../portalCard/PortalCard'
import { CExplore } from '../../../constants/explore/CExplore.constant'
import { CExploreDetailsMetadataType } from './constants/CExploreDetailsMetadataType.constant'
import type { Explore, ExploreMetadata } from '../../../types/explore/Explore.type'
import React from 'react'
import './scss/ExploreDetails.scss'
import type { ExploreDetailsMetadataMapping } from './types/ExploreDetailsMetadataMapping.type'

type DetailsContainerProps = {
  readonly name: string
  readonly children: React.ReactNode
}

type ExploreDetailsGovernanceProps = {
  readonly governance: string
}

type ExploreDetailsMetadataProps = {
  readonly metadata: ExploreMetadata
}

type MetadataRowValueProps = {
  readonly name: string
  readonly value: string | number | Date
  readonly isEven: boolean
}

type MetadataRowProps = {
  readonly name: string
  readonly value: string | number | Date
  readonly isEven: boolean
}

const DetailsContainer = ({ name, children }: DeepReadonly<DetailsContainerProps>): JSX.Element => (
  <div className="explore-details-container">
    <Typography as="span" color="inverted-text" fontSize="small" fontWeight="bold">
      {name}:
    </Typography>

    {children}
  </div>
)

const DetailsGovernance = ({
  governance
}: DeepReadonly<ExploreDetailsGovernanceProps>): JSX.Element => (
  <div className="explore-details-governance">
    <Typography as="p" color="inverted-text" fontSize="small">
      {`${governance} Governance based on the $KNOW token`}
    </Typography>

    <Button label="View Governance" />
  </div>
)

const MetadataRowValue = ({ name, value, isEven }: DeepReadonly<MetadataRowValueProps>): JSX.Element => {
  const item: ExploreDetailsMetadataMapping | undefined = CExploreDetailsMetadataType.find(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (tmp: DeepReadonly<ExploreDetailsMetadataMapping>) => tmp.name === name
  )

  const Component: React.ElementType | undefined = item?.Component

  if (item === undefined || Component === undefined) {
    return (
      <Typography as="span" color={isEven ? 'invariant-text' : 'inverted-text'} fontSize="small">
        {value.toString()}
      </Typography>
    )
  }

  return (
    <>
      <Component className={item.className} isEven={isEven} value={value} />
      {item.unit !== '' && (
        <Typography as="span" color={isEven ? 'invariant-text' : 'inverted-text'} fontSize="small">
          {item.unit}
        </Typography>
      )}
    </>
  )
}

const MetadataRow = ({ name, value, isEven }: DeepReadonly<MetadataRowProps>): JSX.Element => (
  <div className="explore-details-metadata-row">
    <div className="name">
      <Typography as="span" color={isEven ? 'invariant-text' : 'inverted-text'} fontSize="small">
        {name}
      </Typography>
    </div>

    <div className="value">
      <MetadataRowValue isEven={isEven} name={name} value={value} />
    </div>
  </div>
)

const ExploreDetailsMetadata = ({
  metadata
}: DeepReadonly<ExploreDetailsMetadataProps>): JSX.Element => {
  return (
    <div className="explore-details-metadata">
      {Object.keys(metadata).map((key: string, index: number) => {
        type ObjectKey = keyof typeof metadata
        const metadataKey = key as ObjectKey

        return (
          <MetadataRow
            isEven={index % 2 === 0}
            key={key}
            name={key}
            value={metadata[metadataKey]}
          />
        )
      })}
    </div>
  )
}

export const ExploreDetails = (): JSX.Element => {
  const explore: Explore = CExplore[0]

  return (
    <div className="okp4-explore-details">
      <PortalCard>
        <>
          <DetailsContainer name="Description">
            <Typography as="p" color="inverted-text" fontSize="small">
              {explore.description}
            </Typography>
          </DetailsContainer>
          <DetailsContainer name="Governance">
            <DetailsGovernance governance={explore.governance} />
          </DetailsContainer>
          <DetailsContainer name="Metadata">
            <ExploreDetailsMetadata metadata={explore.metadata} />
          </DetailsContainer>
        </>
      </PortalCard>
    </div>
  )
}

export default ExploreDetails

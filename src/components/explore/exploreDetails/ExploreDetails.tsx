import { Button, Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import { PortalCard } from '../../portalCard/PortalCard'
import { CExploreDetailsMetadataType } from './constants/CExploreDetailsMetadataType.constant'
import type { Explore, ExploreMetadata } from '../../../types/explore/Explore.type'
import React, { useMemo } from 'react'
import './scss/exploreDetails.scss'
import type { ExploreDetailsMetadataMapping } from './types/ExploreDetailsMetadataMapping.type'

type ExploreDetailsProps = {
  readonly explore: Explore
}

type Color = 'text' | 'inverted-text' | 'invariant-text'

type DetailsContainerProps = {
  readonly name: string
  readonly children: React.ReactNode
}

type ExploreDetailsGovernanceProps = {
  readonly governance: string
  readonly color: Color
}

type ExploreDetailsMetadataProps = {
  readonly color: Color
  readonly metadata: ExploreMetadata
}

type MetadataRowValueProps = {
  readonly color: Color
  readonly name: string
  readonly value: string | number | Date
}

type MetadataRowProps = {
  readonly color: Color
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
  governance,
  color
}: DeepReadonly<ExploreDetailsGovernanceProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="explore-details-governance">
      <Typography as="p" color={color} fontSize="small">
        {`${governance} ${t('explore:governance:based')}`}
      </Typography>

      <Button label={t('explore:governance:view')} />
    </div>
  )
}

const MetadataRowValue = ({
  name,
  value,
  color
}: DeepReadonly<MetadataRowValueProps>): JSX.Element => {
  const item: ExploreDetailsMetadataMapping | undefined = CExploreDetailsMetadataType.find(
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    (tmp: DeepReadonly<ExploreDetailsMetadataMapping>) => tmp.name === name
  )
  const Component: React.ElementType | undefined = item?.Component

  if (item === undefined || Component === undefined) {
    return (
      <Typography as="span" color={color} fontSize="small">
        {value.toString()}
      </Typography>
    )
  }

  return (
    <>
      <Component className={item.className} color={color} value={value} />
      {item.unit !== '' && (
        <Typography as="span" color={color} fontSize="small">
          {item.unit}
        </Typography>
      )}
    </>
  )
}

const MetadataRow = ({
  color,
  name,
  value,
  isEven
}: DeepReadonly<MetadataRowProps>): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation()
  const rowColor = useMemo(() => (isEven ? 'invariant-text' : color), [color, isEven])

  return (
    <div className="explore-details-metadata-row">
      <div className="name">
        <Typography as="span" color={rowColor} fontSize="small">
          {t(`explore:metadata:${name}`)}
        </Typography>
      </div>

      <div className="value">
        <MetadataRowValue color={rowColor} name={name} value={value} />
      </div>
    </div>
  )
}

const ExploreDetailsMetadata = ({
  color,
  metadata
}: DeepReadonly<ExploreDetailsMetadataProps>): JSX.Element => {
  return (
    <div className="explore-details-metadata">
      {Object.keys(metadata).map((key: string, index: number) => {
        type ObjectKey = keyof typeof metadata
        const metadataKey = key as ObjectKey

        return (
          <MetadataRow
            color={color}
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

export const ExploreDetails = ({ explore }: DeepReadonly<ExploreDetailsProps>): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()
  const color = useMemo(() => (theme === 'light' ? 'text' : 'inverted-text'), [theme])

  return (
    <div className="okp4-explore-details">
      <PortalCard>
        <>
          <DetailsContainer name={t('explore:description')}>
            <Typography as="p" color={color} fontSize="small">
              {explore.description}
            </Typography>
          </DetailsContainer>
          <DetailsContainer name={t('explore:governance:name')}>
            <DetailsGovernance color={color} governance={explore.governance} />
          </DetailsContainer>
          <DetailsContainer name={t('explore:metadata.name')}>
            <ExploreDetailsMetadata color={color} metadata={explore.metadata} />
          </DetailsContainer>
        </>
      </PortalCard>
    </div>
  )
}

export default ExploreDetails

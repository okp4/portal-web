import type { DeepReadonly } from '@okp4/ui'
import React from 'react'
import './PortalCard.scss'

type PortalCard = {
  readonly children: React.ReactNode
}

export const PortalCard = ({ children }: DeepReadonly<PortalCard>): JSX.Element => (
  <section className="okp4-portal-card">{children}</section>
)

export default PortalCard

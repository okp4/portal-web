import { Button, Card, Icon, Select, Typography, useMediaType } from '@okp4/ui'
import type { DeepReadonly, SelectValue } from '@okp4/ui'
import { useCallback } from 'react'

type FakeDataType = {
  header: string
  footer: string
}

const DataspaceElements = (): JSX.Element => {
  const fakeData = [
    { header: 'DataSet', footer: 'Agreste Normé' },
    { header: 'Service', footer: 'Jointure' },
    { header: 'DataSet', footer: 'RPG 2022' }
  ]
  return (
    <>
      {fakeData.map((data: DeepReadonly<FakeDataType>, index: number) => (
        <div className="okp4-dataspace-card" key={index}>
          <Card
            footer={<Typography>{data.footer}</Typography>}
            header={<Typography>{data.header}</Typography>}
          />
        </div>
      ))}
    </>
  )
}

const SelectOptions = [
  {
    label: 'Rhizome',
    value: 'Rhizome'
  }
]

// eslint-disable-next-line max-lines-per-function
export const Body = (): JSX.Element => {
  const handleChange = useCallback((value: SelectValue) => {
    console.log(value)
  }, [])

  const isSmallScreen = useMediaType('(max-width: 995px)')

  return (
    <div className="okp4-body-main">
      <div className="okp4-body-dashboard">
        <div className="okp4-dashboard-dataspace-summary">
          <div className="okp4-dataspace-summary-card">
            <Card
              header={<Typography>First Card</Typography>}
              size={isSmallScreen ? 'medium' : 'small'}
            />
          </div>
          <div className="okp4-dataspace-summary-counters">
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                289
              </Typography>
              <Typography fontSize="small">MEMBERS</Typography>
            </div>
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                SEE
              </Typography>
              <Typography fontSize="small">THE RULEBOOK</Typography>
            </div>
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                376
              </Typography>
              <Typography fontSize="small">DATASETS</Typography>
            </div>
            <div className="okp4-dataspace-summary-counter">
              <Typography fontSize={isSmallScreen ? 'small' : 'medium'} fontWeight="bold">
                73
              </Typography>
              <Typography fontSize="small">SERVICES</Typography>
            </div>
          </div>
          <div className="okp4-dataspace-selection-with-description">
            <div className="okp4-dataspace-selection">
              <Select
                fullWidth={isSmallScreen}
                onChange={handleChange}
                options={SelectOptions}
                value="Rhizome"
              />
            </div>
            <div className="okp4-dataspace-description">
              <Typography fontSize="small">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </Typography>
            </div>
          </div>
        </div>
        <div className="okp4-dashboard-dataspace-creation">
          <Button label="Create a new data Space" leftIcon={<Icon name="add" size={15} />} />
        </div>
        <div className="okp4-dashboard-dataspace-content">
          <DataspaceElements />
        </div>
        <div className="okp4-dashboard-dataspace-options">
          <div className="okp4-dashboard-data-creation">Add</div>
          <div className="okp4-dashboard-data-visualization">Visualize</div>
        </div>
      </div>
      <div className="okp4-body-activity">Search bar & Activity</div>
    </div>
  )
}

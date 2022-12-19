import { Typography, useTheme, useTranslation } from '@okp4/ui'
import type { DeepReadonly, ThemeContextType, UseTranslationResponse } from '@okp4/ui'
import classNames from 'classnames'
import type { Governance, GovernanceContent, Rule } from '../../../../dto/DataspaceDto'

type GovernanceSummaryProps = DeepReadonly<{
  governance: Governance
  dataspaceName: string
}>

// eslint-disable-next-line max-lines-per-function
const GovernanceSummary = ({ governance, dataspaceName }: GovernanceSummaryProps): JSX.Element => {
  const { theme }: ThemeContextType = useTheme()
  const { t }: UseTranslationResponse = useTranslation()

  return (
    <div className="okp4-governance-summary-main">
      <Typography as="h1" color="highlighted-text" fontSize="large">
        {t(`governance:title`, { dataspace: dataspaceName })}
      </Typography>

      {Object.entries(governance).map(
        ([category, content]: DeepReadonly<[string, GovernanceContent[]]>, index: number) => (
          <div className="okp4-governance-summary-category" key={index}>
            <div className={classNames('okp4-governance-summary-title', theme)}>
              <Typography
                color={theme === 'dark' ? 'inverted-text' : 'invariant-text'}
                fontSize="small"
                fontWeight="bold"
              >
                {t(`governance:categories:${category}`).toUpperCase()}
              </Typography>
            </div>
            <div className="okp4-governance-summary-content">
              {content.map(
                ({ subCategory, rules }: DeepReadonly<GovernanceContent>, index: number) => (
                  <div key={index}>
                    {subCategory && (
                      <>
                        <Typography fontFamily="secondary" fontSize="small">
                          {subCategory.toUpperCase()}
                        </Typography>
                        <div className="okp4-governance-summary-line-separator" />
                      </>
                    )}
                    <div className="okp4-governance-summary-items">
                      {rules.map(({ title, rule }: DeepReadonly<Rule>, index: number) => (
                        <div
                          className={classNames('okp4-governance-summary-item', theme)}
                          key={index}
                        >
                          <Typography color="highlighted-text" fontSize="small" fontWeight="bold">
                            {title.toUpperCase()}
                          </Typography>
                          <div
                            className={classNames('okp4-governance-summary-line-separator', 'item')}
                          />
                          <Typography as="p" fontSize="small">
                            {rule}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default GovernanceSummary

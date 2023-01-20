import type { DeepReadonly } from '@okp4/ui'
import type { NextApiRequest, NextApiResponse } from 'next'
import { RouteError } from '../../../error'

type ArgoEngineResponse = Readonly<{
  items: Array<{
    status: {
      phase: WorkflowStatus
    }
    metadata: {
      name: WorkflowName
    }
  }> | null
}>

type WorkflowStatus = 'Failed' | 'Succeeded' | 'Pending' | 'Running'
type WorkflowVisualizationUrl = string
type WorkflowName = string

type WorkflowResponse = {
  status: WorkflowStatus
  visualizationUrl: WorkflowVisualizationUrl
}

const retrieveWorkflow = async (id: string): Promise<WorkflowResponse | void> => {
  return fetch(`${process.env.WORKFLOW_ARGO_API_URL}?listOptions.labelSelector=origin=${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.WORKFLOW_ARGO_AUTHENTICATION_BEARER}`
    }
  })
    .then((res: DeepReadonly<Response>) => {
      if (!res.ok)
        return res.text().then((text: string) => {
          throw new RouteError(text, res.status)
        })
      return res.json() as unknown as ArgoEngineResponse
    })
    .then((workflow: DeepReadonly<ArgoEngineResponse>) => {
      if (workflow.items?.length)
        return {
          status: workflow.items[0].status.phase,
          visualizationUrl: `${process.env.WORKFLOW_ARGO_CLIENT_URL}${workflow.items[0].metadata.name}`
        }
      throw new RouteError('Not found', 404)
    })
    .catch((error: unknown) => {
      if (error instanceof Error) throw error
      throw new RouteError(
        `Oops.. An unscpecified error occurred while accessing workflow: ${JSON.stringify(error)}`
      )
    })
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(405).send(null)
    return
  }

  if (!req.query.id || typeof req.query.id !== 'string') {
    res.status(400).send('Invalid query parameter')
    return
  }

  const id = req.query.id as string

  try {
    const workflowStatus = await retrieveWorkflow(id)
    res.status(200).json(workflowStatus)
  } catch (error: unknown) {
    console.error(error)
    const routeError =
      error instanceof RouteError
        ? error
        : new RouteError(
            `Oops.. An unscpecified error occurred while accessing workflow: ${JSON.stringify(
              error
            )}`
          )
    res
      .status(routeError.statusCode)
      .send({ message: routeError.message, statusCode: routeError.statusCode })
  }
}

export default handler

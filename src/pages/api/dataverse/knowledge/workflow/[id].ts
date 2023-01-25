import type { DeepReadonly } from '@okp4/ui'
import type { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path'

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

export type WorkflowResponse = {
  status: WorkflowStatus
  visualizationUrl: WorkflowVisualizationUrl
}

const retrieveWorkflow = async (id: string): Promise<WorkflowResponse | null> =>
  fetch(`${process.env.WORKFLOW_ARGO_API_URL}?listOptions.labelSelector=origin=${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.WORKFLOW_ARGO_AUTHORIZATION_BEARER}`
    }
  })
    .then(async (res: DeepReadonly<Response>) => {
      if (!res.ok) {
        const err = await res.text()
        throw new Error(`Error ${res.statusText} while retrieving workflow ${id}: ${err}`)
      }

      return res.json()
    })
    .then((workflow: DeepReadonly<ArgoEngineResponse>) => {
      if (workflow.items?.length)
        return {
          status: workflow.items[0].status.phase,
          visualizationUrl: join(process.env.WORKFLOW_ARGO_WEB_URL, workflow.items[0].metadata.name)
        }

      return null
    })

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'GET') {
    res.status(405).end()
    return
  }

  if (!req.query.id || typeof req.query.id !== 'string') {
    res.status(400).send({ message: 'Invalid query parameter: id' })
    return
  }

  const id = req.query.id as string

  try {
    const workflowStatus = await retrieveWorkflow(id)

    if (!workflowStatus) {
      res.status(404).send({ message: `Workflow ${id} not found` })
      return
    }

    res.status(200).send(workflowStatus)
  } catch (error: unknown) {
    console.error(error)
    res.status(500).send({ message: 'Error while retrieving workflow' })
  }
}

export default handler

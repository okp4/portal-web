export type Explore = {
  readonly id: string;
  readonly name: string
  readonly type: string
  readonly access: 'PRIVATE' | 'PUBLIC'
  readonly categories: Array<string>
  readonly provider: string
  readonly updatedAt: Date
}

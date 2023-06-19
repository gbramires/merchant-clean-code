import { Entity } from './entity'

export interface ReleaseProps {
  _id?: string
  amount: number
  releaseName: string
  createdAt: Date
}

export abstract class Release<
  Props extends ReleaseProps,
> extends Entity<Props> {
  get _id() {
    return this.props._id
  }

  get amount() {
    return this.props.amount
  }

  get releaseName() {
    return this.props.releaseName
  }

  get createdAt() {
    return this.props.createdAt
  }
}

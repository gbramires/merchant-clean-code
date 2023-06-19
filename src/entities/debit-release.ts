import { Optional } from './types/optional'
import { Release, ReleaseProps } from './types/release'
import { UniqueEntityID } from './types/unique-entity-id'

export interface DebitReleaseProps extends ReleaseProps {
  type: 'debit'
}

export class DebitRelease extends Release<DebitReleaseProps> {
  get type() {
    return this.props.type
  }

  static create(
    props: Optional<DebitReleaseProps, 'createdAt' | 'type' | '_id'>,
  ) {
    const debitRelease = new DebitRelease({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      type: 'debit',
      _id: props._id ?? new UniqueEntityID().toValue(),
    })

    return debitRelease
  }
}

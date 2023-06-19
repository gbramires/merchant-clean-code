import { Optional } from './types/optional'
import { Release, ReleaseProps } from './types/release'
import { UniqueEntityID } from './types/unique-entity-id'

export interface CreditReleaseProps extends ReleaseProps {
  type: 'credit'
}

export class CreditRelease extends Release<CreditReleaseProps> {
  get type() {
    return this.props.type
  }

  static create(
    props: Optional<CreditReleaseProps, 'createdAt' | 'type' | '_id'>,
  ) {
    const creditRelease = new CreditRelease({
      ...props,
      createdAt: props.createdAt ?? new Date(),
      type: 'credit',
      _id: props._id ?? new UniqueEntityID().toValue(),
    })

    return creditRelease
  }
}

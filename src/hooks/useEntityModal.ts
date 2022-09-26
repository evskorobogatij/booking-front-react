import * as React from 'react'

export const useEntityModal = <T>() => {
  const [state, setState] = React.useState<
    [null | 'edit' | 'remove', T | null]
  >([null, null])

  const onRemove = (entity: T) => () => {
    setState(['remove', entity])
  }

  const onEdit = (entity: T) => () => {
    setState(['edit', entity])
  }

  const onClose = () => {
    setState([null, null])
  }

  return {
    edit: {
      onClose,
      open: state[0] === 'edit',
      entityData: state[1],
    },
    remove: {
      onClose,
      open: state[0] === 'remove',
      entityData: state[1],
    },
    onEdit,
    onRemove,
  }
}

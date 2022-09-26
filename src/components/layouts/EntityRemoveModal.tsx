import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import LoadingButton from '@mui/lab/LoadingButton'
import Stack from '@mui/material/Stack'
import DialogContent from '@mui/material/DialogContent'

interface Props {
  title: string
  open: boolean
  onClose(): void
  mutation(): any
  entityData: any
}

const EntityRemoveModal: React.FC<Props> = (props) => {
  const { title, open, mutation, onClose, entityData } = props
  const [remove, response] = mutation()

  const handleRemove = () => {
    remove(entityData)
  }

  React.useEffect(() => {
    if (response && response.status === 'fulfilled') {
      onClose()
    }
  }, [response])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle textAlign="center">{title}</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={3} justifyContent="center">
          <Button onClick={onClose} autoFocus>
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            color="error"
            loading={response.status === 'pending'}
            loadingPosition="center"
            onClick={handleRemove}
          >
            Remove
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default EntityRemoveModal

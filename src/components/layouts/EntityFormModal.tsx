import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/lab/AlertTitle'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'

interface Props {
  title: string
  successAlertTitle?: string
  open: boolean
  onClose(): void
  entityData?: any
  form: any
  mutation(): any
}

const EntityFormModal: React.FC<Props> = (props) => {
  const {
    title,
    onClose,
    open,
    form,
    mutation,
    entityData,
    successAlertTitle,
  } = props
  const Form = form
  const [submit, response] = mutation()
  const { enqueueSnackbar } = useSnackbar()

  const handleSubmit = (values: any) => {
    if (entityData) {
      submit({ ...entityData, ...values })
    } else {
      submit(values)
    }
  }

  React.useEffect(() => {
    if (response && response.status === 'fulfilled') {
      onClose()
      if (successAlertTitle) {
        enqueueSnackbar(successAlertTitle, {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        })
      }
    }
  }, [response])

  return (
    <Dialog onClose={onClose} maxWidth="lg" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          overflowY: 'initial',
        }}
      >
        <Stack direction="column" spacing={3} maxWidth="min-content">
          {response.status === 'rejected' && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {response.error.data?.message || response.error.data?.error}
            </Alert>
          )}
          <Form
            onSubmit={handleSubmit}
            initialValues={entityData}
            response={response}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default EntityFormModal

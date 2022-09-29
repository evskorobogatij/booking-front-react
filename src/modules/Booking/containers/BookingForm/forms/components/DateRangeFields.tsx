import React from 'react'
import Stack from '@mui/material/Stack'
import { Field, formValueSelector } from 'redux-form'
import { renderTextField } from '../../../../../../components/redux-form'
import { validators } from '../../../../../../utils'
import { dateTimeMask } from '../../../../../../utils/masks'
import { DAYS_INCREMENT_OPTIONS } from '../../../../constants'
import Chip from '@mui/material/Chip'
import moment from 'moment'
import { DATE_FORMAT_TEMPLATE } from '../../../../../../constants'
import useMediaQuery from '@mui/material/useMediaQuery'
import { connect } from 'react-redux'

const DateRangeFields = ({ enteringDate }: { enteringDate?: string }) => {
  const matchSm = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  console.log(enteringDate)
  return (
    <Stack
      direction={!matchSm ? 'column' : 'row'}
      spacing={2}
      sx={{ width: '100%' }}
    >
      <Field
        name="enteringDate"
        label="Entering date"
        required
        component={renderTextField}
        validate={[validators.required]}
        {...dateTimeMask}
      />
      <Stack spacing={1}>
        <Field
          name="leavingDate"
          label="Leaving date"
          required
          component={renderTextField}
          validate={[validators.required]}
          {...dateTimeMask}
        />
        <Field
          name="leavingDate"
          validate={[validators.required]}
          component={({ input }: any) => (
            <Stack direction="row" spacing={1}>
              {DAYS_INCREMENT_OPTIONS.map((d) => (
                <Chip
                  key={d}
                  label={`${d}d`}
                  size="small"
                  onClick={() => {
                    input.onChange(
                      moment(enteringDate)
                        .add(d, 'days')
                        .format(DATE_FORMAT_TEMPLATE)
                    )
                  }}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Stack>
          )}
        />
      </Stack>
    </Stack>
  )
}

export default connect((state, props: any) => {
  const enteringDate = formValueSelector(props.form)(state, 'enteringDate')

  return {
    enteringDate,
  }
})(DateRangeFields)

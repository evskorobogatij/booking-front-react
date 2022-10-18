import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack'
import { Field, formValueSelector } from 'redux-form'
import { renderTextField } from '../../../../../../components/redux-form'
import { validators } from '../../../../../../utils'
import { dateMask, timeMask } from '../../../../../../utils/masks'
import { DAYS_INCREMENT_OPTIONS } from '../../../../constants'
import Chip from '@mui/material/Chip'
import moment from 'moment'
import { DATE_FORMAT_TEMPLATE } from '../../../../../../constants'
import useMediaQuery from '@mui/material/useMediaQuery'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useGetApplicationQuery } from 'modules/Application/applicationService'

const DateRangeFields = ({
  enteringDate,
  leavingDate,
  change,
  edit,
}: {
  enteringDate?: string
  leavingDate?: string
  change?: (field: string, value: any) => void
  edit?: boolean
}) => {
  const { t } = useTranslation()
  const matchSm = useMediaQuery((theme: any) => theme.breakpoints.up('md'))
  const applicationQuery = useGetApplicationQuery(null)
  const [enteringTimeVal, setEnteringTimeVal] = useState('00:00')
  const [leavingTimeVal, setLieavingTimeVal] = useState('00:00')

  useEffect(() => {
    console.log('applicationQuery', applicationQuery)
    if (applicationQuery.data) {
      setEnteringTimeVal(applicationQuery.data.timeDefaultEntering ?? '00:00')
      setLieavingTimeVal(applicationQuery.data.timeDefaultLeaving ?? '00:00')
      console.log(enteringTimeVal, leavingTimeVal)
    }
  }, [applicationQuery])

  useEffect(() => {
    console.log('Parsing date', enteringDate, change)
    if (enteringDate) {
      const parsed = enteringDate.split(' ')
      if (parsed && parsed[0] && change) {
        change('enteringDateD', parsed[0])
      }
    }
  }, [enteringDate, change])

  useEffect(() => {
    if (edit) {
      if (enteringDate) {
        const parsed = enteringDate.split(' ')
        if (parsed && parsed[1] && change) {
          change('enteringTime', parsed[1])
        }
      }
    } else if (edit === false) {
      if (enteringTimeVal && change) {
        change('enteringTime', enteringTimeVal)
      }
    }
  }, [edit, enteringDate, change, enteringTimeVal])

  // leavingDate

  useEffect(() => {
    console.log('Parsing date', leavingDate, change)
    if (leavingDate) {
      const parsed = leavingDate.split(' ')
      if (parsed && parsed[0] && change) {
        change('leavingDateD', parsed[0])
      }
    }
  }, [leavingDate, change])

  useEffect(() => {
    if (edit) {
      if (leavingDate) {
        const parsed = leavingDate.split(' ')
        if (parsed && parsed[1] && change) {
          change('leavingTime', parsed[1])
        }
      }
    } else if (edit === false) {
      if (leavingTimeVal && change) {
        change('leavingTime', leavingTimeVal)
      }
    }
  }, [edit, leavingDate, change, leavingTimeVal])

  // console.log(enteringDate)
  return (
    <Stack direction={'column'} spacing={2} sx={{ width: '100%' }}>
      <Stack direction={!matchSm ? 'column' : 'row'} spacing={2}>
        <Field
          name="enteringDateD"
          label={t('Entering date')}
          required
          component={renderTextField}
          validate={[validators.required, validators.isDate]}
          {...dateMask}
        />
        <Field
          name="enteringTime"
          label={t('Entering time')}
          required
          component={renderTextField}
          validate={[validators.required, validators.isTime]}
          {...timeMask}
        />
      </Stack>

      <Stack direction={!matchSm ? 'column' : 'row'} spacing={1}>
        <Stack spacing={1}>
          <Field
            name="leavingDateD"
            label={t('Leaving date')}
            required
            component={renderTextField}
            validate={[validators.required, validators.isDate]}
            {...dateMask}
          />

          <Field
            name="leavingDate"
            validate={[validators.required]}
            component={({ input }: any) => (
              <Stack direction="row" spacing={1}>
                {DAYS_INCREMENT_OPTIONS.map((d) => (
                  <Chip
                    key={d}
                    label={`${d}${t('d')}`}
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

        <Field
          name="leavingTime"
          label={t('Leaving time')}
          required
          component={renderTextField}
          validate={[validators.required, validators.isTime]}
          {...timeMask}
        />
      </Stack>
    </Stack>
  )
}

export default connect((state, props: any) => {
  const enteringDate = formValueSelector(props.form)(state, 'enteringDate')
  const leavingDate = formValueSelector(props.form)(state, 'leavingDate')
  // const fieldsVal = formValueSelector(props.form)(state)

  return {
    enteringDate,
    leavingDate,
  }
})(DateRangeFields)

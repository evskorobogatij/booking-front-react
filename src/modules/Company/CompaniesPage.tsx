import * as React from 'react'
import CompaniesList from './CompaniesList'
import EntityPage from '../../components/layouts/EntityPage'
import { useCreateCompanyMutation } from '../../services'
import CompanyForm from './CompanyForm'
import { useTranslation } from 'react-i18next'

const CompaniesPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <EntityPage
      title={t('Companies')}
      createBtnTitle={t('New company')}
      form={CompanyForm}
      mutation={useCreateCompanyMutation}
      container={<CompaniesList />}
    />
  )
}

export default CompaniesPage

import * as React from 'react'
import CompaniesList from './CompaniesList'
import EntityPage from '../../components/layouts/EntityPage'
import { useCreateCompanyMutation } from '../../services'
import CompanyForm from './CompanyForm'

const CompaniesPage: React.FC = () => {
  return (
    <EntityPage
      title="Companies"
      createBtnTitle="New company"
      form={CompanyForm}
      mutation={useCreateCompanyMutation}
      container={<CompaniesList />}
    />
  )
}

export default CompaniesPage

import with_auth from 'src/context/auth_context';
import ReportHistory from 'components/feature/report_history';

const ReportsHistoryPage = (): JSX.Element => {
  return <ReportHistory />
}
export default  with_auth(ReportsHistoryPage);

import { useParams } from 'react-router-dom';
import { FullHeightBox } from '../styles/styledComponents';
import Header from '../components/Header';
import SheetHeader from '../components/SheetHeader';
import Attendances from '../components/Attendances.js';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function SheetPage() {
  const { username } = useParams();

  return (
    <FullHeightBox>
      <Header username={username}/>
      <SheetHeader withDateSelector={true} />
      <Attendances emptyAttendances={false} />
    </FullHeightBox>
  );
}

export default SheetPage;

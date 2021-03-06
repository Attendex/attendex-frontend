import axios from 'axios';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/utils';
import { FullHeightBox } from '../styles/styledComponents';
import Header from '../components/Header';
import SheetHeader from '../components/SheetHeader';
import Attendances from '../components/Attendances';

// URL path would be /

function BookLandingPage() {
  const navigate = useNavigate();
  const { username, bookName, bookId } = useParams();
  
  useEffect(() => {
    fetchDates();
  }, [username, bookName, bookId]);

  const fetchDates = () => {
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdate?bookid=${bookId}`,
      { 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => {
        if (res.data.length > 0) {
          const date = res.data[0].date;
          const sheetId = res.data[0].sheetID;
          navigate(`/${username}/${bookName}/${bookId}/${date}/${sheetId}`);
        } 
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
      });
  };

  return (
    <FullHeightBox>
      <Header username={username}/>
      <SheetHeader withDateSelector={false} />
      <Attendances emptyAttendance={true} />
    </FullHeightBox>
  );
}



export default BookLandingPage;

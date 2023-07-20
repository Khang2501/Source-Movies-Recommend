import Banner from "../components/banner/Banner";
import Navbar from "../components/navbar/Navbar";
import ListMovie from "../components/listMovies/ListMovie";
import Original from "../components/orginal/Original";

interface IProps {
  requestsAPI: {
    fetchTrending: string;
    fetchNetflixOriginals: string;
    fetchTopRated: string;
    fetchActionMovies: string;
    fetchComedyMovies: string;
    fetchHorrorMovies: string;
    fetchRomanceMovies: string;
    fetchDocumentaries: string;
    fetchSearch: string;
  };
}

export default function Browse({ requestsAPI }: IProps) {
  const movieList = () => {};
  return (
    <div>
      <Banner banner={requestsAPI.fetchTrending} />
      <Navbar />
      <Original title="Original" fetchAPI={requestsAPI.fetchNetflixOriginals} />
      <ListMovie title="Xu hướng" fetchAPI={requestsAPI.fetchTrending} />
      <ListMovie title="Xếp hạng cao" fetchAPI={requestsAPI.fetchTopRated} />
      <ListMovie title="Hành động" fetchAPI={requestsAPI.fetchActionMovies} />
      <ListMovie title="Hài hước" fetchAPI={requestsAPI.fetchComedyMovies} />
      <ListMovie title="Kinh dị" fetchAPI={requestsAPI.fetchHorrorMovies} />
      <ListMovie title="Lãng mạng" fetchAPI={requestsAPI.fetchRomanceMovies} />
      <ListMovie title="Tài liệu" fetchAPI={requestsAPI.fetchDocumentaries} />
    </div>
  );
}

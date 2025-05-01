import { Search } from 'lucide-react';
import './Searchbar.scss';

function Searchbar() {
  return (
    <form className="search" action="">
      <input
        className="search-input"
        type="text"
        placeholder="Que souhaitez-vous apprendre aujourd'hui ? (ex. Excel, montage vidéo, programmation...)"
      />
      <button className="search-button" type="button">
        <Search />
      </button>
    </form>
  );
}

export default Searchbar;

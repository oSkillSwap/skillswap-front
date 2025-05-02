import { Search } from 'lucide-react';
import './Searchbar.scss';

function Searchbar() {
  return (
    <form className="search" action="">
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
        />
        <button className="search-button" type="button">
          <Search />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;

import { Search } from 'lucide-react';
import './Searchbar.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'; // Import du hook useNavigate
import { useSearchParams } from 'react-router';

interface SearchbarProps {
  handleSearch: (search: string) => void;
}
function Searchbar({ handleSearch }: SearchbarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Remplit le champ input si "search" est dans l'URL
  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchValue(search);
    }
  }, [searchParams]);

  return (
    <form
      className="search"
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(searchValue);
        navigate(`/explore?search=${encodeURIComponent(searchValue.trim())}`);
      }}
    >
      <div className="search-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
          name="search"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <button className="search-button" type="submit">
          <Search />
        </button>
      </div>
    </form>
  );
}

export default Searchbar;

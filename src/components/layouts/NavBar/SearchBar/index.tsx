import { useForm } from 'react-hook-form';
import { BiSearchAlt } from 'react-icons/bi';

interface iPesquisaProduto {
    produto: String;
}

const SearchBar = () => {
    const { register, handleSubmit } = useForm<iPesquisaProduto>();

    return (
        <form className="w-full flex items-center">
            <input
                {...register('produto')}
                className={styles.searchInput}
                placeholder="Pesquisar produto..."
                type="text"
            />

            <button className={styles.searchButton} type="submit">
                <div className="w-0.5 h-5/6 absolute left-0 rounded-xl bg-violet-100" />
                <BiSearchAlt />
            </button>
        </form>
    );
};

const styles = {
    searchInput: `
        w-full text-md tracking-wide px-4 py-3 rounded-l-xl
        text-violet-400 placeholder:text-violet-300
        focus:outline-none
        selection:bg-violet-800 selection:text-white 
        transition ease-out duration-700
    `,

    searchButton: `
        w-12 h-full text-lg
        flex justify-center items-center relative
        bg-white text-violet-400 hover:text-violet-600 rounded-r-xl 
        transition ease-out duration-700
    `,
};

export default SearchBar;

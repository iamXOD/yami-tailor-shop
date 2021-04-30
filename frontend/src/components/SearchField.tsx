//Imports
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { ChangeEvent, ReactElement } from "react";

type Props = {
    search: string;
    setSearch: (search: string) => void;
};

export function SearchField({ search, setSearch }: Props): ReactElement {
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    return (
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            value={search}
            onChange={onSearchChange}
        />
    );
}

export default SearchField;

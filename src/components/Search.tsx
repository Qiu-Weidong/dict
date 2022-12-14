import { IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { AutoComplete } from "antd";
import { Traditionalized, Simplized } from '../translate';
import sqlite from "../sqlite";
import React, { Fragment } from "react";
import eventBus from "../eventbus";


export class Search extends React.Component<
  { onSearch: (param: string) => void },
  { value: string, options: { value: string }[] }
> {
  private lock: boolean;

  constructor(props: Readonly<{ onSearch: (param: string) => void }>) {
    super(props);
    this.lock = false;
    this.state = { value:  '', options: [] };
  }

  render(): React.ReactNode {
    return (
      <AutoComplete
        options={this.state.options}
        onSelect={(param: string) => { this.setState({ value: param, options: [] }); this.props.onSearch(param) }}
      >
        <TextField id="standard-basic"
          label="請輸入要查詢的漢字" variant="standard"

          InputProps={{
            endAdornment: (
              <Fragment>
                {/* <Button size="small">繁簡</Button> */}

                <IconButton
                  onClick={() => { this.props.onSearch(this.state.value) }}
                  type="button" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Fragment>
            )
          }}
          inputProps={{
            value: this.state.value,
            onChange: (e) => this.onChange(e.currentTarget.value),
            onCompositionStart: () => this.lock = true,
            onCompositionEnd: () => { this.lock = false; this.onChange(this.state.value); }
          }}
        >
        </TextField>
      </AutoComplete>
    );
  }


  onChange(value: string) {
    this.setState({ value });
    if (!this.lock) {
      this.getCompleteList(value);
    }
  }

  getCompleteList(value: string) {
    value = value.trim();
    if (!value || value == '') this.setState({ options: [] });
    else {
      const simple = Simplized(value), tradition = Traditionalized(value);
      sqlite.select<{ character: string }[]>("select character from Dictionary \
        where character like '%" + simple + "%' or character like '%" + tradition + "%' ;").then(data => {
        const result = data.map(item => { return { value: item.character } });
        this.setState({ options: result });
      });
    }
  }

  call_back = (param: string) => {
    if (param.trim() !== this.state.value) {
      this.setState({ value: param.trim() });
    }
  }

  componentDidMount(): void {
    eventBus.addListener('search', this.call_back);
  }

  componentWillUnmount(): void {
    eventBus.removeListener('search', this.call_back);
  }
}


export default Search;





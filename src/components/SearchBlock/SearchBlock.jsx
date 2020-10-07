import React from "react";
import css from "./SearchBlock.module.css"

const SearchBlock = ({changeLocation}) => {
  return (
    <div className={css.searchBlock}>
      <span className={css.drawBar}></span>
      <input onKeyDown={(event) => changeLocation(event.target, event.target.value, event.keyCode)} className={css.searchBlockField} type="text" placeholder="Search city" />
    </div>
  )
}

export default SearchBlock;
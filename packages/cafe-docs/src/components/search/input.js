// Copyright 2019 Cengage Learning, Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// End license text.

import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"

import styled, { css } from "styled-components";
import { Search } from "styled-icons/fa-solid/Search";

const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
  margin-right: 10px
`
const focus = css`
  background: white;
  color: ${props => props.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${props => props.theme.darkBlue};
    margin: 0.3em;
  }
`
const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${props => props.focus && focus}
  margin-left: ${props => (props.focus ? `-1.6em` : `-1em`)};
  padding-left: ${props => (props.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${props => props.theme.gray};
  }
`
const expand = css`
  background: ${props => props.theme.veryLightGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`
const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: white;
  transition: ${props => props.theme.shortTrans};
  border-radius: ${props => props.theme.smallBorderRadius};
  {hightlight-next-line}
  ${props => (props.collapse ? collapse : expand)};
`
const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export default connectSearchBox(({ refine, ...rest }) => {
  const searchCustom = '';
  const preventSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <Form className={'formElement'} onSubmit={preventSubmit}>
      <SearchIcon />
      <Input
        className={'searchInput ' + searchCustom}
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={e => refine(e.target.value)}
        {...rest}
      />
    </Form>
  )}
);
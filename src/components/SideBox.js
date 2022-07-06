import React from 'react';
import {
  Settings,
  List,
  Download,
  Users
} from './Images';

export default function SideBox() {
  return (
    <div className='side-box' >
      <a href="#!">
        <Users />
      </a>
      <a href="#!">
        <List />
      </a>
      <a href="#!">
        <Download />
      </a>
      <a href="#!">
        <Settings />
      </a>
    </div>
  )
}

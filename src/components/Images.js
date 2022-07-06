import profilePic from '../images/svgs/top-profile.svg';
import bell from '../images/svgs/bell.svg';
import gift from '../images/svgs/gift.svg';
import search from '../images/svgs/search.svg';
import settings from '../images/svgs/settings.svg';
import list from '../images/svgs/list.svg';
import download from '../images/svgs/download.svg';
import users from '../images/svgs/users.svg';

// const ImgComp = ({ img_name }) => <img src={img_name} alt={img_name} />;

const ProfilePic = () => <img src={profilePic} alt="profilePic" />;
const Bell = () => (<img src={bell} alt='bell' />);
const Gift = () => (<img src={gift} alt='gift' />);
const Search = () => (<img src={search} alt='search' />);
const Settings = () => (<img src={settings} alt='settings' />);
const List = () => (<img src={list} alt='list' />);
const Download = () => (<img src={download} alt='download' />);
const Users = () => (<img src={users} alt='users' />);

export { 
  ProfilePic,
  Bell,
  Gift,
  Search,
  Settings,
  List,
  Download,
  Users
};
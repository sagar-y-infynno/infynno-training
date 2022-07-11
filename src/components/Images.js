import profilePic from '../images/svgs/top-profile.svg';
import bell from '../images/svgs/bell.svg';
import gift from '../images/svgs/gift.svg';
import search from '../images/svgs/search.svg';
import settings from '../images/svgs/settings.svg';
import list from '../images/svgs/list.svg';
import download from '../images/svgs/download.svg';
import users from '../images/svgs/users.svg';
import play from '../images/svgs/play.svg';
import imdb from '../images/svgs/imdb.svg';
import arrow_down from '../images/svgs/arrow_down.svg';
import eye from '../images/svgs/eye.svg';
import heart from '../images/svgs/heart.svg';
import redheart from '../images/svgs/redheart.svg';

// const ImgComp = ({ img_name }) => <img src={img_name} alt={img_name} />;

const ProfilePic = () => <img src={profilePic} alt="profilePic" />;
const Bell = () => (<img src={bell} alt='bell' />);
const Gift = () => (<img src={gift} alt='gift' />);
const Search = () => (<img src={search} alt='search' />);
const Settings = () => (<img src={settings} alt='settings' />);
const List = () => (<img src={list} alt='list' />);
const Download = () => (<img src={download} alt='download' />);
const Users = () => (<img src={users} alt='users' />);
const Play = () => (<img src={play} alt='play' />);
const Imdb = () => (<img src={imdb} alt='imdb' />);
const ArrowDown = () => (<img src={arrow_down} alt='arrow_down' />);
const Eye = () => (<img src={eye} alt='eye' />);
const Heart = () => (<img src={heart} alt='heart' />);
const RedHeart = () => (<img src={redheart} alt='redheart' />);

export { 
  ProfilePic,
  Bell,
  Gift,
  Search,
  Settings,
  List,
  Download,
  Users,
  Play,
  Imdb,
  ArrowDown,
  Eye,
  Heart,
  RedHeart
};
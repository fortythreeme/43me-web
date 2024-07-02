import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
// mui imports
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppState } from '@/store/store';
import ViewTask from '../ViewTask';
import moment from 'moment';
const ViewTaskAll = ({ item, onClick }) => {
 
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const customizer = useSelector((state) => state.customizer);
  const user = useSelector((state) => state.user);
  const Icon = item?.icon;
  const theme = useTheme();
  const { t } = useTranslation();
  const[tasks,setTasks] = useState()
  // const itemIcon =
  //     level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.3rem" />;
  const [tag1, setTags1] = useState([]);
  const ListItemStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '2px',
    padding: '8px 10px',
    borderRadius: `${customizer.borderRadius}px`,
    color: '#000000',
    // backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    // color:
    //   level > 1 && pathDirect === item?.href
    //     ? `${theme.palette.primary.main}!important`
    //     : theme.palette.text.secondary,
    // paddingLeft: hideMenu ? '10px' : level > 2 ? `${level * 15}px` : '10px',
    // '&:hover': {
    //   backgroundColor: theme.palette.primary.light,
    //   color: theme.palette.primary.main,
    // },
    '&.Mui-selected': {
      color: 'white',
      //   backgroundColor: theme.palette.primary.main,
      //   '&:hover': {
      //     backgroundColor: theme.palette.primary.main,
      //     color: 'white',
      //   },
    },
  }));

  const listItemProps = {
    component: item?.external ? 'a' : Link,
    to: item?.href,
    href: item?.external ? item?.href : '',
    target: item?.external ? '_blank' : '',
  };
  // useEffect(() => {
  //   if (item?.tags.length > 0) {
  //     let edit = item?.tags.map((obj) => obj.tag).join(',');
  //     // setTags(edit)
  //     const tagsArray = edit.split(',');
  //     setTags1(tagsArray);
  //   }
  // }, [item]);
  function checkDateFormat(paramsId) {
    // Check if paramsId matches the format 'YYYY-MM'
    return moment(paramsId, 'YYYY-MM', true).isValid();
  }
  useEffect(() => {
    const fetchData = async () => {
   
      let is_month = checkDateFormat(item.id);
      let data;
      if (is_month) {
        data = {
          is_month: is_month,
          month: item.id
        };
      } else {
        data = {
          is_month: is_month,
          date: item.id
        };
      }
      // console.log(data,"first")
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_APP}task-by-date`, data, {
          headers: {
            Authorization: `Bearer ${user?.currentUser?.token}`,
          },
        });
// console.log(response,'res')
        const filteredTasks = response.data.data.filter((task) => !task.is_completed);
        setTasks(filteredTasks);
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {' '}
      {tasks?.map((item) => (
        <ViewTask item={item} key={item._id} />
      ))}
    </>
  );
};

// OneDayList.propTypes = {
//     item: PropTypes.object,
//     // level: PropTypes.number,
//     // pathDirect: PropTypes.any,
//     // hideMenu: PropTypes.any,
//     onClick: PropTypes.func,
// };

export default ViewTaskAll;

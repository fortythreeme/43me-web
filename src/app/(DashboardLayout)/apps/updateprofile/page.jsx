'use client'
import React,{useState} from 'react'
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb'
import PageContainer from '../../components/container/PageContainer'
import AppCard from '../../components/shared/AppCard'
import { Typography, Box, TextField, Button } from '@mui/material'
import { useSelector,useDispatch } from 'react-redux'
import moment from 'moment-timezone'
import { Update } from '@/utils/apiCalls'
import { setUser } from '@/store/user/userSlice'
import { useRouter } from 'next/navigation'
import AuthRoute from '../../layout/vertical/sidebar/AuthRoute'
import AlertCart from '../../components/apps/ecommerce/productCart/AlertCart'
// import Box from '@mui/material'
const UpdateProfile = () => {
    const router = useRouter()
    // const moment = require('moment-timezone');
    const [text,setText]= useState('')
    const [textsev,setTextSev]= useState('')
    const [textShow,setTextShow]= useState(false) 
const dispatch = useDispatch()
function getCurrentTimezone() {
    return moment.tz.guess();
}
  const user = useSelector((state) => state.user);
    const [first, setfirst] = useState(user?.currentUser?.user.first_name)
    const [last, setlast] = useState(user?.currentUser?.user.last_name)
    const [email, setEmail] = useState(user?.currentUser?.user.email)
    const [mob, setmob] = useState(user?.currentUser?.user.mobile_no)
    const handleFirstNameChange = (event) => {
        setfirst(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setlast(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMobileChange = (event) => {
        setmob(event.target.value);
    };
    const handleSubmit = async () =>{
        const params = {
            id: user?.currentUser?.user._id,
    first_name: first,
    last_name: last,
    email: email,
    mobile_no: mob,
    timezone:getCurrentTimezone()
        }
        console.log(params,'paarams')
        try{
            const response = await Update(user?.currentUser?.token,params);
            console.log(response,'response')
            dispatch(setUser({
                ...user.currentUser,
                user: {
                    ...user.currentUser.user,
                    first_name: first,
                    last_name: last,
                    email: email,
                    mobile_no: mob,
                    timezone: getCurrentTimezone()
                }
            }));
            setTextShow(true);
            setText('UPDATED SUCCESSFULLY!')
            setTextSev('success')
            router.push('/');
        }
        catch(err){
            console.log(err)
        }
    }
    return (
        <AuthRoute>
        <PageContainer title="Task List" description="this is Contact">
            <Breadcrumb title="Update Profile" subtitle="Update Your  Information" />
            <AppCard >
                <Box className='updateprof'><Box><Typography className='UpdateText'>First Name</Typography>
                    <TextField id="standard-first" variant="standard" className='profField' value={first} onChange={handleFirstNameChange}/></Box>
                    <Box><Typography className='UpdateText'>Last Name</Typography>
                        <TextField id="standard-last" variant="standard" className='profField' value={last} onChange={handleLastNameChange}
/></Box>
                    <Box><Typography className='UpdateText'>Email</Typography>
                        <TextField id="standard-email" variant="standard" className='profField' value={email} onChange={handleEmailChange}   InputProps={{
            readOnly: true,
        }}/></Box>
                    <Box><Typography className='UpdateText'>Mobile</Typography>
                        <TextField id="standard-mob" variant="standard" className='profField' value={mob} onChange={handleMobileChange}/></Box>
              <Box className='updateDiv'>  <Button className='updateBut' onClick={handleSubmit}>Update</Button>
              </Box>     </Box>
            </AppCard>
        </PageContainer>
        <AlertCart open={textShow} text={text} sev={textsev}/></AuthRoute>
    )
}

export default UpdateProfile
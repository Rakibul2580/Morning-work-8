import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPersonWalking } from '@fortawesome/free-solid-svg-icons'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

import Myself from '../Myself/Myself';
import Break from '../Break/Break';
import Details from '../Details/Details';


const Body = () => {
    const [totlTime, settotlTime] = useState([])
    
    const notify = () => toast("Wow so easy!");

    const [datas, setDatas] = useState([])
    useEffect(()=>{
        fetch('fData.json')
        .then(res => res.json())
        .then(data => setDatas(data))
    },[]);

    const [breakTime, setBreakTime] = useState('0')
    const [localData, setLocalData] = useState('0')
    const setValue = (time) =>{
        localStorage.setItem('break', JSON.stringify(time))
        setBreakTime(time)
    }
    useEffect(()=>{
        const timeGet = localStorage.getItem('break')
        const timeGetPars = JSON.parse(timeGet)
        if(timeGetPars){
            setLocalData(timeGetPars)
        }
    },[breakTime])

    return (
        <div className='bg-white px-10 pt-10'>
            <h1 className='text-left text-blue-900 text-5xl font-bold'><FontAwesomeIcon icon={faPersonWalking}></FontAwesomeIcon> morning work</h1>
            <p className='text-2xl my-10 font-semibold text-white bg-gradient-to-r from-sky-400 to-indigo-400 p-5 w-full rounded-lg'>Select today’s exercise</p>
            <div className='block md:flex'>
                <div className='w-4/5'>
                <div className="grid grid-cols-1 gap-4">
                    {
                        datas.map(data => <Cart totlTime={totlTime} data={data} settotlTime={settotlTime} key={data._id}></Cart>)
                    }
                </div>
                </div>
                <div className='w-2/5'>
                    <Myself></Myself>
                    <Break setValue={setValue}></Break>
                    <Details localData={localData} totlTime={totlTime}></Details>
                    <button onClick={notify} className="btn bg-gradient-to-r from-sky-400 to-indigo-500 border-0 text-white w-45">Add Now</button><ToastContainer />
                </div>
            </div>
        </div>
    );
};

export default Body;
import React from 'react';
import axios from "axios"


const Verify = () => {


    axios.put(` https://mockauth.herokuapp.com/auth/verify-email`, {
        code: window.location.search.substr(6)
    }).then(response => {alert(`Подтверждено!`); console.log(response)}).catch(error => alert(`Ошибка подтверждения! ${error}`));




    return (
        <div>

        </div>
    );
};

export default Verify;
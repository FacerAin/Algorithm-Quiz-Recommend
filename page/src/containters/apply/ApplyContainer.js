import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ApplyForm from '../../components/apply/ApplyForm'
const ApplyContainer = ({history}) => {

    return (
        <ApplyForm
        />
    )
}

export default withRouter(ApplyContainer)
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../../components/common/Header'
import {logout, syncbj, get, level, weak} from '../../modules/user'

const HeaderContainer = () => {
    const {user} = useSelector(({user}) => ({user: user.user}))
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout())
    }
    const onSync = async () => {
        console.log(user.id)
        dispatch(syncbj({username: user.id}))
        dispatch(level({username: user.id}))
        dispatch(weak({username: user.id}))
        dispatch(get({username: user.id}))
    }
    return <Header user={user} onLogout={onLogout} onSync={onSync} />
}

export default HeaderContainer
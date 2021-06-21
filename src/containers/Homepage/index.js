import React, { useEffect } from 'react'
import { createSelector } from 'reselect'
import { makeSelectUsers } from './selector'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Userlist from '../Homepage/Userlist'
import { setUsers } from './action'

const stateSelector = createSelector(makeSelectUsers, (users) => ({
	users,
}))



const actionDispatch = (dispatch) => ({
	setUser: (users) => dispatch(setUsers(users)),
})

function Homepage(props) {
	const { users } = useSelector(stateSelector)
	const { setUser } = actionDispatch(useDispatch())

	const fetchUsers = async () => {
		const response = await axios
			.get('https://reqres.in/api/users')
			.catch((err) => {
				console.log('Err: ', err)
			})
		setUser(response.data.data)
		console.log(response.data.data)
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return <div><Userlist/></div>
}

export default Homepage

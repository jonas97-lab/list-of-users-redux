import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { createSelector } from 'reselect'
import { setUser } from './action'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { makeSelectUser } from './selector'

const UserContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`

const UserWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	cursor: pointer;
`

const UserImage = styled.div`
	width: 7em;
	height: 7em;

	img {
		width: 100%;
		height: 100%;
	}
`

const UserName = styled.h3`
	font-size: 20px;
	color: #000;
	margin: 0;
`

const UserEmail = styled.h3`
	font-size: 18px;
	color: #353535;
	margin: 0;
`

const stateSelector = createSelector(makeSelectUser, (user) => ({
	user,
}))

const actionDispatch = (dispatch) => ({
	setUser: (user) => dispatch(setUser(user)),
})

function Userpage(props) {
	const { user } = useSelector(stateSelector)
	const { setUser } = actionDispatch(useDispatch())
	const { userId } = useParams()

	const fetchUser = async (id) => {
		const response = await axios
			.get(`https://reqres.in/api/users/${id}`)
			.catch((err) => {
				console.log('Err: ', err)
			})
		console.log('User: ', response.data.data)

		if (response) setUser(response.data.data)
	}

	useEffect(() => {
		if (userId && userId !== '') fetchUser(userId)
	}, [userId])

	if (!user) return <div>Loading ...</div>

	return (
		<UserContainer>
			<UserWrapper>
				<UserImage>
					<img src={user.avatar} alt={user.first_name} />
				</UserImage>
				<UserName>
					{user.first_name} {user.last_name}
				</UserName>
				<UserEmail>{user.email}</UserEmail>
			</UserWrapper>
		</UserContainer>
	)
}

export default Userpage

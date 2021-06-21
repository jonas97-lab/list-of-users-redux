import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { makeSelectUsers } from './selector'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

const UsersContainers = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
`

const UserWrapper = styled.div`
	display: flex;
	flex-direction: column;
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

const stateSelector = createSelector(makeSelectUsers, (users) => ({
	users,
}))

function Userlist(props) {
	const { users } = useSelector(stateSelector)

	const isEmptyUsers = !users || (users && users.length === 0)

	const history = useHistory()

	const goToUserpage = (id) => {
		history.push(`/user/${id}`)
	}

	if (isEmptyUsers) return null

	return (
		<UsersContainers>
			{users.map((user, idx) => (
				<UserWrapper key={idx} onClick={() => goToUserpage(user.id)}>
					<UserImage>
						<img src={user.avatar} alt={user.first_name} />
					</UserImage>
					<UserName>
						{user.first_name} {user.last_name}
					</UserName>
				</UserWrapper>
			))}
		</UsersContainers>
	)
}

export default Userlist

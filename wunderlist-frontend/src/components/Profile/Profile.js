import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Container from '../../styles/Container';
import { Button } from '@smooth-ui/core-sc';
import { FaUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../../utils/axiosWithAuth';

const StyledProfile = styled.section`
	background-color: ${({ theme }) => theme.colors.primary};
	border-radius: 0 0 10px 10px;

	width: 100%;
	padding: 30px;
`;

const CurrentInfo = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;

	h1 {
		margin: 0 0 10px 0;
	}

	p {
		margin: 0;
		font-size: 1.1rem;
	}
`;

const AvatarInfo = styled.section`
	display: flex;
`;

const ProfileInfo = styled.section``;

const DefaultAvatar = styled(FaUserCircle)`
	fill: ${({ theme }) => theme.colors.secondary};
	font-size: 8.5rem;
	margin: 0 20px;
`;

const AvatarButtons = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const ProfileTab = styled.div`
	height: 54px;

	background: ${({ theme }) => theme.colors.secondary};

	border: ${({ theme }) => `2px solid ${theme.colors.primary}`};
	border-radius: 5px 5px 0 0;

	display: flex;
	align-items: center;

	padding: 0 30px;

	span {
		font-size: 1.333rem;
		font-weight: 600;
		margin: 0;
		color: ${({ theme }) => theme.colors.primary};
	}
`;

const Profile = () => {
	const [profile, setProfile] = useState({});

	const [updated, setUpdated] = useState(false);
	const history = useHistory();

	useEffect(() => {
		axiosWithAuth()
			.get('/profile')
			.then(res => {
				if (res.data.length >= 0) {
					setProfile(res.data.profile[res.data.profile.length - 1]);
				}
			})
			.catch(err => {
				console.log(err);
			});
	}, [updated]);

	const createProfile = userData => {
		axiosWithAuth()
			.post('/profile', {
				first_name: 'First',
				last_name: 'Name',
				age: 25,
				occupation: 'Developer'
			})
			.then(res => {
				setUpdated(true);
			})
			.catch(err => {
				console.log('Profile post error:', err);
			});
	};

	const editProfile = userData => {
		axiosWithAuth()
			.put('/profile/1')
			.then(res => {
				setUpdated(true);
			})
			.catch(err => {
				console.log('Profile put error:', err);
			});
	};

	const deleteProfile = userData => {
		axiosWithAuth()
			.delete('/delete/2')
			.then(res => {
				setProfile(res.userData);
			})
			.catch(err => {
				console.log('Profile delete error', err);
			});
   };
   
	const signOut = () => {
		localStorage.removeItem('AUTH_TOKEN');
      localStorage.removeItem('USER_ID');
      history.push('/login');
	};

	createProfile();
	return (
		<Container flexDirection='column'>
			<ProfileTab>
				<span>Profile Information</span>
			</ProfileTab>
			<StyledProfile>
				<CurrentInfo>
					<ProfileInfo>
						<h1>
							{profile.first_name && `${profile.first_name}`}
							{profile.last_name && ` ${profile.last_name}`}
						</h1>
						{profile.occupation && <p>{profile.occupation}</p>}
						{profile.age && <p>{profile.age} years old</p>}
					</ProfileInfo>
					<AvatarInfo>
						<DefaultAvatar />
						<AvatarButtons>
							<Button onClick={signOut} outline variant='secondary'>
								Sign Out
							</Button>
							<Button outline variant='secondary'>
								Change Avatar
							</Button>
							<Button outline variant='secondary'>
								Upload Avatar
							</Button>
							<Button outline variant='warning'>
								Delete Avatar
							</Button>
						</AvatarButtons>
					</AvatarInfo>
				</CurrentInfo>
			</StyledProfile>
		</Container>
	);
};

export default Profile;

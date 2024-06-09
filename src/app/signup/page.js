'use client';

import { db, auth } from '@/config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import FailedLoginModal from '@/components/failedloginmodal';

export default function SignUp() {
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userType, setUserType] = useState('Student');
	const router = useRouter();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				router.push('/dashboard');
			}
		});
	}, []);

	const handleSignup = async () => {
		try {
			await createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
				const user = userCredential.user;
				await fetch('/api/setUserInfo', {
					method: 'POST',
					body: JSON.stringify({
						name: firstName + ' ' + lastName,
						email: email,
						uuid: user.uid,
						userType: userType,
					}),
				});
			});
		} catch (error) {
			setError(true);
			setIsModalOpen(true);

			if (error.code === 'Firebase: Error (auth/email-already-exists)') {
				setErrorMessage('Email account already exists.');
			} else if (error.code === 'Firebase: Error (auth/invalid-password)') {
				setErrorMessage('Password must have at least 6 characters.');
			} else {
				setErrorMessage('An error occurred. Please try again.');
			}
		}
	};

	const onFirstNameChanged = (e) => {
		setFirstName(e.target.value);
	};

	const onLastNameChanged = (e) => {
		setLastName(e.target.value);
	};

	const onEmailChanged = (e) => {
		setEmail(e.target.value);
	};

	const onPasswordChanged = (e) => {
		setPassword(e.target.value);
	};

	const onUserTypeChange = (e) => {
		setUserType(e.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit(event);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleSignup();
	};

	return (
		<main className="flex justify-center inset-0 fixed items-center h-screen bg-gradient-to-r from-[#006e96] to-[#243c5a]">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<FailedLoginModal isOpen={isModalOpen} message={errorMessage} onClose={() => setIsModalOpen(false)} />

				<h2 className="text-2xl font-bold mb-4 text-slate-900">Sign Up</h2>

				<form onSubmit={handleSubmit}>
					<Input
						className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
						type="text"
						placeholder="First Name"
						onKeyDown={handleKeyDown}
						value={firstName}
						onChange={onFirstNameChanged}
						required
					/>
					<Input
						className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
						type="text"
						placeholder="Last Name"
						onKeyDown={handleKeyDown}
						value={lastName}
						onChange={onLastNameChanged}
						required
					/>
					<Input
						className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
						type="email"
						placeholder="Email"
						onKeyDown={handleKeyDown}
						value={email}
						onChange={onEmailChanged}
						required
					/>
					<Input
						className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
						type="password"
						placeholder="Password"
						onKeyDown={handleKeyDown}
						value={password}
						onChange={onPasswordChanged}
						required
					/>
					<select
						onChange={onUserTypeChange}
						className="mt-4 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text caret-blue-500 animate-blink-wide text-black"
					>
						<option value="Student" className="text-black">
							Student
						</option>
						<option value="Teacher" className="text-black">
							Teacher
						</option>
					</select>
					<Button
						onClick={handleSubmit}
						className="py-2 px-4 mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 shadow-gray-500/50 font-bold text-black"
					>
						Sign Up
					</Button>
				</form>
				<div className="mt-4 text-center">
					<span className="mr-2 text-slate-900">Already have an account?</span>
					<Link href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
						Log in
					</Link>
				</div>
			</div>
		</main>
	);
}

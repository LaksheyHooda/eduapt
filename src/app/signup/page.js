'use client';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FailedLoginModal from '@/components/failedloginmodal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Link } from '@nextui-org/react';

export default function SignUp() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [userType, setUserType] = useState('Student');
	const [error, setError] = useState(false);
	const [firstNameError, setFirstNameError] = useState('');
	const [lastNameError, setLastNameError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				router.push('/dashboard');
			}
		});
		return () => unsubscribe();
	}, [router]);

	const handleSignup = async () => {
		setLoading(true);
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			await fetch('/api/setUserInfo', {
				method: 'POST',
				body: JSON.stringify({
					name: `${firstName} ${lastName}`,
					email: email,
					uuid: user.uid,
					userType: userType,
				}),
			});
		} catch (error) {
			setError(true);
			setIsModalOpen(true);

			switch (error.code) {
				case 'auth/email-already-in-use':
					setErrorMessage('Email account already exists.');
					break;
				case 'auth/weak-password':
					setErrorMessage('Password must have at least 6 characters.');
					break;
				default:
					setErrorMessage('An error occurred. Please try again.');
					break;
			}
			setLoading(false);
		}
	};

	const validateForm = () => {
		let valid = true;

		if (!firstName) {
			setFirstNameError('First name is required.');
			valid = false;
		} else {
			setFirstNameError('');
		}

		if (!lastName) {
			setLastNameError('Last name is required.');
			valid = false;
		} else {
			setLastNameError('');
		}

		if (!email) {
			setEmailError('Email is required.');
			valid = false;
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			setEmailError('Email address is invalid.');
			valid = false;
		} else {
			setEmailError('');
		}

		if (!password) {
			setPasswordError('Password is required.');
			valid = false;
		} else if (password.length < 6) {
			setPasswordError('Password must be at least 6 characters.');
			valid = false;
		} else {
			setPasswordError('');
		}

		return valid;
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleSubmit(event);
		}
	};

	const handleFirstNameChange = (e) => {
		setFirstName(e.target.value);
		setFirstNameError('');
		if (error) {
			setError(false);
			setErrorMessage('');
			setIsModalOpen(false);
		}
	};

	const handleLastNameChange = (e) => {
		setLastName(e.target.value);
		setLastNameError('');
		if (error) {
			setError(false);
			setErrorMessage('');
			setIsModalOpen(false);
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
		setEmailError('');
		if (error) {
			setError(false);
			setErrorMessage('');
			setIsModalOpen(false);
		}
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setPasswordError('');
		if (error) {
			setError(false);
			setErrorMessage('');
			setIsModalOpen(false);
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (validateForm()) {
			handleSignup();
		} else {
			setError(true);
			setIsModalOpen(true);
			setErrorMessage('Please correct the errors in the form.');
			return;
		}
	};

	return (
		<main className="flex justify-center inset-0 fixed items-center h-screen bg-gradient-to-r from-[#006e96] to-[#243c5a]">
			<div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
				<FailedLoginModal isOpen={isModalOpen} message={errorMessage} onClose={() => setIsModalOpen(false)} />

				<h2 className="font-sans text-center text-4xl font-black text-slate-900">Sign Up</h2>

				<form className="p-2" onSubmit={handleSubmit}>
					<div>
						<Input
							className="font-mono text-xl mt-4 w-full rounded-2xl shadow-lg border-2 caret-blue-500 animate-blink-wide text-black"
							type="text"
							placeholder="First Name"
							onKeyDown={handleKeyDown}
							onChange={handleFirstNameChange}
							required
						/>
						{firstNameError && <p className="px-4 text-red-500 text-sm mt-1">{firstNameError}</p>}
					</div>

					<div>
						<Input
							className="font-mono text-xl mt-4 w-full rounded-2xl shadow-lg border-2 caret-blue-500 animate-blink-wide text-black"
							type="text"
							placeholder="Last Name"
							value={lastName}
							onKeyDown={handleKeyDown}
							onChange={handleLastNameChange}
							required
						/>
						{lastNameError && <p className="px-4 text-red-500 text-sm mt-1">{lastNameError}</p>}
					</div>

					<div className="mb-4">
						<Input
							className="font-mono text-xl mt-4 w-full rounded-2xl shadow-lg border-2 caret-blue-500 animate-blink-wide text-black"
							type="email"
							placeholder="Email"
							value={email}
							onKeyDown={handleKeyDown}
							onChange={handleEmailChange}
							required
						/>
						{emailError && <p className="px-4 text-red-500 text-sm mt-1">{emailError}</p>}
					</div>
					<div className="relative">
						<Input
							className="font-mono text-xl mt-4 w-full rounded-2xl shadow-lg border-2 caret-blue-500 animate-blink-wide text-black"
							placeholder="Password"
							type={showPassword ? 'text' : 'password'}
							onKeyDown={handleKeyDown}
							value={password}
							onChange={handlePasswordChange}
							required
						/>
						{passwordError ? (
							<button
								type="button"
								className="absolute inset-y-0 bottom-4 right-4 flex items-center text-gray-600"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
							</button>
						) : (
							<button
								type="button"
								className="absolute inset-y-0 right-4 flex items-center text-gray-600"
								onClick={togglePasswordVisibility}
							>
								{showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
							</button>
						)}
						{passwordError && <p className="px-4 text-red-500 text-sm">{passwordError}</p>}
					</div>
					<div className="mb-4 flex justify-end">
						<select
							onChange={(e) => setUserType(e.target.value)}
							className="font-serif w-3/4 text-center text-2xl mt-4 rounded-2xl shadow-lg border-2 caret-blue-500 animate-blink-wide text-black"
						>
							<option value="Student" className="text-black">
								Student
							</option>
							<option value="Teacher" className="text-black">
								Teacher
							</option>
						</select>
					</div>

					<Button
						onClick={handleSubmit}
						onKeyDown={handleKeyDown}
						disabled={isLoading}
						className="font-sans text-2xl px-4 mt-1 w-full bg-green-500 hover:bg-gray-500 text-white font-black  rounded-md"
					>
						{isLoading ? 'Signing up...' : 'Create Account'}
					</Button>
				</form>
				<div className="translate-y-4 text-center">
					<span className="font-sans mr-1 text-slate-900">Already have an account?</span>
					<Link href="/login" className="font-sans text-blue-500 hover:text-blue-700 font-medium">
						Log in
					</Link>
				</div>
			</div>
		</main>
	);
}

'use client';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FailedLoginModal from '@/components/failedloginmodal';
import { useEffect, useState } from 'react';
import { Input } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/config';
import {
	signInWithEmailAndPassword,
	setPersistence,
	browserLocalPersistence,
	browserSessionPersistence,
} from 'firebase/auth';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [error, setError] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
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

	const handleLogin = async () => {
		setLoading(true);
		try {
			await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setError(true);
			setIsModalOpen(true);

			switch (error.code) {
				case 'auth/invalid-email':
					setErrorMessage('Invalid email address.');
					break;
				case 'auth/user-not-found':
					setErrorMessage('User not found.');
					break;
				case 'auth/wrong-password':
					setErrorMessage('Incorrect password.');
					break;
				default:
					setErrorMessage(error.message);
					break;
			}
			setLoading(false);
		}
	};

	const validateForm = () => {
		let valid = true;
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

	const handleRememberMeChange = (e) => {
		setRememberMe(e.target.checked);
	};

	const handleSubmit = (event) => {
		if (validateForm()) {
			handleLogin();
		} else {
			setError(true);
			setIsModalOpen(true);
			setErrorMessage('Please correct the errors in the form.');
			return;
		}
	};

	return (
		<main className="flex justify-center inset-0 fixed items-center h-screen bg-gradient-to-r from-[#006e96] to-[#243c5a]">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<FailedLoginModal isOpen={isModalOpen} message={errorMessage} onClose={() => setIsModalOpen(false)} />

				<h2 className="font-sans text-center text-4xl font-black text-slate-900 mb-4">Welcome to EduApt!</h2>

				<form className="p-2" onSubmit={handleSubmit}>
					<div className="mb-4">
						<Input
							className="font-mono text-xl w-full rounded-2xl shadow-lg border-2 caret-blue-500 animate-blink-wide text-black"
							placeholder="Email"
							onKeyDown={handleKeyDown}
							value={email}
							onChange={handleEmailChange}
							required
						/>
						{emailError && <p className="px-4 text-red-500 text-sm mt-1">{emailError}</p>}
					</div>
					<div className="mb-2 relative">
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
						{passwordError && <p className="px-4 text-red-500 text-sm mt-1">{passwordError}</p>}
					</div>

					<div className="px-4 flex justify-between items-center mb-4">
						<div>
							<input
								type="checkbox"
								id="remember"
								name="remember"
								className="mr-2"
								onChange={handleRememberMeChange}
							/>
							<label htmlFor="remember" className="font-medium text-slate-900">
								Remember me
							</label>
						</div>
						<Link href="/forgotPassword" className="text-blue-500 hover:text-blue-700 font-medium">
							Forgot password?
						</Link>
					</div>
					<Button
						onClick={handleSubmit}
						onKeyDown={handleKeyDown}
						disabled={isLoading}
						className="font-sans font-black text-2xl w-full bg-green-500 hover:bg-gray-500 text-white rounded-md"
					>
						{isLoading ? 'Logging in...' : 'Login'}
					</Button>
				</form>

				<div className="translate-y-4 text-center">
					<span className="font-sans mr-1 text-slate-900">Don't have an account?</span>
					<Link href="/signup" className="font-sans text text-blue-500 hover:text-blue-700 font-medium">
						Sign up
					</Link>
				</div>
			</div>
		</main>
	);
}

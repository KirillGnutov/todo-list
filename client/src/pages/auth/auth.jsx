import React, { useReducer } from 'react';
import styles from './auth.module.css'
const initialForm = {
	username: '',
	password: '',
	email: '',
	confirmPassword: '',
	errors: {},
	isSubmitting: false,
};

const formReducer = (state, action) => {
	switch (action.type) {
		case 'set_field':
			return {
				...state,
				[action.field]: action.value,
				errors: { ...state.errors, [action.field]: '' },
			};
		case 'set_errors':
			return { ...state, errors: action.errors, isSubmitting: false };
		case 'set_submit':
			return { ...state, isSubmitting: true };
		case 'set_reset':
			return initialForm;
		default:
			return state;
	}
};

const validateForm = (formData) => {
  const errors = {}

  if(!formData.username.trim()){
    errors.username = "Имя пользователя обязательно!!!"
  }
	else if(/[^a-zA-Z0-9]/.test(formData.username)){
		errors.username = "Использованы запрещенные символы!!!"
	}

	if(!formData.email.trim()){
		errors.email = "Почта обязательная!!!"
	}
	else if(!/\S+@\S+\.\S+/.test(formData.email)){
		errors.email = "Некоректная почта!!!"
	}

	if(!formData.password.trim()){
		errors.password="Введите пароль!!!"
	}
	else if(formData.password.trim().length < 6){
		errors.password="Короткий пароль!!!"
	}

	if(formData.password != formData.confirmPassword){
		errors.confirmPassword = "Пароли не совпадают!!!"
	}
	return errors;

};

const AuthPage = () => {
	const [state, dispatch] = useReducer(formReducer, initialForm);
	const handleInputChange = (field, value) => {
		dispatch({ type: 'set_field', field, value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validateForm(state);
		if (Object.keys(errors).length > 0) {
			dispatch({ type: 'set_errors', errors });
			return;
		}
		dispatch({ type: 'set_submit' });
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			console.log({ username: state.username, email: state.email });
			alert('ВЫ ЗАРЕГИСТРИРОВАЛИСЬ');
			dispatch('set_reset');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.authPage}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<div>
					<label className={styles.formRow}>
						username:
						<input
							type="text"
							value={state.username}
							onChange={(e) => handleInputChange('username', e.target.value)}
							style = {{
								border: state.errors.username?"1px solid red":"none"
							}}
						/>
					</label>
          {state.errors.username && (
            <span>
              {state.errors.username}
            </span>
          )}
				</div>
				<div>
					<label className={styles.formRow}>
            email:
						<input type="text" 
							value={state.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
						/>

					</label>
					{state.errors.email && (
						<span>
							{state.errors.email}
						</span>
					)}
				</div>
				<div>
					<label className={styles.formRow}>
						password:
						<input type="password" 
							value={state.password}
							onChange={(e)=> handleInputChange('password', e.target.value)}
						/>
					</label>
					{state.errors.password && (
						<span>
							{state.errors.password}
						</span>
					)}
				</div>
				<div>
					<label className={styles.formRow}>
						confirmPassword:
						<input type="password" 
							value={state.confirmPassword}
							onChange={(e)=> handleInputChange('confirmPassword', e.target.value)}
						/>
					</label>
					{state.errors.confirmPassword && (
						<span>
							{state.errors.confirmPassword}
						</span>
					)}
				</div>
				<button type='submit' disabled={state.isSubmitting} className={styles.button}>
					{state.isSubmitting?"регистрация...":"зарегистрироваться"}
				</button>
			</form>
		</div>
	);
};

export default AuthPage;

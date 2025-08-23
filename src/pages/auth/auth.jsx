import { resolve } from 'path';
import React, { useReducer } from 'react';

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
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						username:
						<input
							type="text"
							value={state.username}
							onChange={(e) => handleInputChange('username', e.target.value)}
						/>
					</label>
          {state.errors.username && (
            <span>
              {state.errors.username}
            </span>
          )}
				</div>
				<div>
					<label>
            email:
						<input type="text" />
					</label>
				</div>
				<div>
					<label>
						<input type="text" />
					</label>
				</div>
				<div>
					<label>
						<input type="text" />
					</label>
				</div>
				<div>
					<label>
						<input type="text" />
					</label>
				</div>
			</form>
		</div>
	);
};

export default AuthPage;

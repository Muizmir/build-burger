import React, { useState, useEffect } from 'react';
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';
import Spinner from '../../components/ui/spinner/spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/exported-actions';
import CheckValidity from '../../shared/check-validity';
import './auth.css';

const Auth = props => {
    const { loading, error, path, isAuthenticated, building, onAuth, onSetAuthRedirectPath} = props;
    const [controls, setControls] = 
       useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        });
       
    const [ isSignup, setIsSignup ] = useState(false);

    useEffect(() => {
        if (!building && path !== '/') {
            onSetAuthRedirectPath();
        }
    }, [building, path, onSetAuthRedirectPath])

    const onChangeHandler = (e, controlName) => {
        const updatedControls = {
            ...controls,
            [controlName]:{
                ...controls[controlName],
                value: e.target.value,
                valid: CheckValidity(e.target.value, controls[controlName].validation),
                touched: true
            }
         };
        
        setControls(updatedControls);
    }

    const submitHandler = e => {
        e.preventDefault();
        onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

   
        const formElementsArray = [];
        for (let key in controls) {
            formElementsArray.push({
                id: key,
                config: controls[key]
            })
        }

        let form = (
            <form onSubmit={ submitHandler }>
                {formElementsArray.map(el => (
                    <Input key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(e) => onChangeHandler(e, el.id)} />
                ))}
                <Button btnType='Success'> SUBMIT </Button>
            </form>
        )

        if(loading){
            form = <Spinner />;
        }

        let errorMessage = null;
        if(error){
            errorMessage = <p className='ErrorMessage'>{ error.message }</p>;
        }

        let authRedirect = null;
        if(isAuthenticated){
            authRedirect = <Redirect to={ path } />;
        }
        return(
            <div className='Auth'>
                <p className='AuthHeading'>{ !isSignup ? 'SIGN IN' : 'SIGN UP' }</p>
                { authRedirect }
                { errorMessage }
                { form }
                <Button 
                    btnType='Danger'
                    clicked={ switchAuthModeHandler } >
                        SWITCH TO { isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        path: state.auth.path
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPage('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
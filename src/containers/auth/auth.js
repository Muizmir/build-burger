import React from 'react';
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';
import Spinner from '../../components/ui/spinner/spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/exported-actions';
import CheckValidity from '../../shared/check-validity';
import './auth.css';

class Auth extends React.Component {

    state = {
        controls:{
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
        },
        signUp: false
    }

    componentDidMount(){
        if(!this.props.building && this.props.path !=='/'){
            this.props.setAuthRedirectPage()
        }
    }

    onChangeHandler(e, controlName) {
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: e.target.value,
                valid: CheckValidity(e.target.value, this.state.controls[controlName].validation),
                touched: true
            }
         };
        
        this.setState({ controls: updatedControls });
    }

    submitHandler = e => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.signUp);
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => { 
            return { signUp: !prevState.signUp }
        })
    }

    render(){
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={ this.submitHandler }>
                {formElementsArray.map(el => (
                    <Input key={el.id}
                        elementType={el.config.elementType}
                        elementConfig={el.config.elementConfig}
                        value={el.config.value}
                        invalid={!el.config.valid}
                        shouldValidate={el.config.validation}
                        touched={el.config.touched}
                        changed={(e) => this.onChangeHandler(e, el.id)} />
                ))}
                <Button btnType='Success'> SUBMIT </Button>
            </form>
        )

        if(this.props.loading){
            form = <Spinner />;
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{ this.props.error.message }</p>;
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={ this.props.path } />;
        }
        return(
            <div className='Auth'>
                { authRedirect }
                { errorMessage }
                { form }
                <Button 
                    btnType='Danger'
                    clicked={this.switchAuthModeHandler } >
                        SWITCH TO { this.state.signUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
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
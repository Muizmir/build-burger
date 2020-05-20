import React, { useState } from 'react';
import Button from '../../../components/ui/button/button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/spinner/spinner';
import Input from '../../../components/ui/input/input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ErrorHandler from '../../../hocs/error-handler/error-handler';
import * as actions from '../../../store/actions/exported-actions';
import CheckValidity from '../../../shared/check-validity';
import './contact-data.css';

const ContactData = props => {
    const { ings, price, loading, token, userId, onBurgerOrder } = props;
    const [ orderForm, setOrderForm ] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'State Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            delivery: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        });
        const [ formValid, setFormValid ] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData= {};
        for(let key in orderForm){
            formData[key] = orderForm[key].value;
        }
        const order = {
            ingredients: ings,
            price: price,
            customer: formData,
            userId: userId
        }        
        onBurgerOrder(order, token);
    }

    const onChangeHandler = (e, inputIdentifier) => {
        const updatedForm = { ...orderForm };
        const updatedFormElement = { ...updatedForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = CheckValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let key in updatedForm){
            formIsValid = updatedForm[key].valid && formIsValid;
        }
        setOrderForm(updatedForm);
        setFormValid(formIsValid);
    }

 
        const formElementsArray =[];
        for(let key in orderForm){
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            })
        }

        let form = (
            <form onSubmit={ orderHandler }>
                { formElementsArray.map( el => (
                    <Input key={ el.id }
                           elementType={ el.config.elementType } 
                           elementConfig={ el.config.elementConfig }
                           value={ el.config.value }
                           invalid={ !el.config.valid }
                           shouldValidate={ el.config.validation }
                           touched={ el.config.touched }
                           changed={(e) =>  onChangeHandler(e, el.id) } />
                ))}
                <Button btnType='Success' disabled={ !formValid } clicked={ orderHandler }> ORDER </Button>
            </form>
        )

        if (loading){
            form = <Spinner />
        }

        const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;

        return(
            <div className='ContactData'>
                <h4> Enter delivery details </h4>
                    { purchasedRedirect }
                    { form }
            </div>
        )
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onBurgerOrder: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));
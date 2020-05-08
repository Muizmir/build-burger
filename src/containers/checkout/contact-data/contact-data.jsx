import React from 'react';
import Button from '../../../components/ui/button/button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/spinner/spinner';
import Input from '../../../components/ui/input/input';
import './contact-data.css';

class ContactData extends React.Component {
    state={
        orderForm:{
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
                    minLength: 5,
                    maxLength: 5
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
                    required: true
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
        },
        loading: false,
        formValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({ loading: true })
        const formData= {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData
        }
        axios.post('/orders.json', order).then( response => {
            this.setState({ loading: false })
            this.props.history.push('/');
        }).catch(error => this.setState({ loading: false }))
    }

    checkValidity(value, rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    onChangeHandler(e, inputIdentifier){
        const updatedForm = { ...this.state.orderForm };
        const updatedFormElement = { ...updatedForm[inputIdentifier] };
        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let key in updatedForm){
            formIsValid = updatedForm[key].valid && formIsValid;
        }
        this.setState({ orderForm: updatedForm, formValid: formIsValid });
    }

    render(){
        const formElementsArray =[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={ this.orderHandler }>
                { formElementsArray.map( el => (
                    <Input key={ el.id }
                           elementType={ el.config.elementType } 
                           elementConfig={ el.config.elementConfig }
                           value={ el.config.value }
                           invalid={ !el.config.valid }
                           shouldValidate={ el.config.validation }
                           touched={ el.config.touched }
                           changed={(e) =>  this.onChangeHandler(e, el.id) } />
                ))}
                <Button btnType='Success' disabled={ !this.state.formValid } clicked={this.orderHandler}> ORDER </Button>
            </form>
        )

        if (this.state.loading){
            form = <Spinner />
        }
        return(
            <div className='ContactData'>
                <h4> Enter contact details </h4>
                    { form }
            </div>
        )
    }
}

export default ContactData;
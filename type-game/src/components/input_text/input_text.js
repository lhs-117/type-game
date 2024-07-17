import React, { Component } from 'react';

class InputText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
        this.inputRef = React.createRef(); // Create a ref for the input element
    }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value }, () => {
            // Focus the input element after the state is updated
            this.inputRef.current.focus();
        });
    }

    render() {
        return (
            <form>
                <input 
                    type="text" 
                    value={this.state.inputValue} 
                    onChange={this.handleChange} 
                    ref={this.inputRef} // Assign the ref to the input element
                />
            </form>
        );
    }
}

export default InputText;

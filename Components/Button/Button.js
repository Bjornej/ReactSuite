import React from "react";

export default React.createClass({
    getInitialState() {
        return { disabled: this.props.disabled !== undefined ? this.props.disabled : false };
    },

    componentWillReceiveProps(next) {
        if (next.disabled != this.props.disabled) {
            this.setState({ disabled: next.disabled });
        }
    },

    onClick(e) {
        if (this.state.disabled) {
            return;
        }

        var res = this.props.onClick(e);
        if (res == undefined) {
            return;
        }

        if (res.always || res.then) {
            this.setState({ disabled: true });
            if(res.always){
                res.always(x => this.setState({ disabled: false }));
            }else{
                res.then(x => this.setState({ disabled: false }));
            }
        }
    },

    render() {
        return (
            <button
                type="button"
                {...this.props}
                disabled={this.state.disabled}
                onClick={this.onClick}            
            >
                {this.props.children}
            </button>);
    }
});
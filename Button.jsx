import React from "react";

export default React.createClass({
    getInitialState() {
        var disabled = false;
        if (!(this.props.disabled === undefined)) {
            disabled = this.props.disabled;
        }

        return { disabled: disabled };
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

        if (res.always) {
            this.setState({ disabled: true });
            res.always(x => this.setState({ disabled: false }));
        }
    },

    render() {
        return (
            <button
                type="button"
                {...this.props}
                className={this.props.className}
                disabled={this.state.disabled}
                onClick={this.onClick}>
                {this.props.children}
            </button>);
    }
});
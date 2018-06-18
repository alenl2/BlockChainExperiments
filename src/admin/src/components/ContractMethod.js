import React, { Component } from 'react'
import BigNumber from 'bignumber.js'
import {Modal, Icon, Input, Button, Table,List  } from 'semantic-ui-react'

class ContractMethod extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const instance = this.props.instance;
        const index = this.props.index;
        var method = instance.abi[index].name;

        if (instance.abi[index].type === "constructor") {
            method = "constructor";//Set the name and continue processing
        }

        if (instance.abi[index].type === "fallback") {
            method = "fallback";
            const runFunctionButton = <Button fluid name={method} onClick={this.handleFallbackEvent.bind(this)}><Icon name="cloud upload"/> {"Send ETH"}</Button>;
            this.setState({ runFunctionButton: runFunctionButton })
            this.setState({ methodName: "Send ETH" })
            const input = <List divided relaxed><List.Item><List.Content><List.Header><Input fluid type="number" name="fallbackInput" value={this.state.fallbackInput} onChange={this.handleInputChange.bind(this)} label="ETH" /></List.Header></List.Content></List.Item></List>
            this.setState({ inputs: input })
            this.setState({ "outputs": JSON.stringify(this.processOutputs(instance.abi[index].outputs)) })
            return;
        }

        this.setState({ methodToRun: method })
        const methodName = this.capitalizeFirstLetter(method.replace("_", ""))

        //If we are talking about an event use special logic
        if (instance.abi[index].type === "event") {
            const inputs = []
            for (var l = 0; l < instance.abi[index].inputs.length; l++) {
                const input = instance.abi[index].inputs[l].name
                const inputName = this.capitalizeFirstLetter(input.replace("_", ""))
                inputs.push(inputName + "(" + instance.abi[index].inputs[l].type + ")")
            }
            const ev = "( "+inputs.join(", ")+" )"
            this.setState({ isEvent: true })
            this.setState({ methodName: "Event: "+methodName })
            this.setState({ resultState: ev })
            //todo some kind of support
            return;
        }

        //Create inputs
        const inputs = []
        for (var j = 0; j < instance.abi[index].inputs.length; j++) {
            const input = instance.abi[index].inputs[j].name
            var type = "text";
            var sufix = "";
            if (instance.abi[index].inputs[j].type.includes("int")) {
                type = "number";
                if (this.props.multiplayer !== undefined) {
                    sufix = " (x10^-18)"
                }
            }
            const inputName = this.capitalizeFirstLetter(input.replace("_", "")) + " (" + instance.abi[index].inputs[j].type + ")"
            var x = <List.Item><List.Content><List.Header><Input fluid type={type} key={j} name={input} value={this.state[input]} onChange={this.handleInputChange.bind(this)} label={inputName + sufix} /></List.Header></List.Content></List.Item>
            inputs.push(x)
        }
        this.setState({ inputs: <List>{inputs}</List> })

        //Create outputs
        this.setState({ "outputs": JSON.stringify(this.processOutputs(instance.abi[index].outputs)) })

        //Create method name text
        this.setState({ methodName: this.capitalizeFirstLetter(methodName) })


        if (instance.abi[index].stateMutability === "view") {
            if (inputs.length === 0 && this.props.address !== "0x0") {
                this.setState({ isView: true })
                this.update(true, method)
            } else {
                const runFunctionButton = <Button fluid name={method} onClick={this.handleViewEvent.bind(this)}><Icon name="cloud upload"/>Run {methodName}</Button>
                this.setState({ runFunctionButton: runFunctionButton })
            }

        } else {
            const runFunctionButton = <Button fluid name={method} onClick={this.handleExecuteEvent.bind(this)}><Icon name="cloud upload"/>Run {methodName}</Button>
            this.setState({ runFunctionButton: runFunctionButton })
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleViewEvent(event) {
        const target = event.target;
        const name = target.name;
        const instance = this.props.instance;

        this.setState({ resultState: "Waiting for confermation" })

        instance[name].call(...this.collectArguments()).then(async (result) => {
            this.processResult(result);
        }).catch((error) => {
            this.processError(error)
        })
    }

    handleExecuteEvent(event) {
        const target = event.target;
        const name = target.name;
        const instance = this.props.instance;
        this.setState({ resultState: "Waiting for confermation" })

        if (name === "constructor") {
            this.props.truffle.new(...this.collectArguments()).then(async (result) =>{
                var link = <a href={this.props.contract + "=" + result.address}>{result.address}</a>
                this.setState({ resultState: link });
            }).catch((error) => {
                this.processError(error)
            })
        }else{
            instance[name](...this.collectArguments()).then(async (result) => {
                this.setState({ resultState: "TX " + result.tx });
            }).catch((error) => {
                this.processError(error)
            })
        }
    }

    handleFallbackEvent(event) {
        const instance = this.props.instance;

        this.setState({ resultState: "Waiting for confermation" })
        if(this.state.fallbackInput === undefined){
            return;
        }
        var value = new BigNumber(this.state.fallbackInput);

        if (this.props.multiplayer !== undefined) {
            value = value.times(this.props.multiplayer)
        }

        instance.sendTransaction({ value: value }).then(async (result) => {
            console.log(result);
            this.setState({ resultState: "TX " + result.tx });
        }).catch((error) => {
            this.processError(error)
        })
    }

    collectArguments() {
        const instance = this.props.instance;
        const index = this.props.index;

        var args = []
        for (var k = 0; k < instance.abi[index].inputs.length; k++) {
            const input = instance.abi[index].inputs[k].name
            var arg = this.state[input];
            if (instance.abi[index].inputs[k].type.includes("int") && this.props.multiplayer !== undefined) {
                if(arg === undefined){
                    return;
                }
                arg = new BigNumber(arg);
                arg = arg.times(this.props.multiplayer)
            }
            args.push(arg);
        }
        console.log(args)
        return args;
    }

    processError(error) {
        var err = error.toString();
        err = err.substring(err.indexOf("} Error:") + 1);
        this.setState({ resultState: err });
    }
    
    processResult(result) {
        var res = result
        var sufix = "";
        if (result.dividedBy !== undefined && this.props.multiplayer !== undefined) {
            res = result.dividedBy(this.props.multiplayer)
            sufix = " (x10^18)"
        }
        this.setState({ resultState: res.toString() + sufix });
    }

    processOutputs(outputs) {
        if (outputs === undefined) {
            return [];
        }
        var collected = []
        for (var i = 0; i < outputs.length; i++) {
            collected.push(outputs[i].type);
        }
        return collected;
    }

    //called externely on contract events
    update(isView, method = this.state.methodToRun) {
        if (this.state.isView || isView) {
            //if its a normal view withoit params we can update the data
            this.props.instance[method].call().then(async (result) => {
                this.processResult(result);
            });
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    render() {
        var trigger = <List.Item><List.Icon name="code"/><List.Content><List.Header as='a'>{this.state.methodName}</List.Header></List.Content></List.Item>
        if(this.state.isView || this.state.isEvent){
            trigger = <List.Item><List.Icon name="podcast"/><List.Content><List.Header>{this.state.methodName+": "+this.state.resultState}</List.Header></List.Content></List.Item>
            return (
                trigger
            )
        }
        return (
            <Modal  trigger={trigger}>
                <Modal.Header><Icon name="code"/>{this.state.methodName}</Modal.Header>
                <Modal.Content>
                    {this.state.inputs} 
                    {this.state.runFunctionButton} 
                    <Table>
                        <Table.Body>
                            <Table.Row>
                            <Table.Cell>Outputs</Table.Cell>
                            <Table.Cell>{this.state.outputs}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                            <Table.Cell>Result</Table.Cell>
                            <Table.Cell>{this.state.resultState}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ContractMethod
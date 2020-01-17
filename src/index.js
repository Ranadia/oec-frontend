import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.scss';


class Index extends React.Component {

    constructor(){
        super()
        this.state = {
            name: "",
            info: "",
            result: ""
        }
    }

    componentDidMount(){
        this.getStaticData()
    }

    async getStaticData(){
        let options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.get("http://localhost:8080/api/v1/staticData", options)
            .then(res => {
                this.setState({
                    name: res.data.Name,
                    info: res.data.Info
                })
            });   
    }

    async PostCalculation(){
        var a = document.getElementById('a').value;
        var b = document.getElementById('b').value;
        var typeOfCalc = document.getElementById('typeOfCalc').value;


        // Error handling for wrong type of input necessary aswell!
        if(a === "" || b === "" || typeOfCalc === ""){
            this.setState({
                result: "Values not set. Please set values."
            });
            return ;
        }

        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': '*'
            }
        }

        var calc = {
            'firstNumber': a,
            'secondNumber': b,
            'typeOfCalculation': typeOfCalc
        }

        console.log(calc);
        console.log(options)

        await axios.post("http://localhost:8080/api/v1/postCalculation", calc)
            .then(res => {
                console.log(res.data)
            });

    }
    
    render () {
        return (
            <div id="body">
                <div>
                    <p id="name">{this.state.name}</p>
                    <p id="info">{this.state.info}</p>
                </div>
                <div id="inputForm">
                    <form>
                        <input id="a" type="text" placeholder="1"/><br/>
                        <input id="b" type="text" placeholder="2"/><br/>
                        <input id="typeOfCalc" type="text" placeholder="plus, minus, multiply or divide"/><br/>
                        <input id="calculate" type="button" value="Calculate" onClick={this.PostCalculation.bind(this)}/>
                    </form>

                    <p>Result: <br/> {this.state.result}</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <Index/>,
    document.getElementById('root')
)
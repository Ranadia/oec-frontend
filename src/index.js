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
            result: "test"
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
        console.log("PostCalculation....")
        
        var a = document.getElementById('a').value;
        var b = document.getElementById('b').value;
        var typeOfCalc = document.getElementById('typeOfCalc').value;

        if(a === "" || b === "" || typeOfCalc === ""){
            this.setState({
                result: "Values not set. Please set values."
            });
            return ;
        }

        let options = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
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

        await axios.post("http://localhost:8080/api/v1/postCalculation", calc, options)
            .then(res => {
                console.log(res)
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
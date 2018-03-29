import React, { Component } from "react";
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardTitle} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import actionCreator from "../../redux/actionCreators.js";

const mapStateToProps = (state) => {
    console.log(state);
    return {   
    // companyName: state.companyName,
    // companyBudget: state.companyBudget,  
    departmentList: Object.keys(state),
    state: state
}};

const mapDispatchToProps = (dispatch) => ({
    
    addTransaction: (deptName, transaction) => {
      dispatch(actionCreator.addTransaction(deptName, transaction));
    }

}); 

class Home extends Component {
  constructor() {
      super();
      this.state= {
        value: 0
      }
  this.handleChange = this.handleChange.bind(this);
  this.addSub = this.addSub.bind(this);
  }

  handleChange(event, index, value) {
      this.setState({value})
      
  };
  
  addSub(){
      let amount = document.getElementById("addTransaction").value; 
      let target = this.props.departmentList[this.state.value];
      console.log("AMOUNT", amount);
      console.log("TARGET", target);  
      this.props.addTransaction(target, parseInt(amount));
  }

  render() {
    // Generate data
    let result = this.props.departmentList.map(function(el){
        return [el]; 
    });
    let listTotalTransaction = []; 
    for (let category in this.props.state){
        listTotalTransaction.push(
            this.props.state[category].reduce((acc, cv)=>{
                return acc+=cv; 
            }, 0) 
        );
    };
    console.log("!!!!!!!!!!!!",listTotalTransaction);
    let category = [];
    let dottedBase = +new Date();
    let lineData = [parseInt(this.props.companyBudget)];
    let barData = [];
    // let departmentListName = this.props.department.map(ele => {
    //   return [ele];
    // })
    //console.log("DepartmentListName!!!!!",departmentListName);
    // let departmentListBudget = this.props.department.map(ele => {
    //   return ele.departmentBudget;
    // })
    let departmentDropDownList = []
    //console.log("DepartmentDropDownList!!!!!!!!!",departmentDropDownList);
    // console.log('NOOOOO', departmentListName);
    // console.log('WHYYYYYYY', departmentListBudget);
    // determines how many blue lines...
    console.log("departmentList!!!!!!!!",this.props.departmentList);
    for (let i = 0; i < this.props.departmentList.length; i++) {
      //lineData.push(parseInt(departmentListBudget[i]));
      barData.push(parseInt(listTotalTransaction[i]));
      category.push(result[i]);
      departmentDropDownList.push(<MenuItem key={i} value={i} primaryText={this.props.departmentList[i]}/>)
    }
    let option = {
      backgroundColor: '#0f375f',
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      legend: {
          data: ['line', 'bar'],
          textStyle: {
              color: '#ccc'
          }
      },
      xAxis: {
          data: category,
          axisLine: {
              lineStyle: {
                  color: '#ccc'
              }
          }
      },
      yAxis: {
          splitLine: {show: false},
          axisLine: {
              lineStyle: {
                  color: '#ccc'
              }
          }
      },
      series: [{
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData
      }, {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
              normal: {
                  barBorderRadius: 5,
                  color: '#00FF00'
              }
          },
          data: barData
      }, {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
              normal: {
                  color: '#FFFF00'
              }
          },
          z: -12,
          data: lineData
      }, {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
              normal: {
                  color: '#0f375f'
              }
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData
      }]
    };
      return (
        <div>
          <AppBar
          iconElementLeft={
          <div>
            <Link to="/creation">    
              <RaisedButton label="Create" primary={true} />
            </Link>
            <Link to="/">
              <RaisedButton label="Home" primary={true} />
            </Link>
          </div>
          }
          />
        <ReactEcharts 
        option={option} 
        style={{height: '400px', width: '100%'}}  
        opts={{renderer: 'svg'}}  
        className='react_for_echarts' />
        <Card> 
          <CardTitle title="Add/Subtract Transaction"/>
            <Card>
              <CardActions>
                <DropDownMenu 
                  style={{width: 200}}
                  autoWidth={false}
                  value={this.state.value} 
                  onChange={this.handleChange}>
                {departmentDropDownList}
                </DropDownMenu>
              </CardActions>
            </Card>
            <CardActions>
              <TextField
              id = "addTransaction"
              hintText="$100,000,000 or -$100,000,000"
              floatingLabelText="Transaction"
              floatingLabelFixed={true}
              />
              <RaisedButton 
              label="Add/Subtract Transaction" 
              primary={true} 
              onClick = {this.addSub}
              style={{margin: 12}}/>
            </CardActions>
        </Card>
      </div>
    )
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Home);
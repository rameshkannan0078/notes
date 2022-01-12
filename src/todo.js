import React from "react";
import axios from "axios";
import deleteimg from "./images/delete.jpg";
import Editimg from "./images/edit.png";
import { ReactDialogBox } from 'react-js-dialog-box';
import 'react-js-dialog-box/dist/index.css';
import ReactLoading from 'react-loading';
import './App.css';

class Todo extends React.Component {

	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
      id:'',
      name:'',
      age:'',
      salary:'',
      postId:'',
      show:false,
      showrow:false,
      isOpen: false,
      updateid:"",
      isLoading:true,
      count:1,
		};
	}



  openBox = (value) => {

    this.setState({
      isOpen: true,
      updateid:value,
    })
  }

  closeBox = () => {
    this.setState({
      isOpen: false
    })
  }

	// ComponentDidMount is used to
	// execute the code
	componentDidMount() {
	 this.refreshList();
	}

  refreshList(){
    fetch(
      "	https://61d96c30ce86530017e3cae0.mockapi.io/first")
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                items: json,
                DataisLoaded: true,
                isLoading: false,
                data:true
              });
            }).catch((res)=>{
              this.setState({
                isLoading:true
              })
            });
  
  }



  updateinput = e =>{ 
    this.setState({
    [e.target.name] : e.target.value,
    })
}

toggle = () => this.setState((currentState) => ({show: !currentState.show}));

addData = () =>{

console.log(this.state.salary)
axios.post('https://61d96c30ce86530017e3cae0.mockapi.io/first/',  { "name":this.state.name,"age":this.state.age,"salary":this.state.salary,"id":"" })
    .then((response) =>console.log());
  
    this.setState({
      show:false,
      count:this.state.count+1,
    });
    alert("Data Added Successfully");
    this.refreshList();
    this.componentDidMount();
   


}




deleteData(value){
  axios.delete('https://61d96c30ce86530017e3cae0.mockapi.io/first/'+value+'/')
  .then((response) =>console.log());
  this.refreshList();
  alert("Data Has Been Deleted");
  this.componentDidMount();
}

updateData(value1){
  console.log(value1);
  axios.put('https://61d96c30ce86530017e3cae0.mockapi.io/first/'+value1+'/',
  {
    "name":this.state.name,
    "age" :this.state.age,
    "salary":this.state.salary,

}).then((response)=>console.log(response.data));
alert("Updated Successfully");
this.setState({
  isOpen: false,
  data:1,
});
this.refreshList();
this.componentDidMount();

}

editrowdata = () => this.setState((currentState) => ({showrow: !currentState.showr}));

	render() {
		if (this.state.isLoading) {
      return (    
      <ReactLoading type="spinningBubbles" className="reactloading" color="red" height={200} width={200}/>
      );
    }

		return (
      <div className="dbody">
      
          <div className="header">
        <h1>Todo List</h1>
        </div>
        <div className="toggle">
        <button onClick={this.toggle} className="toggle-button">+ Add Data</button>
        </div>
     
      
        {
        this.state.show && <div className="Add-data">
          <form>
          <input name="name" placeholder="Enter the Name" onChange={this.updateinput}></input><br></br>
          <input name="salary" placeholder="Enter the salary" onChange={this.updateinput}></input><br></br>
          <input name="age" placeholder="Enter the age" onChange={this.updateinput}></input><br></br>
          </form>
          <button type="button" onClick={this.addData}>submit</button>
        </div>
        }
        
      <div className="dc-box">
           <h1>Datas Completed List</h1>
      </div>
      <div className="dc-table">
           <table id="example" class="display-table">
            <tbody>
  
            <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Salary</td>
                <td>Age</td>
                <td>Delete</td>
                <td>Update</td>
                </tr>
        {this.state.items.map(data => {
            
            return (
                  
                <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.salary}</td>
                <td>{data.age}</td>
                <td><button  onClick={()=>this.deleteData(data.id)}><img src={deleteimg} alt="my"/></button></td>
                <td><button onClick={()=>this.openBox(data.id)}><img src={Editimg} alt="edit" /></button></td>

        {this.state.isOpen && (
            <ReactDialogBox
              closeBox={this.closeBox}
              modalWidth='50%'
              headerBackgroundColor='red'
              headerTextColor='white'
              headerHeight='65'
              closeButtonColor='white'
              bodyBackgroundColor='white'
              bodyTextColor='black'
              bodyHeight='220px'
              headerText='Title'
            >
              <div className="dialogbox-input">
              <p>{this.state.updateid}</p>
              <input name="name" placeholder="Enter the Name"  onChange={this.updateinput} ></input><br></br>
              <input name="salary" placeholder="Enter the Salary"  onChange={this.updateinput} ></input><br></br>
              <input name="age" placeholder="Enter the Age"  onChange={this.updateinput} ></input><br></br>
              <button onClick={()=>this.updateData(this.state.updateid)}>Update</button>
              </div>
              
              

            </ReactDialogBox>
      
        )}
      




            
                </tr>
                
            );
           
            })}
            </tbody>
            </table>

      </div>
     </div>
	);
}
}

export default Todo;
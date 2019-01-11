import React, { Component } from "react";
import * as actionTypes from "../../store/action";
import { connect } from "react-redux";
import axios from 'axios';


import Button from '../../components/Button';
import Input from '../../components/Input';
import List from "../../components/List";
import ListItem from "../../components/ListItem";
import Form from "../../components/Form";

class Todo extends Component {
    /* state = {
        todos: [],
    } */

    /* getTodosHandler = () => {
        fetch("/api")
          .then(res => res.json())
          .then(res => this.setState({todos: res}));
    } */

    addTodoHandler = (e) => {
        const message = e.target.value;
        if (message) {
            axios.post("/api", {
            text: message
            });
        }
    }

    /* deleteTodoHandler = id => {
        let todos = [...this.state.todos];
        const index = todos.findIndex(todo => todo._id === id);
        todos.splice(index, 1);
        this.setState({ todos });
    }; */

    deleteFromDB = (id) => {
        this.props.onDeleteTodo(id);
        axios.delete("/api/delete/" + id, {
            data: {
            _id: id
            }
        });
    }

    getTodoToUpdate = id => {
        const input = document.getElementById("updateTodo");
        this.props.tds.find(todo => {
            if (todo._id === id ) {
            input.value = todo.message;
            input.name = todo._id;
            }
        }) 
    };

    updateTodoHandler = () => {
        const textField = document.getElementById("updateTodo");
        const updatedText = textField.value;
        const id = textField.name;
        
        updatedText
            ? axios.post("/api/update/" + id, {
                _id: id,
                text: updatedText
            })
            : alert("Nothing to update!");
    };

    componentDidMount () {
        this.props.getTodosFromDB();
    }

    render () {
        const todos = this.props.tds;
        console.log(todos);
        return (
            <div className="App">
                <Form action="/">
                <Input 
                    id="newTodo" 
                    onBlur={this.addTodoHandler}
                ></Input>
                <Button 
                    id="addBtn" 
                    clicked={this.props.getTodosFromDB}
                >
                    Add
                </Button>
                </Form>
                <Form action="/">
                <Input 
                    id="updateTodo"
                    onBlur={this.updateTodoHandler}
                >
                </Input>
                <Button 
                    id="updateBtn" 
                    clicked={this.props.getTodosFromDB}
                >
                    Update
                </Button>
                </Form>
                {!this.props.tds 
                ? <h1>No Added Todos yet!</h1>
                : <List id="todosList">
                    {this.props.tds.map(todo => (
                        <ListItem 
                        id={todo._id} 
                        key={todo._id}
                        >
                        {todo.message}
                        <Button
                            id="editBtn"
                            clicked={() => this.getTodoToUpdate(todo._id)}
                        >
                            Edit
                        </Button>
                        <Button
                            id="delBtn"
                            clicked={() => this.deleteFromDB(todo._id)}
                        >
                            X
                        </Button>
                        </ListItem>
                    ))}
                </List>}
            </div>
        );
    }
}

/* const fetchDataAction = () => {

} */

const mapStateToProps = state => {
    return {
        tds: state.todos,
    };          
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTodo: (id) => dispatch({type: actionTypes.DELETE_TODO, todoElId: id}),
        getTodosFromDB: () => dispatch(() => {
            const resp = axios.get("/api");
            return {type: actionTypes.GET_TODOS, value: resp}
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
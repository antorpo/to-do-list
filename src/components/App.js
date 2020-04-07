import React from "react";
import Faker from "faker";
import "./styles/App.css";
import Layout from "./Layout"
import Title from "./Title";
import Input from "./Input"
import TaskList from "./TaskList";
import Logo from "./Logo"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTask: {taskText: "", id: ""},
      tasks: [],
      error: null,
    };
  }

  handleChange = e => {
    const uuid = Faker.random.uuid();
    this.setState({ newTask: { taskText: e.target.value, id: uuid } });
  };

  handleSubmit = e => {
    e.preventDefault();
    if(this.state.newTask.taskText === "") {
      this.setState({ error: true })
    } else {
      let currentTasks = this.state.tasks;
      currentTasks.push(this.state.newTask);
      this.setState({
        newTask: { taskText: "", id: "" },
        tasks: currentTasks,
        error: null,
      });
    }
  };

  handleDelete = (id) => {
    let newTasks = this.state.tasks;
    //Splice(indice, cantidad de elementos a eliminar)
    newTasks.splice(id, 1)
    this.setState({
      tasks: newTasks,
    })
  }

  render() {
    return (
      <Layout>
        <div className="row mt-5 justify-content-center">
          <div className="col col-sm-6 col-md-8 col-lg-6">
            <Title />
            <Logo />
            <Input
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              value={this.state.newTask}
            />
            { this.state.error ?
                <div className="alert alert-warning m-0" role="alert">
                  Must enter a task
                </div>
              :
                null
            }
          </div>
        </div>
        <div className="row mt-4 justify-content-center">
          <div className="col col-sm-6 col-md-8 col-lg-6">
            <TaskList
              tasks={this.state.tasks}
              handleDelete={this.handleDelete}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

export default App;

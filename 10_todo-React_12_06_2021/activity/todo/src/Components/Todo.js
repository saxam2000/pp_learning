import React, { Component } from "react";

export default class Todo extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, txt: "task1" },
        { id: 2, txt: "task2" },
        { id: 3, txt: "task3" },
      ],
    };
  }

  onSubmit = (val) => {
    let nta = [...this.state.tasks,
      { id: Date.now(), txt: val },
    ];
    this.setState({ tasks: nta });
  };

  onDelete = (id) => {
    let nta = this.state.tasks.filter((task) => {
      return task.id !== id;
    });
    this.setState({ tasks: nta });
  };

  render() {
    console.log("todo render");

    return (
      <>
        <InputComponent onSubmit={this.onSubmit} />
        <TaskList tasks={this.state.tasks} onDelete={this.onDelete} />
      </>
    );
  }
}

class InputComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTask: "",
    };
  }

  handleChange = (e) => {
    let val = e.target.value;
    this.setState({ currTask: val });
  };

  submitValue() {
    this.props.onSubmit(this.state.currTask);
    this.setState({ currTask: "" });
  }
  render() {
    console.log("input render");

    return (
      <div className="input_container">
        <input
          onChange={this.handleChange}
          value={this.state.currTask}
          type="text"
        ></input>
        <button onClick={(event)=>{ if(this.state.currTask!==''){this.props.onSubmit(this.state.currTask);
    this.setState({ currTask: "" });}}}>add</button>
      </div>
    );
  }
}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  render() {
    console.log("task list render");
    return (
      <div className="class-list">
        <ul>
          {this.props.tasks.map((task) => (
            <li key={task.id}>
              <h1>{task.txt}</h1>
              <button
                onClick={() => {
                  this.props.onDelete(task.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

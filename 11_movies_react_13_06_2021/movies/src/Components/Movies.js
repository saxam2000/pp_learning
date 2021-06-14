import React, { Component } from "react";
import { getMovies } from "./MovieService";//importes all movies info from backend

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: getMovies(),
      currSearchText: "",
    };
  }

  deleteobj = (id) => {
    let nmovieobj = this.state.movies.filter((movieobj) => {
      return movieobj._id !== id;
    });

    this.setState({ movies: nmovieobj });
  };

  handleChange = (e) => {
    //get val from input box
    let val = e.target.value;
    // let filteredarr = this.state.movies.filter((movieobj) => {
    //     return movieobj.title.trim().toLowerCase().includes(val.trim().toLowerCase());
    // });

    this.setState({
      currSearchText: val,//cahange state so it will render in main ui
    });
  };
  render() {

    // while doing this work in state we had to create two states for similar kind of data and also there was difficulty to manage both data while deleting and searching
    let { currSearchText, movies } = this.state;//destructuring ..
    let filteredMovies = [];
    if (currSearchText === "") {
      filteredMovies = movies;
    } else {
      filteredMovies = movies.filter((movieobj) => {
        return movieobj.title
          .trim()//remove whitespaces
          .toLowerCase()//converted all to lower case to avoid case senstivity
          .includes(currSearchText.trim().toLowerCase());//check if string contains given pattern
      });
    }

    return (
      <div className="container"> 
      {/* container used for center the ui */}
        <div className="row">
          <div className="col-3">
            <h1>hello</h1>
          </div>
          <div className="col-9">
            <input
            // input box
              onChange={this.handleChange}
              value={this.state.currSearchText}
              type="text"
            ></input>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Title</th>
                  <th scope="col">genre</th>
                  <th scope="col">stock</th>
                  <th scope="col">rate</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movieobj) => (
                  <tr key={movieobj._id}>
                    <th scope="row">1</th>
                    <td>{movieobj.title}</td>
                    <td>{movieobj.genre.name}</td>
                    <td>{movieobj.numberInStock}</td>
                    <td>{movieobj.dailyRentalRate}</td>
                    <td>
                      <button
                        onClick={() => {
                          this.deleteobj(movieobj._id);
                        }}
                        type="button"
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


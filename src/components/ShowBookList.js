import React, { Component } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import {
  Container,
  Row,
  Col,
  Media,
  Navbar,
  ButtonGroup,
} from "react-bootstrap";

class ShowBookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      quote: [],
      author: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8082/api/books")
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
      .catch((err) => {
        console.log("Error from ShowBookList");
      });

    try {
      let apiQuote = axios.get("http://localhost:8082/api/qod").then((res) =>
        this.setState({
          quote: res.data.quote,
          author: res.data.author,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const books = this.state.books;
    // console.log("PrintBook: " + books);

    let bookList;

    const fetchQuote = async () => {
      try {
        let apiQuote = axios
          .get("http://localhost:8082/api/qod")
          .then((res) => {
            this.setState({
              quote: res.data.quote,
              author: res.data.author,
            });
            console.log(this.state.quote);
          });
      } catch (err) {
        console.log(err);
      }
    };

    if (!books) {
      bookList = "there is no book record!";
    } else {
      bookList = books.map((book, index) => (
        <BookCard className="bookCard" book={book} key={index} />
      ));
    }

    return (
      <div className="ShowBookList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">MERN Library</h2>
            </div>
          </div>
          <Container>
            <Navbar className="navbar mb-2" variant="dark">
              <Container>
                <Navbar.Brand href="#">
                  <Link
                    to="/create-book"
                    className="btn btn-outline-light float-right"
                  >
                    + Add New Book
                  </Link>
                </Navbar.Brand>
                <Navbar.Toggle />

                {/* <button onClick={fetchQuote}>fetchQuote</button> */}

                <Navbar.Text></Navbar.Text>
                <Navbar.Text>
                  Signed in as: <a href="#">Guest</a>
                </Navbar.Text>
              </Container>
            </Navbar>

            <Row>
              <Col>
                <Media>
                  <img
                    width={64}
                    height={64}
                    className="mr-3"
                    src="https://via.placeholder.com/64"
                    alt="Generic placeholder"
                  />
                  <Media.Body>
                    <h5>Quote of the day</h5>
                    <p>{this.state.quote}</p>
                    <b>Author:</b> {"  "}
                    {this.state.author}
                  </Media.Body>
                </Media>
              </Col>
            </Row>
          </Container>
        </div>
        <Container>
          <Row>
            <div className="list">{bookList}</div>
          </Row>
        </Container>

        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">© Kar Labs | Bookstore Mern App By Satyasri Kar</Col>
          </Row>
        </Container>

        <div>_</div>
      </div>
    );
  }
}

export default ShowBookList;

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizzes } from "../../store/actions/quiz"
import { connect } from "react-redux"

class QuizList extends Component {

    componentDidMount() {
        this.props.fetchQuizzes()
    }

    renderQuizzes() {
        return this.props.quizzes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        { quiz.name }
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.props.loading && this.props.quizzes.length !== 0
                        ? <Loader/>
                        : <ul>
                                { this.renderQuizzes() }
                          </ul>
                    }

                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.quiz.quizzes,
        loading: state.quiz.loading
    }
}



export default connect(mapStateToProps, { fetchQuizzes })(QuizList)

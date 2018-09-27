import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      seo_title: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  render() {
    return (
      <form id="article-form">
        <Input
          text="SEO title"
          label="seo_title"
          type="text"
          id="seo_title"
          value={this.state.seo_title}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
// const wrapper = document.getElementById("create-article-form");
ReactDOM.render(
  <FormContainer />,
  document.getElementById("create-article-form")
);

export default FormContainer;

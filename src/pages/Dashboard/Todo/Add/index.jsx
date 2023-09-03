import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper, TodoCardWrapper } from "./styles";
import { Helmet } from "react-helmet-async";
import { Form, Button } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import TodoCard from "../TodoCard";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const navigate = useNavigate();

  const toHome = () => {
    navigate("/dashboard");
  };

  const handleNewTodo = () => {
    let newTodoList = [...todoList];
    newTodoList.push({ order: todoList.length, todo: todo, done: false });
    console.log(newTodoList);
    setTodoList(newTodoList);
    setTodo("");
  };

  const handleDone = (index, val) => {
    let newTodoList = [...todoList];
    newTodoList = newTodoList.map((item, i) => {
      if (i === index) {
        item.done = val;
      }
      return item;
    });
    console.log(newTodoList, "newTodoList");
  };

  const handleChangePosition = (fromIndex, upOrDown) => {
    let value;
    if (upOrDown === "up") {
      value = -1;
    } else {
      value = 1;
    }

    let newTodoList = [...todoList];
    const toIndex = fromIndex + value;

    const element = newTodoList.splice(fromIndex, 1)[0];
    newTodoList.splice(toIndex, 0, element);

    setTodoList(newTodoList);
  };

  const handleDeleteTodo = (index) => {
    let newTodoList = [...todoList];
    newTodoList = newTodoList.filter((_, i) => i !== index);
    setTodoList(newTodoList);
  };

  const createNewTodo = async (event) => {
    event.preventDefault();
    const newTodo = {
      title,
      todoList: todoList,
      // tag,
      // status,
    };
    console.log(newTodo, "newTodo");
    // // console.log(newNote);
    // await dispatch(newNoteAsync(newNote, notes));
    // navigate("/dashboard");
  };

  return (
    <Wrapper className="container2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Todo - Petek Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <h3>
        <b>New Todo</b>
      </h3>
      <Form onSubmit={(event) => createNewTodo(event)}>
        <Form.Group controlId="formBasicText" className="mb-2">
          <Form.Label>Todo Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: todo today"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicText" className="mb-2">
          <Form.Label>To-do *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: todo today"
            value={todo}
            onChange={(event) => setTodo(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicText" className="mb-2">
          <Button
            className="btn-submit d-flex align-items-center text-white"
            variant="info"
            type="button"
            onClick={() => todo && handleNewTodo()}
          >
            <BsFillPlusSquareFill className="me-2 " /> Add Todo
          </Button>
        </Form.Group>

        <h5>Your To-do :</h5>
        <TodoCardWrapper>
          {todoList?.map((item, i) => (
            <TodoCard
              key={i}
              dataList={todoList}
              index={i}
              data={item}
              onDelete={() => handleDeleteTodo(i)}
              onChangePosition={(index, upOrDown) =>
                handleChangePosition(index, upOrDown)
              }
              onDone={(index, value) => handleDone(index, value)}
            />
          ))}
        </TodoCardWrapper>

        <Button className="btn-submit mt-3" variant="primary" type="submit">
          Submit
        </Button>
        <Button
          onClick={() => toHome()}
          className="mt-3"
          variant="secondary"
          type="button"
        >
          Back
        </Button>
      </Form>
    </Wrapper>
  );
}

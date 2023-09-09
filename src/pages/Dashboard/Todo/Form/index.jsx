import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Wrapper, TodoCardWrapper, ButtonAddWrapper } from "./styles";
import { Helmet } from "react-helmet-async";
import { Form, Button } from "react-bootstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import TodoCard from "../TodoCard";
import Swal from "sweetalert2";
import {
  newNoteAsync,
  updateNoteAsync,
  fetchNoteAsync,
} from "store/actions/note";

export default function FormTodo() {
  const { originPage, notes } = useSelector((state) => state.note);
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNewTodo = () => {
    let newTodoList = [...todoList];
    newTodoList.push({
      order: todoList.length,
      todo: todo,
      done: false,
      note_id: id,
    });
    // console.log(newTodoList);
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
    setTodoList(newTodoList);
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
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  };

  const handleSubmitTodo = async (event) => {
    event.preventDefault();
    if (!title) {
      Swal.fire("Error!", `Title is required`, "error");
      return;
    }
    // set new order
    console.log(todoList, "todoList");
    const newTodoList = todoList?.map((item, i) => {
      item.order = i;
      return item;
    });

    const newNote = {
      title,
      type: "todo",
      tag: "",
      note: JSON.stringify(newTodoList),
    };
    if (id) newNote.id = id;
    console.log(newNote, "newNote");

    if (!id) {
      //if new todo
      await dispatch(newNoteAsync(newNote, notes, navigate));
    } else {
      //if updated todo
      await dispatch(updateNoteAsync(newNote, notes, "todo"));
    }
    if (originPage === "home") navigate("/dashboard");
    if (originPage === "detail") navigate("/notes/show/" + id);
    handleBack();
  };

  const handleBack = () => {
    if (!originPage || originPage === "home") navigate("/dashboard");
    if (originPage === "detail") navigate("/notes/show/" + id);
  };

  const fetchEditTodo = async () => {
    const dataNote = await dispatch(fetchNoteAsync(id));
    setTitle(dataNote.title);
    setTodoList(JSON.parse(dataNote.note));
  };

  useEffect(() => {
    if (id) {
      fetchEditTodo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Wrapper className="container2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {id && query.get("from") !== "add" ? "Edit" : "Add"} Todo - Petek Note
          App
        </title>
        <link rel="Note app" href="" />
      </Helmet>

      <h3>
        <b>{id && query.get("from") !== "add" ? "Edit" : "Add"} Todo</b>
      </h3>
      <Form onSubmit={(event) => handleSubmitTodo(event)}>
        <Form.Group controlId="formBasicText" className="mb-2">
          <Form.Label>Todo Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: todo today"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        {!id && (
          <>
            <Button className="btn-submit mt-3" variant="primary" type="submit">
              Next
            </Button>
            <Button
              onClick={() => handleBack()}
              className="mt-3"
              variant="secondary"
              type="button"
            >
              Back
            </Button>
          </>
        )}
        {id && (
          <>
            <Form.Group controlId="formBasicText" className="mb-2 input-todo">
              <Form.Label>To-do *</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Eg: todo today"
                  value={todo}
                  onChange={(event) => setTodo(event.target.value)}
                />
                <ButtonAddWrapper>
                  <Button
                    className="btn-submit d-flex align-items-center text-white"
                    variant="info"
                    type="button"
                    onClick={() => todo && handleNewTodo()}
                  >
                    <BsFillPlusSquareFill className="me-2 " /> Add Todo
                  </Button>
                </ButtonAddWrapper>
              </div>
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
              onClick={() => handleBack()}
              className="mt-3"
              variant="secondary"
              type="button"
            >
              Back
            </Button>
          </>
        )}
      </Form>
    </Wrapper>
  );
}

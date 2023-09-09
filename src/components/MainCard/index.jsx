import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "./styles.js";
import { Link } from "react-router-dom";
import { BsXLg, BsCheckLg, BsPencilSquare } from "react-icons/bs";
import { capitalize } from "helpers/globalFunctions";
import { deleteNoteAsync, setOriginPage } from "store/actions/note";

export default function MainCard({ note, view }) {
  const { notes } = useSelector((state) => state.note);

  let customWidth = "100%";
  if (view === "3") customWidth = "32.5%";
  if (view === "2") customWidth = "49.5%";
  if (view === "1") customWidth = "100%";

  const dispatch = useDispatch();

  const deleteNote = (id) => {
    dispatch(deleteNoteAsync(id, notes));
  };

  const renderTodo = (rawData) => {
    const data = JSON.parse(rawData);
    console.log(data, "data");
    return (
      <div>
        {data?.length > 0 &&
          data?.map((item, i) => (
            <div key={i}>
              {item?.todo}{" "}
              {item?.done ? (
                <BsCheckLg className="text-success" />
              ) : (
                <BsXLg className="text-danger" />
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <Wrapper customWidth={customWidth}>
      <Link to={"/notes/show/" + note?.id}>
        <div>
          <div>
            <p className="text-title text-start">{capitalize(note?.title)}</p>
          </div>
          <div className="text-note-wrapper">
            {note?.type === "todo" ? (
              renderTodo(note?.note)
            ) : (
              <p
                className="p-note text-start"
                dangerouslySetInnerHTML={{ __html: note?.note }}
              />
            )}
          </div>
          <div className="text-readmore text-start">
            <p>read more..</p>
          </div>
        </div>
      </Link>
      <div className="btn-div">
        <Link
          to={
            note?.type === "todo"
              ? "/dashboard/todo/edit/" + note?.id
              : "/dashboard/notes/edit/" + note?.id
          }
          onClick={() => dispatch(setOriginPage("home"))}
        >
          <BsPencilSquare className="btn-edit me-2" size="18px" />
        </Link>
        <BsXLg
          onClick={() => deleteNote(note?.id)}
          className="btn-delete"
          size="16px"
        />
      </div>
    </Wrapper>
  );
}

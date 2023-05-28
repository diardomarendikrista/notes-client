import "../Add/styles.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";
import Loader from "components/Loader/Loader";

import { fetchNoteAsync, setOriginPage } from "../../../store/actions/note";
import { capitalize } from "helpers/globalFunctions";

export default function NoteDetail() {
  const { id } = useParams();

  const { loadingDetail } = useSelector((state) => state.note);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchNote = async () => {
    const data = await dispatch(fetchNoteAsync(id));
    setTitle(data.title);
    setNote(data.note);
    setTag(data.tag);
    setStatus(data.status);
  };

  const editNote = (id) => {
    dispatch(setOriginPage("detail"));
    navigate("/notes/edit/" + id);
  };

  const toHome = () => {
    navigate("/notes");
  };

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-detail">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Detail Note - Petek Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      {loadingDetail ? (
        <div className="mb-5">
          <Loader />
        </div>
      ) : (
        <>
          <h3 className="mb-3 text-wrap text-break">
            <b>{capitalize(title)}</b>
          </h3>
          <div className="text-wrap text-break">
            <p dangerouslySetInnerHTML={{ __html: note }} className="mb-2" />
          </div>
          <hr />
          <p className="mb-3 text-wrap text-break">
            tag : {tag ? tag : "- no tag -"}
          </p>
          <Button
            onClick={() => editNote(id)}
            className="btn-submit"
            variant="info"
            type="submit"
          >
            Edit
          </Button>
          <Button onClick={() => toHome()} variant="secondary" type="button">
            Back
          </Button>
        </>
      )}
    </div>
  );
}

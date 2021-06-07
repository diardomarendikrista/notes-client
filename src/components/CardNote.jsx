import "./CardNote.css";
import React from "react";
import { Card } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import capitalize from "../helpers/capitalize";

export default function CardNote({ note }) {
  return (
    <>
      <Card className="card-note">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <div>
            <p className="text-title text-left">{capitalize(note.title)}</p>
          </div>
          <div className="text-note-size">
            <p className="p-note text-left">{note.note}</p>
          </div>
          <div className="text-readmore text-left">
            <p>read more..</p>
          </div>
          <div className="btn-div">
            <BsPencilSquare className="btn-edit" />
            <BsFillTrashFill className="btn-delete" />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

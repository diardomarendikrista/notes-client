import { useState, useEffect } from "react";
import {
  Wrapper,
  WrapperMenu,
  TodoWrapper,
  DeleteButton,
  UpDownButton,
} from "./styles";
import { LuArrowDownSquare, LuArrowUpSquare } from "react-icons/lu";
import { Form } from "react-bootstrap";

export default function TodoCard({
  dataList,
  index,
  data,
  onDelete,
  onChangePosition,
  onDone,
  todoCheckStyle,
}) {
  const [canUp, setCanUp] = useState(true);
  const [canDown, setCanDown] = useState(true);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (index <= 0) {
      setCanUp(false);
      setCanDown(true);
    } else if (index === dataList?.length - 1) {
      setCanUp(true);
      setCanDown(false);
    } else {
      setCanUp(true);
      setCanDown(true);
    }
  }, [index, dataList]);

  useEffect(() => {
    if (data?.done) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  }, [data]);

  return (
    <Wrapper>
      <TodoWrapper>
        {data?.todo}
        {todoCheckStyle === 1 && (
          <Form.Check
            type={"checkbox"}
            label={``}
            id={`checkbox-${data.todo}`}
            onChange={(e) => {
              onDone(index, e.target.checked);
              setIsDone(e.target.checked);
            }}
            checked={isDone}
          />
        )}
      </TodoWrapper>
      <WrapperMenu>
        {todoCheckStyle === 0 && (
          <Form.Check
            type={"checkbox"}
            label={``}
            id={`checkbox-${data.todo}`}
            onChange={(e) => {
              onDone(index, e.target.checked);
              setIsDone(e.target.checked);
            }}
            checked={isDone}
          />
        )}
        {onChangePosition && (
          <>
            <UpDownButton
              disabled={!canUp}
              onClick={() => canUp && onChangePosition(index, "up")}
            >
              <LuArrowUpSquare />
            </UpDownButton>
            <UpDownButton
              disabled={!canDown}
              onClick={() => canDown && onChangePosition(index, "down")}
            >
              <LuArrowDownSquare />
            </UpDownButton>
          </>
        )}
        {onDelete && <DeleteButton onClick={() => onDelete()}>X</DeleteButton>}
      </WrapperMenu>
    </Wrapper>
  );
}

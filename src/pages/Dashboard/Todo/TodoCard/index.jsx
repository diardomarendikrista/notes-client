import { useState, useEffect } from "react";
import { Wrapper, WrapperMenu, DeleteButton, UpDownButton } from "./styles";
import { LuArrowDownSquare, LuArrowUpSquare } from "react-icons/lu";
import { Form } from "react-bootstrap";

export default function TodoCard({
  dataList,
  index,
  data,
  onDelete,
  onChangePosition,
  onDone,
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
      <div>{data?.todo}</div>
      <WrapperMenu>
        <Form.Check
          type={"checkbox"}
          label={``}
          id={`disabled-default-checkbox`}
          onChange={(e) => {
            onDone(index, e.target.checked);
            setIsDone(e.target.checked);
          }}
          checked={isDone}
        />
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

import { Modal } from "react-bootstrap";
import { LoadingButton } from "../UI/LoadingButton";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { ITaskData } from "../Pages/Tasks";
import { toast } from "react-toastify";

type TCreateOrEditTaskDetails = Omit<
  ITaskData,
  "id" | "createdAt" | "updatedAt"
>;

export const CreateOrEditTask: React.FC<{
  id?: number;
  show: boolean;
  onClose: (fetch?: boolean) => void;
}> = (props) => {
  const [taskDetails, setTaskDetails] = useState<TCreateOrEditTaskDetails>({
    name: "",
    priority: "low",
    description: "",
  });

  const [loadingState, setLoadingState] = useState(false);

  const getTaskById = async () => {
    const apiResponse = await fetch(`/api/tasks/${props.id}`);
    const jsonResponse = await apiResponse.json();

    if (jsonResponse?.result) {
      setTaskDetails(jsonResponse?.result);
    }
  };

  const createOrEditTask = async () => {
    let reqUrl = "/api/tasks/create";
    setLoadingState(true);

    if (props.id) {
      reqUrl = `/api/tasks/edit/${props.id}`;
    }

    const apiResponse = await fetch(reqUrl, {
      body: JSON.stringify(taskDetails),
      headers: {
        "Content-Type": "application/json",
      },
      method: props.id ? "PATCH" : "POST",
    });

    const jsonResponse = await apiResponse.json();

    if (jsonResponse?.success) {
      props.onClose(true);
      toast.success(`Successfully ${props.id ? "edited" : "created"} task`);
    } else {
      toast.error(
        jsonResponse?.errorMessage || "Something went wrong, please try again."
      );
    }

    setLoadingState(false);
  };

  useEffect(() => {
    if (props.id) {
      getTaskById();
    }
  }, [props.id]);

  const onFieldChange = (
    fieldName: keyof TCreateOrEditTaskDetails,
    feildValue: string
  ) => {
    setTaskDetails((old) => {
      old[fieldName] = feildValue;
      return { ...old };
    });
  };

  return (
    <Modal centered show={props.show} onHide={props.onClose}>
      <Modal.Header closeButton>
        <h3>{props.id ? "Edit Task" : "Create New Task"}</h3>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <label htmlFor="task-name">Task name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="task-name"
              value={taskDetails.name}
              onChange={(e) => onFieldChange("name", e.target.value)}
            />
          </div>

          <div className="col-6">
            <label htmlFor="task-priority">Task priority</label>
            <select
              onChange={(e) => onFieldChange("priority", e.target.value)}
              value={taskDetails.priority}
              className="form-select"
              name="priority"
              id="task-priority"
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>

          <div className="col-12 mt-2">
            <label htmlFor="task-description">Task description</label>
            <textarea
              value={taskDetails.description}
              className="form-control"
              name="description"
              onChange={(e) => onFieldChange("description", e.target.value)}
              rows={3}
              id="task-description"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => props.onClose()}
          className="btn btn-sm btn-secondary"
        >
          Close
        </button>
        <LoadingButton
          loading={loadingState}
          onClick={createOrEditTask}
          className="btn-sm"
        >
          Save
        </LoadingButton>
      </Modal.Footer>
    </Modal>
  );
};

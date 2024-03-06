import { useEffect, useState } from "react";
import { CreateOrEditTask } from "../Task/CreateOrEditTask";

export interface ITaskData {
  id: number;
  name: string;
  description: string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
}

const Tasks: React.FC = () => {
  const [isTaskLoadingTask, setIsTaskLoadingTask] = useState(false);
  const [tasks, setTasks] = useState<ITaskData[]>([]);
  const [editTaskId, setEditTaskId] = useState<number>();
  const [showCreateOrEditModal, setShowCreateOrEditModal] = useState(false);

  const getAllTasks = async () => {
    setIsTaskLoadingTask(true);
    const apiResponse = await fetch("/api/tasks");
    const jsonResponse = await apiResponse.json();

    if (jsonResponse?.result) {
      setTasks(jsonResponse?.result);
    }

    setIsTaskLoadingTask(false);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="container">
      <div className="my-2 d-flex justify-content-between align-items-center">
        <h2>All tasks</h2>
        <div>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setShowCreateOrEditModal(true)}
          >
            + Task
          </button>
        </div>
      </div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((singleTask, taskIndex) => {
            return (
              <tr key={singleTask.id}>
                <th scope="row">{taskIndex + 1}</th>
                <td>
                  {singleTask.name}
                  <span
                    className="ps-1 text-primary"
                    onClick={() => {
                      setEditTaskId(singleTask.id);
                      setShowCreateOrEditModal(true);
                    }}
                    role="button"
                  >
                    <svg
                      className="feather feather-edit"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </span>
                </td>
                <td>{singleTask.description}</td>
                <td>{singleTask.priority}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isTaskLoadingTask && (
        <div className="text-center text-primary">Loading....</div>
      )}
      {!isTaskLoadingTask && tasks.length === 0 && (
        <div className="text-center text-danger">No task Available</div>
      )}

      <div>
        <span>
          Total Tasks: <b>{tasks.length}</b>
        </span>
      </div>
      {showCreateOrEditModal && (
        <CreateOrEditTask
          show={showCreateOrEditModal}
          id={editTaskId}
          onClose={(fetch) => {
            setEditTaskId(undefined);
            setShowCreateOrEditModal(false);

            if (fetch) {
              getAllTasks();
            }
          }}
        />
      )}
    </div>
  );
};

export default Tasks;

import React, { useEffect, useState } from "react";
import AddIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import CheckCircle from "@heroicons/react/24/outline/CheckCircleIcon";
import CheckedCircle from "@heroicons/react/24/solid/CheckCircleIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EditIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { v4 as uuid } from "uuid";
import { ITask } from "../../utils/constants";
import { getTasks } from "../../utils/api";
import axios from "axios";

export function Tasks() {
  const [task, setTask] = useState({
    name: "",
    priority: "",
    id: "",
  });
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [audio] = useState(new Audio('https://assets.mixkit.co/sfx/download/mixkit-gaming-lock-2848.wav'))
  const [tasks, setTasks] = useState<ITask>({
    Email: "",
    Tasks: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    getTasks(localStorage.token).then((res) => {
      setTasks(res.data);
      console.log(res.data);
      setLoading(false)
    });
  }, []);

  function addTask() {
    setError("");
    if (!task.id || !task.name || !task.priority)
      return setError("There are missing fields");

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/task/add`, {
        token: localStorage.token,
        priority: task.priority,
        id: task.id,
        name: task.name,
      })
      .then(async (res) => {
        if (res.status == 200) {
          const res = await getTasks(localStorage.token);
          setTasks(res.data);
          setTask({ name: "", priority: "", id: "" });
          setError("");
          setModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.msg);
      });
  }
  function deleteTask(id: string) {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/task/delete`, {
        token: localStorage.token,
        id: id,
      })
      .then(async (res) => {
        if (res.status == 200) {
          const res = await getTasks(localStorage.token);
          setTasks(res.data);
          setTask({ name: "", priority: "", id: "" });
          setModal(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  function updateTask() {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/task/edit`, {
        token: localStorage.token,
        name: task.name,
        priority: task.priority,
        id: task.id,
      })
      .then(async (res) => {
        if (res.status == 200) {
          const res = await getTasks(localStorage.token);
          setTasks(res.data);
          setTask({ name: "", priority: "", id: "" });
          setModal(false);
          setModalUpdate(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function completeTask(id: string, name: string, priority: string) {
    setLoading(true)
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/task/edit`, {
        token: localStorage.token,
        name,
        priority,
        id
      })
      .then(async (res) => {
        if (res.status == 200) {
          const res = await getTasks(localStorage.token);
          setTasks(res.data);
          setTask({ name: "", priority: "", id: "" });
          setModal(false);
          setModalUpdate(false);
          setLoading(false)
          audio.play()
          setTimeout(() => {audio.pause()}, 1000)
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }

  return (
    <>
      <div
        className="mt-24 flex flex-col w-full gap-4"
        style={{ maxWidth: "1096px" }}
      >
        <div className="bg-zinc-800 rounded-md p-6" style={{ width: "90%" }}>
          <div
            onClick={() => {
              setTask({ ...task, id: uuid() });
              setModal(true);
            }}
            className="flex flex-row gap-4 cursor-pointer w-fit"
          >
            <AddIcon className="cursor-pointer" width={24} color={"#6B7280"} />
            <span className="text-gray-500 font-medium ">Add a task</span>
          </div>
        </div>
        {tasks.Tasks?.map((taskM) => (
          <div
            className="bg-zinc-800  justify-between rounded-md p-4 flex flex-row items-center"
            style={{ width: "90%" }}
          >
            <div className="flex flex-row gap-4 w-fit">
              {taskM.Priority == "completed" ? (
                <CheckedCircle width={24} color={"white"} />
              ) : (
                <CheckCircle className="cursor-pointer" onClick={() => completeTask(taskM.TaskId, taskM.Name, 'completed')} width={24} color={"white"} />
              )}

              {taskM.Priority == "completed" ? (
                <span className="text-white font-medium line-through">
                  {taskM.Name}
                </span>
              ) : (
                <span className="text-white font-medium ">{taskM.Name}</span>
              )}
            </div>
            <div className="flex flex-row gap-4">
              {taskM.Priority == "completed" ? (
                <div className="text-white bg-yellow-600 p-1 select-none pl-4 pr-4 rounded-full capitalize">
                  {taskM.Priority}
                </div>
              ) : (
                <div className="text-white bg-red-500 p-1 select-none pl-4 pr-4 rounded-full capitalize">
                  {taskM.Priority}
                </div>
              )}
              <div
                onClick={() => {
                  setTask({ ...task, id: taskM.TaskId });
                  setModalUpdate(true);
                }}
                className="p-2 cursor-pointer hover:bg-zinc-700 transition-all duration-75 rounded-lg"
              >
                <EditIcon width={18} color={"white"} />
              </div>
              <div
                onClick={() => deleteTask(taskM.TaskId)}
                className="p-2 cursor-pointer hover:bg-zinc-700 transition-all duration-75 rounded-lg"
              >
                <TrashIcon width={18} color={"white"} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {modal && (
        <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-75 transition-opacity">
          <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
            <div
              style={{ maxWidth: "470px", width: "90%" }}
              className="flex flex-col justify-center bg-zinc-800 p-7 rounded-md border border-zinc-700"
            >
              <div className="mb-10">
                <h1 className="font-bold text-white text-2xl">Add your task</h1>
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3">
                  <p className="text-white font-bold text-md">Task name</p>
                  <input
                    value={task.name}
                    className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    placeholder="Doing homework"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-white font-bold text-md">Priority </p>
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      setTask({ ...task, priority: e.target.value })
                    }
                    className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
                  >
                    <option value={""}>Select a priority</option>
                    <option value={"urgent"}>Urgent</option>
                    <option value={"important"}>Important</option>

                    <option value={"normal"}>Normal</option>
                  </select>
                </div>
                {error && (
                  <div className="mb-2">
                    <p className="text-red-500 font-normal">{error}</p>
                  </div>
                )}
                <div className="flex flex-row justify-between gap-6">
                  <button
                    onClick={addTask}
                    className="text-white font-medium bg-blue-700 p-2 rounded-md hover:bg-blue-800 transition-all duration-200 focus:ring-blue-500 focus:ring-4 w-full ease-in-out"
                  >
                    Add
                  </button>
                  <button
                    className="text-white font-medium bg-red-500 p-2 rounded-md hover:bg-red-600 transition-all duration-200 focus:ring-red-700 w-full focus:ring-4 ease-in-out"
                    onClick={() => {
                      setTask({ name: "", priority: "", id: "" });
                      setError("");
                      setModal(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalUpdate && (
        <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-75 transition-opacity">
          <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
            <div
              style={{ maxWidth: "470px", width: "90%" }}
              className="flex flex-col justify-center bg-zinc-800 p-7 rounded-md border border-zinc-700"
            >
              <div className="mb-10">
                <h1 className="font-bold text-white text-2xl">
                  Edit your task
                </h1>
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col gap-3">
                  <p className="text-white font-bold text-md">Task name</p>
                  <input
                    value={task.name}
                    className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    placeholder="Doing homework"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-white font-bold text-md">Priority </p>
                  <select
                    value={task.priority}
                    onChange={(e) =>
                      setTask({ ...task, priority: e.target.value })
                    }
                    className="border-2 transition-all ease-in-out outline-none sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-zinc-800 border-zinc-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-700"
                  >
                    <option value={""}>Select a priority</option>
                    <option value={"urgent"}>Urgent</option>
                    <option value={"important"}>Important</option>

                    <option value={"normal"}>Normal</option>
                  </select>
                </div>

                <div className="flex flex-row justify-between gap-6">
                  <button
                    onClick={updateTask}
                    className="text-white font-medium bg-blue-700 p-2 rounded-md hover:bg-blue-800 transition-all duration-200 focus:ring-blue-500 focus:ring-4 w-full ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    className="text-white font-medium bg-red-500 p-2 rounded-md hover:bg-red-600 transition-all duration-200 focus:ring-red-700 w-full focus:ring-4 ease-in-out"
                    onClick={() => {
                      setTask({ name: "", priority: "", id: "" });
                      setError("");
                      setModalUpdate(false);
                    }}
                  >
                    close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed z-10 inset-0 bg-gray-800 bg-opacity-75 transition-opacity">
          <div className="flex min-h-full items-center justify-center p-4 sm:items-center sm:p-0">
            <div
              style={{ maxWidth: "470px", width: "90%" }}
              className="flex flex-col justify-center bg-zinc-800 p-7 rounded-md border border-zinc-700"
            >
              <div className=" items-center justify-center w-full flex flex-col gap-6">
                <h1 className="font-bold text-white text-2xl text-center">
                  Please wait...
                </h1>
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 text-zinc-200 animate-spin dark:text-zinc-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

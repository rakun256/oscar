import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import { FaCheckCircle } from "react-icons/fa";
import Button from "./Button";

export default function TaskCard({ task }) {
  const { user } = useAuth();
  const { setLoading, notify } = useUI();

  const handleComplete = async () => {
    if (!user || task.completed) return;

    setLoading(true);
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        completed: true,
        completedBy: user.displayName || user.email,
        completedAt: serverTimestamp(),
      });

      notify.success("Görev tamamlandı 🎉");
    } catch (error) {
      console.error(error);
      notify.error("Görev güncellenemedi 😕");
    } finally {
      setLoading(false);
    }
  };

  const isDone = task.completedToday;

  return (
    <div
      className={`flex flex-col items-center justify-between rounded-2xl border-2 transition-all gap-4 py-4 px-6
        ${
          isDone
            ? "bg-bg-soft border-border opacity-60"
            : "bg-bg-soft border-border-strong hover:shadow-md hover:scale-[1.01]"
        }`}
    >
      <div className="flex flex-col gap-2">
        <h3
          className={`font-semibold text-text ${
            isDone ? "line-through text-text-light" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-text-secondary">{task.description}</p>
        )}
        {isDone && (
          <p className="text-xs text-text-light">
            ✅ {task.completedBy} tamamladı
          </p>
        )}
      </div>

      {!isDone && (
        <Button onClick={handleComplete} variant="outline_primary">
          Tamamla
        </Button>
      )}
    </div>
  );
}

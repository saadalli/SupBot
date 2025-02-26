import Image from "next/image";
import MainLayout from "./components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
        <p className="text-gray-700">Manage your tasks, reminders, and FAQs efficiently.</p>
      </div>
    </MainLayout>
  );
}
